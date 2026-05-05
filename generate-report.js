const reporter = require('cucumber-html-reporter');
const fs = require('fs');

const options = {
  theme: 'bootstrap',
  jsonFile: 'cucumber-report.json',
  output: 'TEST_REPORT.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    "App Name": "TodoMVC",
    "Test Environment": "Local",
    "Browser": "Chrome",
    "Platform": "Windows",
    "Executed": new Date().toLocaleString()
  }
};

// Check if the JSON report exists
if (fs.existsSync(options.jsonFile)) {
  reporter.generate(options);
  console.log('HTML report generated successfully: TEST_REPORT.html');
} else {
  console.error('Cucumber JSON report not found. Please run tests first.');
  process.exit(1);
}
