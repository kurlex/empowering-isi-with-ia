import fs from "fs";
import path from "path";
import { IPromptService } from "../../domain/interfaces/IPromptService";
import { PromptInstructionTypeEnum } from "../../domain/enums/PromptInstructionTypeEnum";
import { SimilarDocument } from "./IndexingService";

export class PromptService implements IPromptService {
  private readonly chatPromptInstruction: string;

  constructor() {
    const filePath = path.join(
      process.cwd(),
      "data",
      "chatPromptInstruction.txt"
    );
    this.chatPromptInstruction = fs.readFileSync(filePath, "utf8");
  }

  public wrapPrompt(
    userPrompt: string,
    similarDocuments: SimilarDocument[],
    language: string
  ): string {
    let prompt = `
    ${this.chatPromptInstruction}
    IMPORTANT: The response language should be in ${
      language == "fr" ? "FRENCH" : "ENGLISH"
    }.
    
    # Actual_Input`;
    similarDocuments.forEach((document) => {
      prompt = `
      ${prompt}
      # Document ${document.title}
      ${document.content}
      # End Document
      `;
    });
    prompt = `
    ${prompt}
    # User flag
    ${userPrompt}
    `;
    return prompt;
  }
}
