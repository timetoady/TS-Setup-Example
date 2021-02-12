import "./styles.css";
import { getLanguages } from './api'

const displayOptions = () => {
  const inputStage = document.querySelector("#searchInputs");
  const testText = document.createElement("h1");
  testText.textContent = "Google Translate App";
  inputStage?.appendChild(testText);
};

window.addEventListener("load", () => {
  displayOptions();
  getLanguages();

});
