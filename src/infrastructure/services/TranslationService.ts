import axios from "axios";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

class TranslationService {
  constructor(
    private key: string,
    private endpoint: string,
    private location: string
  ) {}

  async detectLanguage(text: string): Promise<string> {
    try {
      const response = await axios({
        baseURL: this.endpoint,
        url: "/detect",
        method: "post",
        headers: {
          "Ocp-Apim-Subscription-Key": this.key,
          "Ocp-Apim-Subscription-Region": this.location,
          "Content-type": "application/json",
          "X-ClientTraceId": uuidv4().toString(),
        },
        params: {
          "api-version": "3.0",
        },
        data: [
          {
            text: text,
          },
        ],
        responseType: "json",
      });

      // Return the detected language code (e.g., "fr" for French)
      return response.data[0].language;
    } catch (error) {
      console.error("Error detecting language:", error);
      throw error;
    }
  }

  async translateText(
    text: string,
    currentLanguage: string,
    toLanguage: string
  ) {
    try {
      const response = await axios({
        baseURL: this.endpoint,
        url: "/translate",
        method: "post",
        headers: {
          "Ocp-Apim-Subscription-Key": this.key,
          "Ocp-Apim-Subscription-Region": this.location,
          "Content-type": "application/json",
          "X-ClientTraceId": uuidv4().toString(),
        },
        params: {
          "api-version": "3.0",
          from: currentLanguage,
          to: toLanguage,
        },
        data: [
          {
            text: text,
          },
        ],
        responseType: "json",
      });

      const translatedText = response.data[0].translations[0].text;
      return translatedText;
    } catch (error) {
      console.error("Error translating text:", error);
      throw error;
    }
  }

  async translateFile(filePath: string, outputPath: string) {
    try {
      const fileContent = await promisify(fs.readFile)(filePath, "utf8");

      // Check if the content is in French

      const translatedText = await this.translateText(fileContent, "fr", "en");

      // Save the translated content to a new file
      await promisify(fs.writeFile)(outputPath, translatedText, "utf8");

      console.log(`File translated and saved to ${outputPath}`);
    } catch (error) {
      console.error("Error processing file:", error);
      throw error;
    }
  }

  async translateFolder(folderPath: string) {
    try {
      const files = await promisify(fs.readdir)(folderPath);

      for (const file of files) {
        const filePath = `${folderPath}/${file}`;

        // Check if the file is a text file
        if (file.endsWith(".txt")) {
          const outputPath = `${folderPath}/${file.replace(".txt", "_en.txt")}`;
          await this.translateFile(filePath, outputPath);
        }
      }
    } catch (error) {
      console.error("Error processing folder:", error);
      throw error;
    }
  }
}

export default TranslationService;
