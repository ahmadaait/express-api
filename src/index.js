import { http } from './application/http.js';
import { logger } from './core/logging/logging.js';

const port = process.env.PORT || 3000;

http.listen(port, () => {
  logger.info(`App start on port ${port}`);
});
