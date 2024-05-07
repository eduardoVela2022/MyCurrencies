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

<<<<<<< Updated upstream
//Listen to the click event and add our logic to it with a function
document.getElementById("add-currency-modal").addEventListener("click", (e) => {
  fetchCurrencies(e);
});
=======
//Listen to the click event and add the fetch currencies logic to it.
document.getElementById('add-currency-modal').addEventListener('click',(e)=>{fetchCurrencies(e)});
>>>>>>> Stashed changes

function fetchCurrencies(e) {
  e.preventDefault();
<<<<<<< Updated upstream
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
=======
  // get the amount and currency the user wants to convert
  let amount = document.getElementById('amount').value;
  let currencyFrom = document.getElementById('currency').value;

  // make a query to the frankfurter server to obtain the currency changes
  fetch(`https://api.frankfurter.app/latest?amount=${amount}&amp;from=${currencyFrom}`)
  .then(resp => resp.json())
  .then((data) => {
    const currenciesObject = data.rates;
     //show the different exchange rates in the console\
    console.log('keys > ', Object.keys(data.rates));

   //convert the object to an array to do an iteration.
    const  currencies = Object.keys(data.rates);
    //replacing the static text with the value that the user has entered with jQuery.
    $('#define-amountofmoney-id').html(amount);
    $('#define-currency-id').html(currencyFrom);

  //iterate the currency to generate the html section of each currency and insert it into the html
    currencies.forEach((currency) => {
      const currencyHtml = $(`<div class="cell"><h5>${currency}:</h5><p>${currenciesObject[currency]}</p></div>`);

      //Apply the .append method to add the frankfurter data into the webpage  
      $('#currencies-list').append(currencyHtml);
    });
  });
>>>>>>> Stashed changes
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
