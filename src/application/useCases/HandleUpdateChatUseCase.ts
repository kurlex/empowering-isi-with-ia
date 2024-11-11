import { Chat } from "@prisma/client";
import { IChatRepository } from "../../domain/interfaces/IChatRepository";

export class HandleUpdateChatUseCase {
  constructor(private chatRepository: IChatRepository) {}
  async execute(chatId: string, newChatName: string): Promise<Chat> {
    return await this.chatRepository.updateUserChatName(chatId, newChatName);
  }
}
