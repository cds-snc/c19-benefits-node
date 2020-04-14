module.exports = (app, route) => {
  route.draw(app)
    .post((req, res) => {
      const date = new Date();

      const feedback = {
        "problems": req.body.problems,
        "session": req.locals.session.id,
        "version": process.env.GITHUB_SHA,
        "url": req.headers.referer || req.headers.referrer,
        "date": date.toISOString(),
      }
      console.log(JSON.stringify({ "feedback": feedback }));

      return res.redirect('back');
    })
}
