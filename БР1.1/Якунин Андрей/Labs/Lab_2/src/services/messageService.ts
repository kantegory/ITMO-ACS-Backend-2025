import { AppDataSource } from "../config/AppDataSource";
import { MessageEntity } from "../entities/message";
import { User } from "../entities/User";
import { AdvertisementEntity } from "../entities/advertisement";

const messageRepo = AppDataSource.getRepository(MessageEntity);
const userRepo = AppDataSource.getRepository(User);
const adRepo = AppDataSource.getRepository(AdvertisementEntity);

export const createMessage = async (senderId: number, receiverId: number, advertisementId: number, text: string) => {
    const sender = await userRepo.findOneBy({ id: senderId });
    const receiver = await userRepo.findOneBy({ id: receiverId });
    const advertisement = await adRepo.findOneBy({ id: advertisementId });

    if (!sender) throw new Error("Sender not found");
    if (!receiver) throw new Error("Receiver not found");
    if (!advertisement) throw new Error("Advertisement not found");

    const message = messageRepo.create({
        sender,
        receiver,
        advertisement,
        text,
    });
    return await messageRepo.save(message);
};

export const getMessagesByUser = async (userId: number) => {
    return await messageRepo.find({
        where: [
            { sender: { id: userId } },
            { receiver: { id: userId } }
        ],
        relations: ["sender", "receiver", "advertisement"],
        order: { createdAt: "DESC" }
    });
};
