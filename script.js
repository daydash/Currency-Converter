import data from "./currencyTesting.js";

const inputCurrency = document.getElementById("inputCurrency");
const outputCurrency = document.getElementById("outputCurrency");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const form = document.querySelector(".form");
const swapButton = document.getElementById("swapButton");
const convertBtn = document.getElementById("convertBtn");

const getData = async () => {
  // const response = await fetch(
  //   "https://api.freecurrencyapi.com/v1/latest?apikey=n9le9NlNoevcE4LjQrtxCRw9IFddoqVzGzyH0cV7"
  // );
  // const data = await response.json();
  const currencyData = await data.data;

  const options = [];
  Object.keys(currencyData).forEach((key) => {
    options.push(key);
  });

  // Object.entries(currencyData).forEach((entry) => {
  // 	const [key] = entry;
  // 	options.push(key);
  // });

  options.map((key) => {
    const optionsList = document.createElement("option");
    optionsList.value = key;
    optionsList.innerText = key;
    optionsList.classList.add("options");
    inputCurrency.appendChild(optionsList);
  });
  options.map((key) => {
    const optionsList = document.createElement("option");
    optionsList.value = key;
    optionsList.innerText = key;
    optionsList.classList.add("options");
    outputCurrency.appendChild(optionsList);
  });

  // Restricts input for the given textbox to the given inputFilter.
  function setInputFilter(textbox, inputFilter) {
    [
      "input",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "select",
      "contextmenu",
      "drop",
    ].forEach((event) => {
      textbox.addEventListener(event, function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
      });
    });
  }

  setInputFilter(inputText, (value) => {
    return /^\d*\.?\d*$/.test(value);
  });
  // setInputFilter(outputText, (value) => {
  //   return /^\d*\.?\d*$/.test(value);
  // });

  inputText.addEventListener("input", () => {
    inputText.classList.remove("redBorder");
  });

  inputCurrency.addEventListener("input", () => {
    inputCurrency.classList.remove("redBorder");
    outputCurrency.classList.remove("redBorder");
  });

  outputCurrency.addEventListener("input", () => {
    inputCurrency.classList.remove("redBorder");
    outputCurrency.classList.remove("redBorder");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = inputText.value;
    const inputOption = inputCurrency.value;
    const outputOption = outputCurrency.value;

    if (inputValue.trim() !== "") {
      inputText.classList.remove("redBorder");
      if (inputOption !== outputOption) {
        outputCurrency.classList.remove("redBorder");
        inputCurrency.classList.remove("redBorder");
        convertBtn.classList.remove("sameCurrencyErrorBtn");

        const outputValue =
          (inputValue * currencyData[outputOption]) / currencyData[inputOption];

        outputText.value = outputValue;
      } else {
        outputText.value = "";
        outputCurrency.classList.add("redBorder");
        outputCurrency.focus();
        inputCurrency.classList.add("redBorder");
        inputCurrency.focus();
      }
    } else {
      convertBtn.classList.add("sameCurrencyErrorBtn");
      setTimeout(() => {
        convertBtn.classList.remove("sameCurrencyErrorBtn");
      }, 1500);
      inputText.classList.add("redBorder");
      inputText.focus();
    }
  });

  swapButton.addEventListener("click", () => {
    const inputValue = inputText.value;
    const outputValue = inputText.value;
    const inputOption = inputCurrency.value;
    const outputOption = outputCurrency.value;

    if (inputOption !== outputOption) {
      let temp = outputOption;
      outputOption = inputOption;
      inputOption = temp;
    } else {
      outputCurrency.classList.add("redBorder");
      outputCurrency.focus();
      inputCurrency.classList.add("redBorder");
      inputCurrency.focus();
    }
    if (outputValue.trim() !== "") {
      temp = inputValue;
      inputValue = outputValue;
      outputValue = temp;
    }
  });
};
getData();
