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

// Your Currencies boxes

document.addEventListener('DOMContentLoaded', function() {
	let cardToggles = document.getElementsByClassName('card-toggle');
	for (let i = 0; i < cardToggles.length; i++) {
		cardToggles[i].addEventListener('click', e => {
			e.currentTarget.parentElement.parentElement.childNodes[3].classList.toggle('is-hidden');
		});
	}
});
