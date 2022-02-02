import { PUBLIC_ROUTES } from '../config/constants';
import {
  PermissionDeniedApiError,
  UnauthorizedApiError,
} from '../utils/ApiErrors';

const isItPublicRoute = ({ path, method }) => {
  const isItDocsRoute = path.split('/')[1] === 'docs';

  const isItPublic = PUBLIC_ROUTES.some(
    (route) => route.path === path && route.method === method
  );

  return isItDocsRoute || isItPublic;
};

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
