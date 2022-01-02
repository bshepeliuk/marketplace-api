import { PUBLIC_ROUTES } from '../config/constants';
import {
  PermissionDeniedApiError,
  UnauthorizedApiError,
} from '../utils/ApiErrors';

const isItPublicRoute = (url) => {
  return [PUBLIC_ROUTES.login, PUBLIC_ROUTES.register].includes(url);
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
    return next(new UnauthorizedApiError());
  }

  if (hasNoPermission) {
    return next(new PermissionDeniedApiError());
  }

  next();
}

export default authGate;