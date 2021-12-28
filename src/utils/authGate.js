const routes = {
  login: '/api/auth/login',
  register: '/api/auth/register',
};

const isItPublicRoute = (url) => {
  return [routes.login, routes.register].includes(url);
};

function authGate(req, res, next) {
  const { config } = req.context;

  const hasSession = req.session.hasOwnProperty('current');
  const role = hasSession ? req.session.current.role : null;

  const isLoggedIn = hasSession && req.session.current.isLoggedIn;
  const isPublicRoute = isItPublicRoute(req.raw.url);
  // prettier-ignore
  const hasNoPermission = config.hasOwnProperty('roles') && !config.roles.includes(role);
  const hasNoAuthorized = !isLoggedIn && !isPublicRoute;

  if (hasNoAuthorized) {
    res.status(401);
    return next(new Error('Unauthorized.'));
  }

  if (hasNoPermission) {
    res.status(403);
    return next(new Error('Access denied.'));
  }

  next();
}

export default authGate;
