import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export class TranslationService {
  key =
    "9HwAv2AHJj1y0AKGoUCfyO2lJU65V9EQeoUot4Rh0P1STIl1AhnfJQQJ99AKACrIdLPXJ3w3AAAbACOGgUTX";
  endpoint = "https://api.cognitive.microsofttranslator.com/";
  location = "southafricanorth";
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
}
