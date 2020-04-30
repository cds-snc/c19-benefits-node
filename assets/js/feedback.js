const { serialize } = require('./serialize');
const axios = require('axios');

const getLocale = () => {
  return document.documentElement.lang || 'en';
}

const form = document.getElementById('feedback-form');
const confirmation = document.getElementById('feedback-confirmation');
const errorMsg = document.getElementById('feedback-error');

const submitFeedback = (event) => {
  event.preventDefault();

  const formData = serialize(form);

  axios.post('/' + getLocale() + '/feedback', formData).then((response) => {
    form.classList.add('hidden');
    confirmation.classList.remove('hidden');
  }).catch((error) => {
    console.log(error);
    errorMsg.classList.remove('hidden');
  })
}

if (form) {
  // intercept the form submit
  form.addEventListener('submit', submitFeedback);
}