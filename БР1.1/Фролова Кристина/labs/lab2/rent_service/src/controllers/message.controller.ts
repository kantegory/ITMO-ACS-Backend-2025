import {Body, Controller, Delete, Get, Path, Post, Response, Route, Security, SuccessResponse, Tags} from "tsoa";
import messageService from "../services/message.service";
import {EntityNotFoundError} from "../models/errors/entity-not-found.model";
import {CreateMessageRequestDto} from "../models/requests/message/message-create.dto";
import {MessageResponseDto} from "../models/responses/message-response.dto";
import {createMessageRequestToCreateData, toMessageResponseModel} from "../mappers/message.mapper";

@Route("messages")
@Tags("Message")
export class MessageController extends Controller {

    @Post()
    @SuccessResponse("201", "Created")
    @Security("jwt")
    public async createMessage(
        @Body() createRequest: CreateMessageRequestDto
    ): Promise<MessageResponseDto> {
        const message = await messageService.create(createMessageRequestToCreateData(createRequest));
        return toMessageResponseModel(message);
    }

    @Get("{messageId}")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
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
