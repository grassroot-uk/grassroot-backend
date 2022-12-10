module.exports = [{
  script: 'dist/main',
  name: 'grassroot',
  exec_mode: 'cluster',
  instances: 2
}, {
  script: 'worker.js',
  name: 'worker'
}]