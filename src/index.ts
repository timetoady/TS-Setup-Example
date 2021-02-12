import "./styles.css";
import { getLanguages } from './api'

//Simple top display
const displayOptions = () => {
  const inputStage = document.querySelector("#searchInputs");
  const testText = document.createElement("h1");
  testText.textContent = "Google Translate App";
  inputStage?.appendChild(testText);
};

//Calls top display and content for page on load
window.addEventListener("load", () => {
  displayOptions();
  getLanguages();

});
