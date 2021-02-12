import "./styles.css";
import axios from "axios";
import qs from "qs";

const displayOptions = () => {
  const inputStage = document.querySelector("#searchInputs");
  const testText = document.createElement("h1");
  testText.textContent = "Work!";
  inputStage?.appendChild(testText);
};

displayOptions();

interface ApiGetter {
  (transText: string, targetLang: string, sourceLang: string): void;
}

let getTranslation: ApiGetter;

getTranslation = (
  transText: string,
  targetLang: string,
  sourceLang: string
) => {
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
      console.log(response.data.data);
      sendReply(response.data.data);
    })
    .catch(function (error: string) {
      console.error(error);
    });
};

const getLanguages = () => {
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
      // reply.forEach(element => {
      //     console.log(element)

      // });
      domBuilder(reply);
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};

const domBuilder = (entries: [string, unknown][]) => {
  const inputStage = document.querySelector("#searchInputs");
  let sourceLang = document.createElement("select");
  let sourceLangLabel = document.createElement("label");
  sourceLangLabel.setAttribute("for", "sourceLang");
  sourceLangLabel.textContent = "Source Language:";
  sourceLang.id = "sourceLang";
  inputStage.appendChild(sourceLangLabel);
  inputStage.appendChild(sourceLang);
  let targetLang = document.createElement("select");
  let targetLangLabel = document.createElement("label");
  targetLangLabel.setAttribute("for", "targetLang");
  targetLangLabel.textContent = "Target Language:";
  targetLang.id = "targetLang";
  inputStage.appendChild(targetLangLabel);
  inputStage.appendChild(targetLang);
  entries.forEach((entry) => {
    let option = document.createElement("option");
    option.textContent = entry[1].toString();
    option.value = entry[0];
    sourceLang.appendChild(option);
  });
  entries.forEach((entry) => {
    if (entry[1] !== "Detect Language") {
      let option = document.createElement("option");
      option.textContent = entry[1].toString();
      option.value = entry[0];
      targetLang.appendChild(option);
    }
  });
  let textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder = "Put your text to translate here.";
  inputStage.appendChild(textInput);
  let transButton = document.createElement("button");
  transButton.textContent = "Translate";
  inputStage.appendChild(transButton);

  transButton.addEventListener("click", () => {
    console.log(targetLang.value, sourceLang.value, textInput.value);

    getTranslation(textInput.value, targetLang.value, sourceLang.value);
  });
};

const sendReply = (inputData: object) => {
  const removeDiv = document.querySelector("#transDiv");
  if (removeDiv) {
    removeDiv.remove();
    console.log("Removed div!")
  }
  const resultOutput = document.querySelector("#results");
  let didYouMean = document.createElement("h3");
  let transDiv = document.createElement("div");
  transDiv.id = "transDiv";
  let translation = document.createElement("p");
  let pronunciation = document.createElement("p");
  translation.textContent = `Translation: ${inputData["translation"]}`;
  pronunciation.textContent = `Pronunciation: ${inputData["pronunciation"]}`;
  inputData["source"]["text"]["autoCorrected"] === true ||
  inputData["source"]["text"]["didYouMean"] === true
    ? (didYouMean.textContent = `Did you mean: ${inputData["source"]["text"]["value"]}`)
    : (didYouMean.textContent = null);
  resultOutput.appendChild(transDiv);
  transDiv.appendChild(didYouMean);
  transDiv.appendChild(translation);
  transDiv.appendChild(pronunciation);
};

window.addEventListener("load", () => {
  getLanguages();

  //getTranslation("It was you who broke my mason plate.", 'ja', 'en')
});
