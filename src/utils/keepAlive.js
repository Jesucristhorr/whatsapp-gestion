const cron = require("cron");
const axios = require("axios").default;

const url = "https://whatsapp-manta-kninos.herokuapp.com/api/v1/";

const wake = () => {
  const cronJob = new cron.CronJob("0 */25 * * * *", async () => {
    try {
      const res = await axios(url);
      console.log(`Response-ok: ${res.ok}, Status: ${res.status}`);
    } catch (err) {
      console.error(err);
    }
  });

  cronJob.start();
};

module.exports = { wake };
