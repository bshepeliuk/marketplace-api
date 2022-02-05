import {
  PermissionDeniedApiError,
  UnauthorizedApiError,
} from '../utils/ApiErrors';
import isItPublicRoute from '../utils/isItPublicRoute';

function authGate(req, res, next) {
  const { config } = req.context;

  const hasSession = req.session.hasOwnProperty('current');
  const role = hasSession ? req.session.current.role : null;

  const isLoggedIn = hasSession && req.session.current.isLoggedIn;

  const isPublicRoute = isItPublicRoute({
    path: req.raw.url,
    method: req.method,
  });
  // prettier-ignore
  const hasNoPermission = config.hasOwnProperty('roles') && !config.roles.includes(role);
  const hasNoAuthorized = !isLoggedIn && !isPublicRoute;

  if (hasNoAuthorized) {
    return next(new UnauthorizedApiError());
  }

  if (hasNoPermission) {
    return next(new PermissionDeniedApiError());
  }

  next();
}

export default authGate;
