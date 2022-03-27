const dirs = require('./dirs');
const modules = require('./module');
const { entries, pages } = require('./pages');
const { injectedParams } = require('./env');

module.exports = { dirs, modules, entries, pages, injectedParams };
