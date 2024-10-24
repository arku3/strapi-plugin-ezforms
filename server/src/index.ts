/**
 * Application methods
 */
import bootstrap from './bootstrap.js';
/**
 * Plugin server methods
 */
import config from './config/index.js';
import contentTypes from './content-types/index.js';
import controllers from './controllers/index.js';
import destroy from './destroy.js';
import register from './register.js';
import routes from './routes/index.js';
import services from './services/index.js';

export default {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes,
};
