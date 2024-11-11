import { PrismaClient } from "@prisma/client";

class PrismaClientSingleton {
  private static _prismaClient: PrismaClient | undefined = undefined;

  static getInstance(): PrismaClient {
    if (!this._prismaClient) {
      this._prismaClient = new PrismaClient();
    }
    return this._prismaClient;
  }
}

const prisma = PrismaClientSingleton.getInstance();

export default prisma;
