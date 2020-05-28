
const details = document.querySelectorAll(".benefits--unavailable details");

details.forEach((targetDetail) => {
  targetDetail.removeAttribute('open');
});

const container = document.querySelector('.benefits--unavailable .benefits__list');
container.classList.add('hidden');

const expando = document.getElementById('unavailableBenefitsButton');
expando.classList.remove('hidden');

expando.addEventListener("click", () => {
  if (expando.getAttribute('aria-expanded') === 'true') {
    container.classList.add('hidden')
    container.setAttribute('aria-hidden', true)
    expando.setAttribute('aria-expanded', false)
    expando.querySelector('div.closed').classList.remove('hidden')
    expando.querySelector('div.open').classList.add('hidden')
  } else {
    container.classList.remove('hidden')
    container.setAttribute('aria-hidden', false)
    expando.setAttribute('aria-expanded', true)
    expando.querySelector('div.closed').classList.add('hidden')
    expando.querySelector('div.open').classList.remove('hidden')
  }
});
