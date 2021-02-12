import axios from "axios";
import qs from "qs";
import { sendReply, domBuilder } from "./domManip";

//Show/hide loading spinner
export function hideSpinner() {
  const spinner = document.querySelector(".spinner-border");
  spinner.setAttribute("style", "display: none");
}

export function showSpinner() {
  const spinner = document.querySelector(".spinner-border");
  spinner.setAttribute("style", "display: block");
}

//Main translation API get
interface ApiGetter {
  (transText: string, targetLang: string, sourceLang: string): void;
}

let getTranslation: ApiGetter;

getTranslation = (
  transText: string,
  targetLang: string,
  sourceLang: string
) => {
  showSpinner();
  axios({
    method: "POST",
    url: "https://google-translate20.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "google-translate20.p.rapidapi.com",
    },
    data: qs.stringify({
      text: transText,
      tl: targetLang,
      sl: sourceLang,
    }),
  })
    .then(function (response: any) {
      hideSpinner();
      sendReply(response.data.data);
    })
    .catch(function (error: string) {
      console.error(error);
    });
};

//Get language options
const getLanguages = () => {
  showSpinner();
  axios({
    method: "GET",
    url: "https://google-translate20.p.rapidapi.com/languages",
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "google-translate20.p.rapidapi.com",
    },
  })
    .then(function (response) {
      let reply = Object.entries(response.data.data);
      hideSpinner();
      domBuilder(reply);
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export { getTranslation, getLanguages };
