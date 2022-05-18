var cron = require("node-cron");

//Every 15 Mins
cron.schedule(
  "15,30,55,0 * * * *",
  () => {
    console.log("Running a job at 15,30,45,0 at "+process.env.TIMEZONE+" timezone");
  },
  {
    scheduled: true,
    timezone: process.env.TIMEZONE,
  }
);
