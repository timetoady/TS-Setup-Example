import { getTranslation } from "./api";

//Main app dom builder
export const domBuilder = (entries: [string, unknown][]) => {
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
  textInput.addEventListener("keyup", (e) => {
      if (e.key === 'Enter') {
        getTranslation(textInput.value, targetLang.value, sourceLang.value);
      }
  })
};

//Builds translation reply once recieved from API
export const sendReply = (inputData: object) => {
  const removeDiv = document.querySelector("#transDiv");
  if (removeDiv) {
    removeDiv.remove();
    console.log("Removed div!");
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
