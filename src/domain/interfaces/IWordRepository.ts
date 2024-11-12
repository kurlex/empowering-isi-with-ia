import { Word } from "@prisma/client";
import { IReducedWord } from "./IReducedWord";

export interface IWordRepository {
  getMostUsedWords(): Promise<Word[]>;
}
