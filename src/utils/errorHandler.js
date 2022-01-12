import { ApiError } from './ApiErrors';

function errorHandler(error, req, res) {
  res.log.error(error);

  if (error instanceof ApiError) {
    error.sendResponse(res);
    return;
  }

  if (error.hasOwnProperty('validation')) {
    res.status(400).send({ message: error.message });
    return;
  }

  res.status(500).send({ message: error.message });
}

export default errorHandler;
