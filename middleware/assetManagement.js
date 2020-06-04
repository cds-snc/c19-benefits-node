const assetManagement = (app) => function (req, res, next) {
  /**
 * Create an asset path helper for templates
 * If a CDN_PREFIX is set in env, the helper 
 * will return the path with the CDN prefix,
 * otherwise it just returns the path with 
 * current protocol and host prefix
 */
  app.locals.asset = (path) => {
    const assetPrefix = process.env.CDN_PREFIX || '//' + req.get('host');

    return req.protocol + ':' + assetPrefix + path;
  }

  /**
   * Used to append the apps version to the end of an asset declaration in a view
   * Will invalidate older versions of that asset.
   */
  app.locals.assetVersion = () => {
    const id = process.env.TAG_VERSION;
    return id;
  }

  next()
}


module.exports = {
  assetManagement,
}
