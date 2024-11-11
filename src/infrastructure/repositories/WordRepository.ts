import { IWordRepository } from "../../domain/interfaces/IWordRepository";
import prisma from "../prisma/prismaClient";

export class WordRepository implements IWordRepository {
  getMostUsedWords = async () => {
    return await prisma.word.findMany({
      where: {
        occurance: {
          gt: 0,
        },
      },
      orderBy: {
        occurance: "desc",
      },
      take: 100,
    });
  };

  getSpecificWords = async (words: string[]) => {
    return await prisma.word.findMany({ where: { content: { in: words } } });
  };

  getWordWithLatestsUpdateTime = async () => {
    return await prisma.word.findFirst({ orderBy: { updatedAt: "desc" } });
  };

  createOrUpdateWords = async (
    words: {
      content: string;
      occurance: number;
    }[]
  ) => {
    const updatePromises = words.map((word) =>
      prisma.word.upsert({
        where: { content: word.content },
        update: { occurance: word.occurance },
        create: word,
      })
    );

    await Promise.all(updatePromises);
  };
}
