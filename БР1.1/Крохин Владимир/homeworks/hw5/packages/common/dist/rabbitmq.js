'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.RabbitMQClient = void 0;
const amqp = __importStar(require('amqplib'));
class RabbitMQClient {
  constructor(config) {
    this.connection = null;
    this.channel = null;
    this.config = config;
  }
  async connect() {
    try {
      this.connection = await amqp.connect(this.config.url);
      this.channel = await this.connection.createChannel();
      if (!this.channel) {
        throw new Error('Failed to create channel');
      }
      // Create exchange
      await this.channel.assertExchange(
        this.config.exchange,
        this.config.exchangeType,
        {
          durable: true,
        },
      );
      // Create queue
      await this.channel.assertQueue(this.config.queue, { durable: true });
      // Bind queue to exchange
      await this.channel.bindQueue(
        this.config.queue,
        this.config.exchange,
        this.config.routingKey,
      );
      console.log(`Connected to RabbitMQ: ${this.config.queue}`);
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      throw error;
    }
  }
  async publish(message) {
    if (!this.channel) {
      throw new Error('Channel not initialized');
    }
    try {
      this.channel.publish(
        this.config.exchange,
        this.config.routingKey,
        Buffer.from(JSON.stringify(message)),
        { persistent: true },
      );
    } catch (error) {
      console.error('Failed to publish message:', error);
      throw error;
    }
  }
  async consume(routingKey, callback) {
    if (!this.channel) {
      throw new Error('Channel not initialized');
    }
    try {
      await this.channel.consume(this.config.queue, async msg => {
        var _a, _b;
        if (msg) {
          try {
            const content = JSON.parse(msg.content.toString());
            if (content.type === routingKey) {
              await callback(content);
            }
            (_a = this.channel) === null || _a === void 0
              ? void 0
              : _a.ack(msg);
          } catch (error) {
            console.error('Error processing message:', error);
            (_b = this.channel) === null || _b === void 0
              ? void 0
              : _b.nack(msg, false, true);
          }
        }
      });
    } catch (error) {
      console.error('Failed to consume messages:', error);
      throw error;
    }
  }
  async close() {
    var _a, _b;
    try {
      await ((_a = this.channel) === null || _a === void 0
        ? void 0
        : _a.close());
      await ((_b = this.connection) === null || _b === void 0
        ? void 0
        : _b.close());
      console.log('RabbitMQ connection closed');
    } catch (error) {
      console.error('Error closing RabbitMQ connection:', error);
      throw error;
    }
  }
}
exports.RabbitMQClient = RabbitMQClient;
