import asyncHandler from 'express-async-handler';

/**
 * ### Middleware for authenticating routes.
 */

const authenticate_route = asyncHandler(async (_request, _response, _next) => {
  // ------ START ------ //
  // TODO: Implement authenticate_route middleware logic
  _next();
  // ------ END ------ //
});

export default authenticate_route;
