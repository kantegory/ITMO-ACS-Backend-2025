import amqp, { Channel, Connection, Options } from 'amqplib';

interface RabbitMQConfig {
    hostname: string;
    port: number;
    username: string;
    password: string;
    vhost?: string;
    reconnectDelay?: number;
    maxRetries?: number;
}

const defaultConfig: RabbitMQConfig = {
    hostname: process.env.RABBITMQ_HOST || 'rabbitmq',
    port: parseInt(process.env.RABBITMQ_PORT || '5672'),
    username: process.env.RABBITMQ_USER || 'guest',
    password: process.env.RABBITMQ_PASS || 'guest',
    vhost: process.env.RABBITMQ_VHOST || '/',
    reconnectDelay: 5000,
    maxRetries: 10
};

export class RabbitMQ {
    private connection: Connection | null = null;
    private channel: Channel | null = null;
    private static instance: RabbitMQ;
    private config: RabbitMQConfig;
    private reconnectAttempts = 0;
    private subscribers: Array<() => Promise<void>> = [];

    private constructor(config: RabbitMQConfig = defaultConfig) {
        this.config = config;
    }

    public static getInstance(config?: RabbitMQConfig): RabbitMQ {
        if (!RabbitMQ.instance) {
            RabbitMQ.instance = new RabbitMQ(config);
        }
        return RabbitMQ.instance;
    }

    async connect() {
        try {
            const { hostname, port, username, password, vhost } = this.config;
            const connection = await amqp.connect({
                protocol: 'amqp',
                hostname,
                port,
                username,
                password,
                vhost,
                heartbeat: 60
            } as Options.Connect);

            this.connection = connection;
            this.channel = await connection.createChannel();
            this.reconnectAttempts = 0;

            console.log('🚀 Connected to RabbitMQ');

            // Восстанавливаем подписки
            for (const subscribeFn of this.subscribers) {
                await subscribeFn();
            }

            // Обработка закрытия соединения
            connection.on('close', (err) => {
                console.error('RabbitMQ connection closed:', err?.message);
                this.scheduleReconnect();
            });

            connection.on('error', (err) => {
                console.error('RabbitMQ connection error:', err.message);
            });

            return this;
        } catch (error) {
            console.error('Failed to connect to RabbitMQ:', error);
            this.scheduleReconnect();
            throw error;
        }
    }

    private scheduleReconnect() {
        if (this.reconnectAttempts >= this.config.maxRetries!) {
            console.error('Max RabbitMQ reconnect attempts reached');
            return;
        }

        this.reconnectAttempts++;
        const delay = this.config.reconnectDelay! * this.reconnectAttempts;

        console.log(`Reconnecting to RabbitMQ in ${delay}ms (attempt ${this.reconnectAttempts})`);
        setTimeout(() => this.connect(), delay);
    }

    async createExchange(exchange: string, type: string = 'topic', options = { durable: true }) {
        if (!this.channel) throw new Error('Channel not initialized');
        await this.channel.assertExchange(exchange, type, options);
        console.log(`✅ Exchange created: ${exchange}`);
    }

    async createQueue(queue: string, options = { durable: true }) {
        if (!this.channel) throw new Error('Channel not initialized');
        await this.channel.assertQueue(queue, options);
        console.log(`✅ Queue created: ${queue}`);
        return queue;
    }

    async bindQueue(queue: string, exchange: string, routingKey: string) {
        if (!this.channel) throw new Error('Channel not initialized');
        await this.channel.bindQueue(queue, exchange, routingKey);
        console.log(`🔗 Queue ${queue} bound to ${exchange} with key ${routingKey}`);
    }

    async publish(exchange: string, routingKey: string, message: object) {
        if (!this.channel) throw new Error('Channel not initialized');

        try {
            this.channel.publish(
                exchange,
                routingKey,
                Buffer.from(JSON.stringify(message)),
                { persistent: true }
            );
            console.log(`✉️ Sent message to ${exchange} with key ${routingKey}:`, message);
        } catch (error) {
            console.error('Failed to publish message:', error);
            throw error;
        }
    }

    async subscribe(
        exchange: string,
        queue: string,
        routingKey: string,
        callback: (msg: any) => void
    ) {
        const subscribeFn = async () => {
            if (!this.channel) throw new Error('Channel not initialized');

            await this.channel.assertExchange(exchange, 'topic', { durable: true });
            await this.channel.assertQueue(queue, { durable: true });
            await this.channel.bindQueue(queue, exchange, routingKey);

            this.channel.consume(queue, (msg) => {
                if (msg) {
                    try {
                        const content = JSON.parse(msg.content.toString());
                        console.log(`📩 Received message from ${exchange}:${routingKey}`);
                        callback(content);
                        this.channel?.ack(msg);
                    } catch (error) {
                        console.error('Error processing message:', error);
                        this.channel?.nack(msg);
                    }
                }
            });
        };

        this.subscribers.push(subscribeFn);
        await subscribeFn();
    }

    async close() {
        if (this.channel) await this.channel.close();
        if (this.connection) await this.connection.close();
        console.log('🔌 RabbitMQ connection closed');
    }
}

export const rabbitMQ = RabbitMQ.getInstance();