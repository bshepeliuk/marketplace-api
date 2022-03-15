import { PUBLIC_ROUTES } from '../config/constants';
// TODO: change check auth
const isItPublicRoute = ({ path, method }) => {
  const isItDocsRoute = path.split('/')[1] === 'docs';
  // prettier-ignore
  const isItDevicePublicRoute = path.split('/').includes('devices') && method === 'GET';
  const isItPublicRouteWithQueryParams =
    path
      .substr(0, path.indexOf('?'))
      .split('/')
      .includes('devices') && method === 'GET';

  const isItPublic = PUBLIC_ROUTES.some(
    (route) => route.path === path && route.method === method
  );
  // TODO: change checking for this route
  const isItPriceFilterPath = path.split('/')[2] === 'min-max-price';

  return (
    isItDocsRoute ||
    isItPublic ||
    isItDevicePublicRoute ||
    isItPublicRouteWithQueryParams ||
    isItPriceFilterPath
  );
};

export default isItPublicRoute;
