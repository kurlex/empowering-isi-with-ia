import { IWordRepository } from "../../domain/interfaces/IWordRepository";
import prisma from "../prisma/prismaClient";

export class WordRepository implements IWordRepository {
  getMostUsedWords = async () => {
    return [
      { content: "ISI", occurance: 6, updatedAt: new Date("2023-03-15") },
      { content: "formation", occurance: 5, updatedAt: new Date("2022-11-24") },
      { content: "Bachelor", occurance: 3, updatedAt: new Date("2023-05-10") },
      {
        content: "informatique",
        occurance: 4,
        updatedAt: new Date("2021-08-30"),
      },
      { content: "ans", occurance: 2, updatedAt: new Date("2020-02-14") },
      {
        content: "spécialités",
        occurance: 3,
        updatedAt: new Date("2021-06-01"),
      },
      { content: "SIL", occurance: 1, updatedAt: new Date("2022-09-21") },
      { content: "Systèmes", occurance: 3, updatedAt: new Date("2023-04-07") },
      {
        content: "informatiques",
        occurance: 1,
        updatedAt: new Date("2020-10-13"),
      },
      { content: "logiciels", occurance: 1, updatedAt: new Date("2023-06-20") },
      { content: "SI", occurance: 2, updatedAt: new Date("2021-03-28") },
      {
        content: "Informatique",
        occurance: 1,
        updatedAt: new Date("2022-07-02"),
      },
      { content: "ARS", occurance: 1, updatedAt: new Date("2021-12-09") },
      {
        content: "Administration",
        occurance: 1,
        updatedAt: new Date("2022-01-19"),
      },
      { content: "réseaux", occurance: 2, updatedAt: new Date("2023-05-14") },
      { content: "services", occurance: 1, updatedAt: new Date("2020-08-03") },
      { content: "SE", occurance: 1, updatedAt: new Date("2021-10-17") },
      { content: "embarqués", occurance: 1, updatedAt: new Date("2023-02-25") },
      { content: "cycle", occurance: 3, updatedAt: new Date("2022-03-01") },
      {
        content: "ingénieurs",
        occurance: 1,
        updatedAt: new Date("2023-07-18"),
      },
      { content: "GLSI", occurance: 1, updatedAt: new Date("2021-11-11") },
      {
        content: "Ingénierie",
        occurance: 3,
        updatedAt: new Date("2020-04-27"),
      },
      {
        content: "logicielle",
        occurance: 1,
        updatedAt: new Date("2022-08-16"),
      },
      { content: "systèmes", occurance: 2, updatedAt: new Date("2023-03-29") },
      {
        content: "information",
        occurance: 1,
        updatedAt: new Date("2021-12-25"),
      },
      { content: "GTR", occurance: 1, updatedAt: new Date("2022-11-04") },
      {
        content: "télécommunications",
        occurance: 1,
        updatedAt: new Date("2020-01-12"),
      },
      { content: "GISI", occurance: 1, updatedAt: new Date("2023-05-24") },
      {
        content: "industriels",
        occurance: 1,
        updatedAt: new Date("2022-06-14"),
      },
      { content: "Master", occurance: 3, updatedAt: new Date("2021-09-29") },
      {
        content: "professionnel",
        occurance: 2,
        updatedAt: new Date("2023-01-05"),
      },
      { content: "SSICE", occurance: 1, updatedAt: new Date("2022-02-11") },
      { content: "Sécurité", occurance: 1, updatedAt: new Date("2023-10-13") },
      {
        content: "communication",
        occurance: 1,
        updatedAt: new Date("2020-05-30"),
      },
      { content: "MP2L", occurance: 1, updatedAt: new Date("2021-07-20") },
      { content: "Logiciel", occurance: 1, updatedAt: new Date("2022-12-08") },
      { content: "libre", occurance: 1, updatedAt: new Date("2023-09-15") },
      {
        content: "collaboration",
        occurance: 1,
        updatedAt: new Date("2021-06-03"),
      },
      {
        content: "Université",
        occurance: 1,
        updatedAt: new Date("2020-12-21"),
      },
      { content: "virtuelle", occurance: 1, updatedAt: new Date("2022-10-02") },
      { content: "Tunis", occurance: 1, updatedAt: new Date("2023-11-04") },
      { content: "recherche", occurance: 1, updatedAt: new Date("2020-09-08") },
      { content: "SIIVA", occurance: 1, updatedAt: new Date("2021-04-26") },
      { content: "GL", occurance: 1, updatedAt: new Date("2023-03-06") },
    ];
  };
}
