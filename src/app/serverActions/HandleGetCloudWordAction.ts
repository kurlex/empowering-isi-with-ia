"use server";
import { handleGetCloudWordUseCase } from "../../infrastructure/containers/container";

export const handleGetCloudWordAction = async () =>
  await handleGetCloudWordUseCase.execute();
