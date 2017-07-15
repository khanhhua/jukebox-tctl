const logger = require('../lib/logger')

logger.info('Starting server...')
require('../../server/main').listen(3000, '0.0.0.0', () => {
  logger.success('Server is running at http://0.0.0.0:3000')
})
