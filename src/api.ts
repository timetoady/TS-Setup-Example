const axios = require("axios");

const apiStuff = () => {
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
      data: {
        text: transText,
        tl: targetLang,
        sl: sourceLang,
      },
    })
      .then(function (response: any) {
        console.log(response.data);
        return response;
      })
      .catch(function (error: any) {
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
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

module.exports = apiStuff;
