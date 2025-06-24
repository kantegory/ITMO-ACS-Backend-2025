import amqplib from 'amqplib'

export const sendToQueue = async (queue: string, message: any) => {
    try {
        const conn = await amqplib.connect('amqp://rabbitmq')
        const channel = await conn.createChannel()
        await channel.assertQueue(queue, { durable: true })
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
        console.log(`Message sent to ${queue}:`, message)
        await channel.close()
        await conn.close()
    } catch (error) {
        console.error('Error sending message to queue:', error);
    }
}

export const listenToQueue = async (queue: string, callback: (content: any) => any) => {
    try {
        const conn = await amqplib.connect('amqp://rabbitmq')
        const channel = await conn.createChannel()
        await channel.assertQueue(queue, { durable: true })
        channel.consume(queue, (msg) => {
            if (msg) {
                const content = JSON.parse(msg.content.toString())
                console.log(`Received from ${queue}:`, content)
                callback(content)
                channel.ack(msg)
            }
        })
    } catch (error) {
        console.error('Error listening to queue:', error);
    }
}