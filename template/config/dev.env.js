'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"dev"',
  ENV_CONFIG: '"dev"',
  API_ROOT: '""',
  DIST_PATH: '"./"',
  PUBLISH_PATH: '"./"'
})
