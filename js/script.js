// Modal window elements
const addCurrencyModalBtn = document.querySelector("#add-currency-modal");
const addCurrencyBtn = document.querySelector("#add-currency");
const modalClose = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
// Div where the search history will be displayed
const searchHistoryDiv = document.querySelector("#search-history-div");
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

// User's selected currency
let selectedCurrency = {};
// Local storage key for the user's selected currency
const SELECTED_CURRENCY_KEY = "selectedCurrency";

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

function renderSearchHistory() {
  // Creates a new empty search history list
  const searchHistoryList = document.createElement("ul");
  searchHistoryList.setAttribute("id", "search-history");

  // For each item of the search history a new list item is created
  for (const item of searchHistory) {
    // New list item is created
    const newListItem = document.createElement("li");
    newListItem.setAttribute("class", "card is-fullwidth");

    // New list item header is created
    const newHeader = document.createElement("header");
    newHeader.setAttribute("class", "card-header");

    // Title is added to the header
    const newHeaderTitle = document.createElement("a");
    newHeaderTitle.setAttribute("class", "card-header-title");
    newHeaderTitle.textContent = `${item.amount} ${item.currencyCode}`;
    newHeader.appendChild(newHeaderTitle);

    // Toggle button is created
    const newHeaderToggleBtn = document.createElement("a");
    newHeaderToggleBtn.setAttribute("class", "card-header-icon card-toggle");

    // Icon is added to the header toggle button
    const newHeaderToggleBtnIcon = document.createElement("i");
    newHeaderToggleBtnIcon.setAttribute("class", "fa fa-angle-down");
    newHeaderToggleBtn.appendChild(newHeaderToggleBtnIcon);

    // If the header is clicked, it will display the hidden option button or hide them if visible
    newHeader.addEventListener("click", () => {
      // Gets the hidden content of the list item
      const hiddenContent = document.getElementById(`${item.id}-content-div`);

      if (selectedCurrency.id !== item.id) {
        // Updates selected currency
        updateSelectedCurrency(item);

        // Gets rid of the old currency list
        deleteElement("currencies-list");

        // Renders the main content of the website to the DOM
        renderResults(item.amount, item.currencyCode);
      }

      // If it is hidden it is shown
      if (hiddenContent.classList.contains("is-hidden")) {
        hiddenContent.setAttribute("class", "card-content px-4 py-3");
      }
      // If it is visible it is hidden
      else {
        hiddenContent.setAttribute("class", "card-content is-hidden px-4 py-3");
      }
    });

    // Toggle button is added to the header
    newHeader.appendChild(newHeaderToggleBtn);

    // Header is added to the list item
    newListItem.appendChild(newHeader);

    // New list item content div is created
    const newContentDiv = document.createElement("div");
    newContentDiv.setAttribute("id", `${item.id}-content-div`);
    newContentDiv.setAttribute("class", "card-content is-hidden px-4 py-3");

    // New list item content is created
    const newContent = document.createElement("div");
    newContent.setAttribute("class", "content");

    // Edit button is added to the content
    const newEditButton = document.createElement("button");
    newEditButton.setAttribute(
      "class",
      "btn-icon fa-regular fa-pen-to-square pr-3"
    );
    newContent.appendChild(newEditButton);

    // Delete button is added to the content
    const newDeleteButton = document.createElement("button");
    newDeleteButton.setAttribute("class", "btn-icon fa-regular fa-trash-can");
    newContent.appendChild(newDeleteButton);

    // Content is added to content div
    newContentDiv.appendChild(newContent);

    // Content div is added to the list item
    newListItem.appendChild(newContentDiv);

    // New list item is added to the search history list
    searchHistoryList.appendChild(newListItem);
  }

  // Search hsitory list is added to the search history div
  searchHistoryDiv.appendChild(searchHistoryList);
}

async function renderResults(amount, currencyCode) {
  //Updates label
  updateLabel(amount, currencyCode);

  // Gets exchange rates
  const exchangeRates = await getExchangeRates(amount, currencyCode);

  // Renders exchange rates to the DOM
  renderExchangeRates(exchangeRates);
}

function deleteElement(id) {
  // Gets the old currency list
  const itemToDelete = document.getElementById(id);

  // If the currency list exists, it deletes it.
  if (itemToDelete) {
    itemToDelete.remove();
  }
}

function updateLabel(amount, currencyCode) {
  // Updates label elements
  defineAmountOfMoneyId.textContent = amount;
  defineCurrencyId.textContent = currencyCode;
}

function updateSelectedCurrency(newSelectedCurrency) {
  // Updates the selected currency
  selectedCurrency = newSelectedCurrency;
  // Saves it to local storage
  loadToLocalStorage(SELECTED_CURRENCY_KEY, selectedCurrency);
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

  // Gets modal input field values
  const amount = document.getElementById("amount").value;
  const currencyCode = document.getElementById("currency").value;

  const newCurrency = {
    id: crypto.randomUUID(),
    amount,
    currencyCode,
  };

  // Updates selected currency
  updateSelectedCurrency(newCurrency);

  // Updates search history
  searchHistory.push(newCurrency);

  // Saves search history to local storage
  loadToLocalStorage(SEARCH_HISTORY_KEY, searchHistory);

  // Gets rid of the old currency list
  deleteElement("currencies-list");

  // Gets rid of the old search history
  deleteElement("search-history");

  //Updates label
  updateLabel(amount, currencyCode);

  // Renders the main content of the website to the DOM
  renderResults(amount, currencyCode);

  // Renders the search history to the DOM
  renderSearchHistory();

  // Closes the modal window
  modal.classList.remove("is-active");
}

async function main() {
  // Loads search history from local storage
  searchHistory = getFromLocalStorage(SEARCH_HISTORY_KEY);
  // Loads selected currency from local storage
  selectedCurrency = getFromLocalStorage(SELECTED_CURRENCY_KEY);

  // If search history is null, it is turned into an empty list
  if (!searchHistory) {
    searchHistory = [];
  }
  // If it exists, search history is rendered
  else {
    renderSearchHistory();
  }

  // If search history is null, it is turned into an empty object
  if (!selectedCurrency) {
    selectedCurrency = {};
  }
  // If it exists, exchange rates are rendered
  else {
    // Renders the main content of the website to the DOM
    renderResults(selectedCurrency.amount, selectedCurrency.currencyCode);
  }
}

// Runs main function
main();

// When the add currency button is clicked, it runs a script to get the exchange rates of the given amount and currency code
addCurrencyModalBtn.addEventListener("click", (event) => {
  handleCreateNewCurrency(event);
});

// Makes the add currency button activate the modal when its clicked
addCurrencyBtn.addEventListener("click", () => {
  modal.classList.add("is-active");
});

// Makes the modal window disapper
modalClose.addEventListener("click", () => {
  modal.classList.remove("is-active");
});
