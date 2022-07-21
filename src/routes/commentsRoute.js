import * as CommentsController from '../controllers/CommentsController';
import authGate from '../middlewares/authGate';

const addCommentOptions = {
  handler: CommentsController.add,
  preHandler: authGate,
};

const getCommentsOptions = {
  handler: CommentsController.getAllByDeviceId,
  preHandler: authGate,
};

const commentRoutes = async (fastify) => {
  fastify.post('/api/comments', addCommentOptions);
  fastify.get('/api/comments/:deviceId', getCommentsOptions);
};

export default commentRoutes;
