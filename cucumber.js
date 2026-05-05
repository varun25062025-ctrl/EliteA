module.exports = {
  default: {
    require: ['features/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'html:cucumber-report.html',
      'json:cucumber-report.json',
      'summary'
    ],
    parallel: 1,
    retry: 0,
    failFast: false,
    strict: true,
    publishQuiet: true,
    timeout: 60000
  }
};
