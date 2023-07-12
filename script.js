import data from "./currencyTesting.js";

const inputCurrency = document.getElementById("inputCurrency");
const outputCurrency = document.getElementById("outputCurrency");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const form = document.querySelector(".form");
const swapButton = document.getElementById("swapButton");
const convertBtn = document.getElementById("convertBtn");
const inputValueError = document.getElementById("inputValueError");
const inputCurrencyError = document.getElementById("inputCurrencyError");

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

  console.log("test");
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
    console.log("I am");
    return /^\d*\.?\d*$/.test(value);
  });

  console.log(setInputFilter);

  inputText.addEventListener("input", () => {
    inputText.classList.remove("redBorder");
    inputValueError.classList.remove("warning");
  });

  inputCurrency.addEventListener("input", () => {
    inputCurrency.classList.remove("redBorder");
    outputCurrency.classList.remove("redBorder");
    inputCurrencyError.classList.remove("warning");
  });

  outputCurrency.addEventListener("input", () => {
    inputCurrency.classList.remove("redBorder");
    outputCurrency.classList.remove("redBorder");
    inputCurrencyError.classList.remove("warning");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = inputText.value;
    const inputOption = inputCurrency.value;
    const outputOption = outputCurrency.value;

    if (inputValue.trim() !== "") {
      inputText.classList.remove("redBorder");
      inputValueError.classList.remove("warning");

      if (inputOption !== outputOption) {
        outputCurrency.classList.remove("redBorder");
        inputCurrency.classList.remove("redBorder");
        convertBtn.classList.remove("sameCurrencyErrorBtn");
        inputCurrencyError.classList.remove("warning");

        const outputValue =
          (inputValue * currencyData[outputOption]) / currencyData[inputOption];

        outputText.value = outputValue;
      } else {
        outputText.value = "";
        outputCurrency.classList.add("redBorder");
        outputCurrency.focus();
        inputCurrency.classList.add("redBorder");
        inputCurrency.focus();
        inputCurrencyError.classList.add("warning");
      }
    } else {
      convertBtn.classList.add("sameCurrencyErrorBtn");
      setTimeout(() => {
        convertBtn.classList.remove("sameCurrencyErrorBtn");
      }, 1500);
      inputText.classList.add("redBorder");
      inputText.focus();
      inputValueError.classList.add("warning");
    }
  });

  swapButton.addEventListener("click", () => {
    const outputValue = outputText.value;
    const inputOption = inputCurrency.value;
    const outputOption = outputCurrency.value;

    if (inputOption === outputOption) {
      outputCurrency.classList.add("redBorder");
      outputCurrency.focus();
      inputCurrency.classList.add("redBorder");
      inputCurrency.focus();
      inputCurrencyError.classList.add("warning");
    } else {
      let temp = outputOption;
      outputCurrency.value = inputOption;
      inputCurrency.value = temp;
    }
    if (outputValue.trim() !== "") {
      temp = inputText.value;
      inputText.value = outputValue;
      outputText.value = temp;
    }
  });
};
getData();
