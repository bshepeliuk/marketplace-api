import * as CommentsController from '../controllers/CommentsController';
import authGate from '../middlewares/authGate';

const addCommentOptions = {
  handler: CommentsController.add,
  preHandler: authGate,
};

const getCommentsOptions = {
  handler: CommentsController.getAllByDeviceId,
};

const updateCommentOptions = {
  handler: CommentsController.updateComment,
  preHandler: authGate,
};

const deleteCommentOptions = {
  handler: CommentsController.deleteComment,
  preHandler: authGate,
};

const getRepliesOptions = {
  handler: CommentsController.getRepliesByCommentId,
};

const commentRoutes = async (fastify) => {
  fastify.get('/api/comments/:deviceId', getCommentsOptions);
  fastify.post('/api/comments', addCommentOptions);
  fastify.patch('/api/comments', updateCommentOptions);
  fastify.delete('/api/comments/:commentId', deleteCommentOptions);
  fastify.get('/api/replies/:commentId', getRepliesOptions);
};

export default commentRoutes;
