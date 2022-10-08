const SauceLabs = require('saucelabs').default;
const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

// return a saucelab account instance
const getSauceLabsAccount = () => {
  return new SauceLabs({
    user: SAUCE_USERNAME,
    key: SAUCE_ACCESS_KEY,
  });
};

// function to get n latest jobs
const getLatestJobs = async (numJobs, myAccount) => {
  const { jobs } = await myAccount.listJobs(SAUCE_USERNAME, {
    limit: numJobs,
    full: true,
  });
  return jobs;
};

// update the job status to passed
const updateJobStatus = async (myAccount, job) => {
  const jobId = job.id;
  const modifiedJob = { ...job, passed: true };
  const update = await myAccount.updateJob(SAUCE_USERNAME, jobId, modifiedJob);
  return update;
};


module.exports = {
  getSauceLabsAccount,
  updateJobStatus,
  getLatestJobs,
};
