import {
  PermissionDeniedApiError,
  UnauthorizedApiError,
} from '../utils/ApiErrors';

function authGate(req, res, next) {
  const { config } = req.context;

  const hasSession = req.session.hasOwnProperty('current');
  const role = hasSession ? req.session.current.role : null;

  const isLoggedIn = hasSession && req.session.current.isLoggedIn;
  // prettier-ignore
  const hasNoPermission = config.hasOwnProperty('roles') && !config.roles.includes(role);
  const hasNoAuthorized = !isLoggedIn;

  if (hasNoAuthorized) {
    return next(new UnauthorizedApiError());
  }

  if (hasNoPermission) {
    return next(new PermissionDeniedApiError());
  }

  next();
}

export default authGate;
