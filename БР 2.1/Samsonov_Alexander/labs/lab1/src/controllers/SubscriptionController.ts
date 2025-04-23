import { Repository } from 'typeorm';
import { Subscription } from '../models/Subscribtion';
import { CrudController } from './CrudController';
import { 
    Route, 
    Get, 
    Post, 
    Delete, 
    Body, 
    Path, 
    SuccessResponse, 
    Tags,
    Security
} from "tsoa";
import { AppDataSource } from "../data-source";

@Route("subscriptions")
@Tags("Subscriptions")
export class SubscriptionController extends CrudController<Subscription> {
    constructor(
        private readonly subscriptionRepository: Repository<Subscription> = AppDataSource.getRepository(Subscription),
        exposedFields: (keyof Subscription)[] = []
    ) {
        super(subscriptionRepository, exposedFields);
    }

    /**
     * Get all subscriptions
     */
    @Get()
    public async getAll(): Promise<Subscription[]> {
        const subscriptions = await this.subscriptionRepository.find({
            relations: ['subscriber', 'creator']
        });
        return this.filterFields(subscriptions);
    }

    /**
     * Get a subscription by ID
     */
    @Get("{id}")
    public async getOne(@Path() id: number): Promise<Subscription> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const subscription = await this.subscriptionRepository.findOne({
            where: { id },
            relations: ['subscriber', 'creator']
        });

        if (!subscription) {
            throw new Error('Subscription not found');
        }

        return this.filterFields(subscription);
    }

    /**
     * Create a new subscription
     */
    @Post()
    @Security("jwt")
    @SuccessResponse("201", "Created")
    public async create(@Body() requestBody: Partial<Subscription>): Promise<Subscription> {
        // Check if subscription already exists
        const existingSubscription = await this.subscriptionRepository.findOne({
            where: {
                subscriber: { id: (requestBody.subscriber as any).id },
                creator: { id: (requestBody.creator as any).id }
            }
        });

        if (existingSubscription) {
            throw new Error('User is already subscribed to this creator');
        }

        // Prevent self-subscription
        if ((requestBody.subscriber as any).id === (requestBody.creator as any).id) {
            throw new Error('Cannot subscribe to yourself');
        }

        const created = this.subscriptionRepository.create(requestBody);
        const saved = await this.subscriptionRepository.save(created);
        return this.filterFields(saved);
    }

    /**
     * Delete a subscription
     */
    @Delete("{id}")
    @Security("jwt")
    @SuccessResponse("204", "No Content")
    public async remove(@Path() id: number): Promise<void> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const result = await this.subscriptionRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Subscription not found');
        }
    }

    /**
     * Get subscriptions by subscriber ID (users that this user follows)
     */
    @Get("subscriber/{subscriberId}")
    public async getSubscriptionsBySubscriber(@Path() subscriberId: number): Promise<Subscription[]> {
        if (isNaN(subscriberId)) {
            throw new Error('Invalid subscriber ID format');
        }

        const subscriptions = await this.subscriptionRepository.find({
            where: { subscriber: { id: subscriberId } },
            relations: ['subscriber', 'creator']
        });

        return this.filterFields(subscriptions);
    }

    /**
     * Get subscriptions by creator ID (users that follow this user)
     */
    @Get("creator/{creatorId}")
    public async getSubscriptionsByCreator(@Path() creatorId: number): Promise<Subscription[]> {
        if (isNaN(creatorId)) {
            throw new Error('Invalid creator ID format');
        }

        const subscriptions = await this.subscriptionRepository.find({
            where: { creator: { id: creatorId } },
            relations: ['subscriber', 'creator']
        });

        return this.filterFields(subscriptions);
    }

    /**
     * Check if a user is subscribed to a creator
     */
    @Get("check/{subscriberId}/{creatorId}")
    public async checkSubscription(@Path() subscriberId: number, @Path() creatorId: number): Promise<boolean> {
        if (isNaN(subscriberId) || isNaN(creatorId)) {
            throw new Error('Invalid ID format');
        }

        const subscription = await this.subscriptionRepository.findOne({
            where: {
                subscriber: { id: subscriberId },
                creator: { id: creatorId }
            }
        });

        return !!subscription;
    }
}