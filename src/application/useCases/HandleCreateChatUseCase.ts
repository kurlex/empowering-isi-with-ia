import { Chat } from "@prisma/client";
import { IChatRepository } from "../../domain/interfaces/IChatRepository";

export class HandleCreateChatUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute(userId: string, chatName: string): Promise<Chat> {
    return await this.chatRepository.createNewUserChat(userId, chatName);
  }
}
