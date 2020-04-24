const { routes } = require('../config/routes.config');

const route = (name, lang) => {
  if (!name) {
    throw new Error('Route helper: missing name argument');
  }

  if (!lang) {
    lang = 'en'
  }

  const route = routes.find(rt => rt.name === name);
  return lang + route.path[lang];
}

module.exports = {
  route,
}