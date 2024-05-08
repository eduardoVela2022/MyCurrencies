// Modal window elements
const addCurrencyModalBtn = document.querySelector("#add-currency-modal");
const addCurrencyBtn = document.querySelector("#add-currency");
const modalClose = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
// Div where the exchange rates will be displayed
const currenciesListDiv = document.querySelector("#currencies-list-div");
// Label elements
const defineAmountOfMoneyId = document.querySelector(
  "#define-amountofmoney-id"
);
const defineCurrencyId = document.querySelector("#define-currency-id");

// User's search history
let searchHistory = [];
// Local storage key for the user's search history
const SEARCH_HISTORY_KEY = "searchHistory";

// List of the currencies' countries
const countriesList = [
  "united states",
  "japan",
  "bulgaria",
  "czech republic",
  "denmark",
  "united kingdom",
  "hungary",
  "poland",
  "romania",
  "sweden",
  "switzerland",
  "iceland",
  "norway",
  "turkey",
  "australia",
  "brazil",
  "canada",
  "china",
  "hong kong sar china",
  "indonesia",
  "israel",
  "india",
  "south korea",
  "mexico",
  "malaysia",
  "new zealand",
  "philippines",
  "singapore",
  "thailand",
  "south africa",
];

// Returns an array with the emoji flags of the currencies we are using
async function getCountryFlags() {
  // Gets all the emoji flags from the API
  const response = await fetch(
    "https://emojihub.yurace.pro/api/all/category/flags"
  );

  // Converts the data to JSON
  const data = await response.json();

  // Gets only the flags of the countries we require
  const flags = data.filter((flag) => countriesList.includes(flag.name));

  console.log(flags);
  // Return them
  return flags;
}

async function getExchangeRates(amount, currencyCode) {
  // Gets the exchange rates from the API
  const response = await fetch(
    `https://api.frankfurter.app/latest?amount=${amount}&amp;from=${currencyCode}`
  );

  // Converts the data to JSON
  const data = await response.json();

  // Returns the data
  return data.rates;
}

function renderExchangeRates(exchangeRates) {
  // Creates a new empty currency list
  const currenciesList = document.createElement("ul");
  currenciesList.setAttribute("id", "currencies-list");
  currenciesList.setAttribute("class", "grid");

  // For each exchange rate a new list item is created
  for (const exchangeRate in exchangeRates) {
    // Creates a new list item
    const newListItem = document.createElement("li");
    newListItem.setAttribute(
      "class",
      "cell box has-background-light is-shadowless"
    );
    newListItem.textContent = `${exchangeRate}: ${exchangeRates[exchangeRate]}`;

    // Adds the new list item to the currency list
    currenciesList.appendChild(newListItem);
  }

  // Adds the currency list to the currency list div
  currenciesListDiv.appendChild(currenciesList);
}

function clearExchangeRates() {
  // Gets the old currency list
  const oldCurrenciesList = document.getElementById("currencies-list");

  // If the currency list exists, it deletes it.
  if (oldCurrenciesList) {
    oldCurrenciesList.remove();
  }
}

function updateLabel(amount, currencyCode) {
  // Updates label elements
  defineAmountOfMoneyId.textContent = amount;
  defineCurrencyId.textContent = currencyCode;
}

function loadToLocalStorage(key, value) {
  // Saves the given item to local storage
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
  // Gets the given item from local storage
  return JSON.parse(localStorage.getItem(key));
}

async function handleCreateNewCurrency(event) {
  event.preventDefault();
  // Gets rid of the old currency list
  clearExchangeRates();

  // Gets modal input field values
  const amount = document.getElementById("amount").value;
  const currencyCode = document.getElementById("currency").value;

  //Updates label
  updateLabel(amount, currencyCode);

  // Gets exchange rates
  const exchangeRates = await getExchangeRates(amount, currencyCode);

  // Renders exchange rates to the DOM
  renderExchangeRates(exchangeRates);

  // Updates search history
  searchHistory.push({
    amount,
    currencyCode,
  });

  // Saves search history to local storage
  loadToLocalStorage(SEARCH_HISTORY_KEY, searchHistory);

  // Closes the modal window
  modal.classList.remove("is-active");
}

function main() {
  // Loads search history from local storage
  searchHistory = getFromLocalStorage(SEARCH_HISTORY_KEY);

  // If search history is null, it is turned into an empty list
  if (!searchHistory) {
    searchHistory = [];
  }

  console.log(searchHistory);
}

// Runs main function
main();

// When the add currency button is clicked, it runs a script to get the exchange rates of the given amount and currency code
addCurrencyModalBtn.addEventListener("click", (event) => {
  handleCreateNewCurrency(event);
});

// Gives the currency boxes a toggle feature
document.addEventListener("DOMContentLoaded", function () {
  let cardToggles = document.getElementsByClassName("card-toggle");

  for (let i = 0; i < cardToggles.length; i++) {
    cardToggles[i].addEventListener("click", (e) => {
      e.currentTarget.parentElement.parentElement.childNodes[3].classList.toggle(
        "is-hidden"
      );
    });
  }
});

// Makes the add currency button activate the modal when its clicked
addCurrencyBtn.addEventListener("click", () => {
  modal.classList.add("is-active");
});

// Makes the modal window disapper
modalClose.addEventListener("click", () => {
  modal.classList.remove("is-active");
});
