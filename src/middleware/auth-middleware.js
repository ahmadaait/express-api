import { prismaClient } from '../application/database.js';

export const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  // Check for authorization header presence
  if (!authorizationHeader) {
    return res.status(401).json({ errors: 'Unauthorized' }).end();
  }

  // Extract token with Bearer scheme validation
  const [scheme, token] = authorizationHeader.split(' ');
  if (scheme.toLowerCase() !== 'bearer' || !token) {
    return res
      .status(401)
      .json({ errors: 'Invalid authorization format' })
      .end();
  }

  const user = await prismaClient.user.findFirst({
    where: {
      token,
    },
  });

  if (!user) {
    return res.status(401).json({ errors: 'Unauthorized' }).end();
  }

  req.user = user;
  next();
};
