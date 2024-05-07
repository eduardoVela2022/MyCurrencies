// code to make Modal pop
const addCurrencyBtn = document.querySelector("#add-currency");
const modalClose = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");

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

//Listen to the click event and add our logic to it with a function
document.getElementById("add-currency-modal").addEventListener("click", (e) => {
  fetchCurrencies(e);
});

function fetchCurrencies(e) {
  e.preventDefault();
  // get the currency the user wants to convert
  let amount = document.getElementById("amount").value;
  // get the value that the user wants to convert
  let currencyFrom = document.getElementById("currency").value;
  // make a query to the frankfurter server to obtain the currency changes
  fetch(
    `https://api.frankfurter.app/latest?amount=${amount}&amp;from=${currencyFrom}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      //show the different exchange rates in the console
      console.log(data.rates);
      alert(`10 ${currencyFrom} = ${amount} USD`);
    });
}

addCurrencyBtn.addEventListener("click", () => {
  modal.classList.add("is-active");
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("is-active");
});

// Your Currencies boxes

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

modalClose.addEventListener("click", () => {
  modal.classList.remove("is-active");
});
