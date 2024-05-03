// code to make Modal pop

const addCurrencyBtn = document.querySelector('#add-currency');
const modalClose = document.querySelector('.modal-close');
const modal = document.querySelector('.modal');

addCurrencyBtn.addEventListener('click', () => {
    modal.classList.add('is-active');
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('is-active');
});