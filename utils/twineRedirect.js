const { passages } = require('./../routing.json')
const { routes: ourRoutes } = require('./../config/routes.config')
const enText = require('./../locales/en.json')

export const twineRedirect = () => {
  return (req, res, next) => {
    const currentRoute = ourRoutes.find(route => route.path[req.locale] === req.path)

    const currentPassage = passages.find(passage => passage.name === currentRoute.name)

    // find string that corresponds to the value submitted
    // TODO: the Object.keys method is a bad assumption, and we should fix this, so that it takes in the name of our input to look for, but for testing this out it'll do
    const textValue = enText[req.body[Object.keys(req.body)[1]]]

    // Find the answer in the passage that matches the text answer
    const nextPassage = currentPassage.links.find(link => link.name === textValue)

    const nextRoute =  ourRoutes.find(route => route.name === nextPassage.link)

    // Redirect
    res.redirect(nextRoute.path[req.locale])
  }
}