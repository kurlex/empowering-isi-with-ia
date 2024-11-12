import { Chat } from "@prisma/client";
import { IChatRepository } from "../../domain/interfaces/IChatRepository";
import { IOpenAIService } from "../../domain/interfaces/IOpenAIService";
import ChatBotService from "../../infrastructure/services/ChatBotService";

export class HandleCreateChatUseCase {
  constructor(
    private chatRepository: IChatRepository,
    private chatBotService: ChatBotService
  ) {}

  async execute(userId: string, chatName: string): Promise<Chat> {
    return await this.chatRepository.createNewUserChat(userId, chatName);
  }
}
