import { sleep } from "openai/core.mjs";
import { IGPTService } from "../../domain/interfaces/IGPTService";
import { MockDataService } from "./MockDataService";
import { PromptInstructionTypeEnum } from "../../domain/enums/PromptInstructionTypeEnum";

export class MockGPTService implements IGPTService {
  private mockDataService: MockDataService = new MockDataService();
  async generateResponse(prompt: string): Promise<string | null> {
    try {
      await sleep(1000);
      if (prompt.includes("List of Words"))
        return this.handleWordRequest(prompt);
      return this.handleUserRequest(prompt);
    } catch {
      return null;
    }
  }

  private extractUserInput(input: string): string | null {
    const regex = /"(.*?)"/;
    const match = input.match(regex);
    return match ? match[1] : null;
  }

  private handleUserRequest(input: string): string {
    const userInput = this.extractUserInput(input);
    const mockedUserRequests = this.mockDataService.getMockedData(
      PromptInstructionTypeEnum.chat
    );
    if (!mockedUserRequests) return "";

    const mockedResponse =
      mockedUserRequests[userInput || "None"] || mockedUserRequests["None"];
    return JSON.stringify(mockedResponse);
  }

  private extractWordsFromString(input: string): string[] {
    const match = input.match(/List of Words:\s*\[(.+)\]/);

    if (match && match[1])
      return match[1].split(",").map((word) => word.trim().replace(/"/g, ""));
    return [];
  }

  private handleWordRequest(input: string): string {
    const words = this.extractWordsFromString(input);
    const mockedWords = this.mockDataService.getMockedData(
      PromptInstructionTypeEnum.word
    );

    if (!mockedWords) return "";

    let response: Record<string, string> = {};
    words.forEach((word) => {
      if (mockedWords[word]) response[word] = mockedWords[word];
    });
    return JSON.stringify(response);
  }
}
