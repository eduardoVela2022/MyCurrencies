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

addCurrencyBtn.addEventListener("click", () => {
  modal.classList.add("is-active");
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("is-active");
});
