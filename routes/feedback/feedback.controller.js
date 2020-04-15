/* istanbul ignore file */
module.exports = (app, route) => {
  route.draw(app)
    .post((req, res) => {
      const date = new Date();

      const feedback = {
        "problems": req.body.problems || "n/a",
        "session": req.locals.session.id || "n/a",
        "version": process.env.GITHUB_SHA || "n/a",
        "url": req.headers.referer || req.headers.referrer || "n/a",
        "date": date.toISOString(),
      }
      console.log(JSON.stringify({ "feedback": feedback }));

      sendNotification(feedback);

      return res.redirect('back');
    })
}

const sendNotification = (feedback) => {
  if (!(process.env.NOTIFY_API_KEY && process.env.FEEDBACK_EMAIL_TO && process.env.NOTIFY_ENDPOINT)) {
    return;
  }

  const NotifyClient = require('notifications-node-client').NotifyClient
  const notify = new NotifyClient(process.env.NOTIFY_ENDPOINT, process.env.NOTIFY_API_KEY)

  notify
    .sendEmail('111f0bc5-8682-4df1-9e16-d73e86bea46d', process.env.FEEDBACK_EMAIL_TO, {
      personalisation: feedback,
    })
    .then(response => console.log(response))
    .catch(err => console.error(err))
}
