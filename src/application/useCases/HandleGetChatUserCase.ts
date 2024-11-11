import { Chat } from "@prisma/client";
import { IChatRepository } from "../../domain/interfaces/IChatRepository";

export class HandleGetChatUserCase {
  constructor(private chatRepository: IChatRepository) {}
  async execute(userId: string): Promise<Chat[]> {
    return await this.chatRepository.getUserChatsOrCreateDefault(userId);
  }
}
