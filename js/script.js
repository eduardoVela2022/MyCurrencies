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
const messageLabel = document.querySelector("#message-label");

// User's search history
let searchHistory = [];
// Local storage key for the user's search history
const SEARCH_HISTORY_KEY = "searchHistory";

// User's selected currency
let selectedCurrency = {};
// Local storage key for the user's selected currency
const SELECTED_CURRENCY_KEY = "selectedCurrency";

// The emoji flags of the countries of the currencies we are using
let countryFlags = [];

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
  "european union",
];

// Returns an array with the emoji flags of the countries of the currencies we are using
async function getCountryFlags() {
  // Gets all the emoji flags from the API
  const response = await fetch(
    "https://emojihub.yurace.pro/api/all/category/flags"
  );

  // Converts the data to JSON
  const data = await response.json();

  // Gets only the flags of the countries we require
  const flags = data.filter((flag) => countriesList.includes(flag.name));

  // Return them
  return flags;
}

function getEmojiFlag(currencyCode) {
  function findFlag(countryName) {
    return countryFlags.find((object) => object.name === countryName).htmlCode;
  }

  switch (currencyCode) {
    case "USD": // United states
      return findFlag(countriesList[0]);
    case "JPY": // Japan
      return findFlag(countriesList[1]);
    case "BGN": // Bulgaria
      return findFlag(countriesList[2]);
    case "CZK": // Czech republic
      return findFlag(countriesList[3]);
    case "DKK": // Denmark
      return findFlag(countriesList[4]);
    case "GBP": // United kingdom
      return findFlag(countriesList[5]);
    case "HUF": // Hungary
      return findFlag(countriesList[6]);
    case "PLN": // Poland
      return findFlag(countriesList[7]);
    case "RON": // Romania
      return findFlag(countriesList[8]);
    case "SEK": // Sweden
      return findFlag(countriesList[9]);
    case "CHF": // Switzerland
      return findFlag(countriesList[10]);
    case "ISK": // Iceland
      return findFlag(countriesList[11]);
    case "NOK": // Norway
      return findFlag(countriesList[12]);
    case "TRY": // Turkey
      return findFlag(countriesList[13]);
    case "AUD": // Australia
      return findFlag(countriesList[14]);
    case "BRL": // Brazil
      return findFlag(countriesList[15]);
    case "CAD": // Canada
      return findFlag(countriesList[16]);
    case "CNY": // China
      return findFlag(countriesList[17]);
    case "HKD": // Hong Kong
      return findFlag(countriesList[18]);
    case "IDR": // Indonesia
      return findFlag(countriesList[19]);
    case "ILS": // Israel
      return findFlag(countriesList[20]);
    case "INR": // India
      return findFlag(countriesList[21]);
    case "KRW": // South Korea
      return findFlag(countriesList[22]);
    case "MXN": // Mexico
      return findFlag(countriesList[23]);
    case "MYR": // Malaysia
      return findFlag(countriesList[24]);
    case "NZD": // New Zeland
      return findFlag(countriesList[25]);
    case "PHP": // Philippines
      return findFlag(countriesList[26]);
    case "SGD": // Singapore
      return findFlag(countriesList[27]);
    case "THB": // Thailand
      return findFlag(countriesList[28]);
    case "ZAR": // South Africa
      return findFlag(countriesList[29]);
    case "EUR": // European Union
      return findFlag(countriesList[30]);
  }
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
    // The country flag of the exchange rate is obtained using its currency code property
    const countryFlag = getEmojiFlag(exchangeRate);
    newListItem.innerHTML = `${countryFlag[0]}${countryFlag[1]} ${exchangeRate}: ${exchangeRates[exchangeRate]}`;

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

  // If the search history is not empty, its items will be rendered
  if (searchHistory) {
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
      // The country flag of the currency is obtained using its currency code property
      const countryFlag = getEmojiFlag(item.currencyCode);
      newHeaderTitle.innerHTML = `${countryFlag[0]}${countryFlag[1]} ${item.currencyCode}: ${item.amount}`;
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
          hiddenContent.setAttribute(
            "class",
            "card-content is-hidden px-4 py-3"
          );
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
  }
  // If search history is empty, a message is rendered to let the user know
  else {
    // Empty search history message is created and added to the search history list
    const emptyListMessage = document.createElement("li");
    emptyListMessage.textContent = "Your search history is empty.";
    searchHistoryList.appendChild(emptyListMessage);

    // Search history is turned to an empty list
    searchHistory = [];
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
  // The country flag of the currency is obtained using its currency code property
  const countryFlag = getEmojiFlag(currencyCode);
  // Updates the label element
  messageLabel.innerHTML = `${amount} in ${countryFlag[0]}${countryFlag[1]} ${currencyCode} can get you:`;
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
  // Gets the country flags of the currencies we use from an API
  countryFlags = await getCountryFlags();

  // Renders the search history
  renderSearchHistory();

  // If search history is null, it is turned into an empty object
  if (!selectedCurrency) {
    selectedCurrency = {};
  }
  // If it exists, exchange rates are rendered
  else {
    // Renders the main content of the website to the DOM
    renderResults(selectedCurrency.amount, selectedCurrency.currencyCode);
  }
  console.log(countryFlags);
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
