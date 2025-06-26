import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { createClient } from 'redis';
import { env } from 'process';

@Injectable()
export class CacheService implements OnModuleInit {
    private pubClient: ReturnType<typeof createClient>;
    private subClient: ReturnType<typeof createClient>;
    private readonly logger = new Logger(CacheService.name);

    async onModuleInit() {
        try {
            const redisConfig = {
                username: env.REDIS_USER || 'default',
                password: env.REDIS_PASSWORD,
                socket: {
                    host: env.REDIS_HOST || 'localhost',
                    port: Number(env.REDIS_PORT) || 6379,
                    connectTimeout: 10000, // 10 seconds timeout
                    reconnectStrategy: (retries: number) => {
                        if (retries > 10) {
                            this.logger.error('Max retries reached. Giving up on Redis connection');
                            // return new Error('Max retries reached');
                        }
                        // Exponential backoff: 500, 1000, 2000, 4000, 8000 ms
                        return Math.min(500 * Math.pow(2, retries), 8000);
                    }
                }
            };

            // this.logger.log(`Connecting to Redis at ${redisConfig.socket.host}:${redisConfig.socket.port}...`);

            // Create and connect publisher client
            this.pubClient = createClient(redisConfig);
            this.pubClient.on('error', err => 
                this.logger.error('Redis Pub Client Error', err));
            
            this.pubClient.on('connect', () => 
                this.logger.log('Redis Pub Client Connected'));
            
            this.pubClient.on('reconnecting', () => 
                this.logger.warn('Redis Pub Client Reconnecting'));
            
            await this.pubClient.connect();

            // Create and connect subscriber client
            this.subClient = this.pubClient.duplicate();
            this.subClient.on('error', err => 
                this.logger.error('Redis Sub Client Error', err));
            
            this.subClient.on('connect', () => 
                this.logger.log('Redis Sub Client Connected'));
            
            this.subClient.on('reconnecting', () => 
                this.logger.warn('Redis Sub Client Reconnecting'));
            
            await this.subClient.connect();

            // Subscribe to channels
            await this.subClient.subscribe('__keyevent@0__:expired', (message, channel) => {
                // this.logger.log(`Received message on channel ${channel}: ${message}`);
            });

            this.logger.log('Redis clients connected and subscribed');

        } catch (error) {
            this.logger.error('Failed to initialize Redis service', error);
            throw error;
        }
    }

    async newExpireEvent(key: string, expireTime: number) {
        if (!this.pubClient.isOpen) {
            this.logger.error('Publisher client is not connected');
            return;
        }

        await this.pubClient.set(key, 'EXPIRE_EVENT'); 
        await this.pubClient.expire(key, expireTime);
    }

}