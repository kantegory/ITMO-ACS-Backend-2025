import {Body, Controller, Delete, Get, Path, Post, Response, Request, Route, Security, SuccessResponse, Tags} from "tsoa";
import messageService from "../services/message.service";
import {MessageResponseDto} from "../models/responses/message-response.dto";
import {CreateMessageRequestDto} from "../models/requests/message-create.dto";
import {advertisementServiceClient, EntityNotFoundError, EntityNotFoundErrorDto, userServiceClient} from "@rent/shared";
import {createMessageRequestToCreateData, toMessageResponseModel} from "../mappers/message.mapper";

@Route("messages")
@Tags("Message")
export class MessageController extends Controller {

    @Post()
    @SuccessResponse("201", "Created")
    @Security("jwt")
    public async createMessage(
        @Request() request: any,
        @Body() createRequest: CreateMessageRequestDto
    ): Promise<MessageResponseDto> {
        const token = request.headers.authorization;
        console.log(token)
        const ad = await advertisementServiceClient.getAdById(createRequest.advertisementId, token);
        const sender = await userServiceClient.getUserById(createRequest.senderId, token);
        const receiver = await userServiceClient.getUserById(createRequest.receiverId, token);
        const message = await messageService.create(createMessageRequestToCreateData(createRequest));
        return toMessageResponseModel(message);
    }

    @Get("{messageId}")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundErrorDto>(404, "Entity not found")
    public async getMessageById(@Path() messageId: number): Promise<MessageResponseDto> {
        const message = await messageService.getById(messageId);
        return toMessageResponseModel(message);
    }

    @Delete("{messageId}")
    @SuccessResponse("204", "Deleted")
    @Security("jwt")
    public async deleteMessage(@Path() messageId: number): Promise<void> {
        await messageService.delete(messageId);
    }
}
