import { ChatOpenAI } from "@langchain/openai";
import { IGPTService } from "../../domain/interfaces/IGPTService";

export class GPTService implements IGPTService {
  private chatGptModel: ChatOpenAI;
  constructor(chatGptModel: ChatOpenAI) {
    this.chatGptModel = chatGptModel;
  }

  async generateResponse(prompt: string): Promise<string | null> {
    try {
      const response = await this.chatGptModel.invoke(prompt);
      return response.content as string;
    } catch (error) {
      return null;
    }
  }
}
