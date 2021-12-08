const envConfigMap = {
    'dev': require('./dev.env'),
    'prod': require('./prod.env'),
    'demo': require('./demo.env')
  };
  
  const env = envConfigMap[process.env.ENV_CONFIG] || require('./prod.env')
  
  module.exports = env