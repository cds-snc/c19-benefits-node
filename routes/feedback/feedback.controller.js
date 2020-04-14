module.exports = (app, route) => {
  route.draw(app)
    .post((req, res) => {
      const feedback = {
        "problems": req.body.problems,
        "session": req.locals.session.id,
        "version": process.env.GITHUB_SHA,
        "url": req.headers.referer || req.headers.referrer,
      }
      console.log(JSON.stringify({ "feedback": feedback }));

      return res.redirect('back');
    })
}
