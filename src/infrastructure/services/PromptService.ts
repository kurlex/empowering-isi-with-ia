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

  private replacePromptInput(template: string, prompt: string): string {
    return template.replace(/\[PROMPT_INPUT\]/g, prompt);
  }

  wrapPrompt(userPrompt: string, similarDocuments: SimilarDocument[]): string {
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
    ${prompt}
    `;
  }
}
