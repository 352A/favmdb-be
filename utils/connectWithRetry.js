const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectWithRetry = async (sequelize, retries = 5, delay = 3000) => {
  for (let i = 1; i <= retries; i++) {
    try {
      await sequelize.authenticate();
      console.log("✅ Database connected");
      await sequelize.sync({ alter: true });
      console.log("✅ Models synced");
      return;
    } catch (err) {
      console.error(`❌ DB connection attempt ${i} failed: ${err.message}`);
      if (i === retries) throw err;
      console.log(`🔁 Retrying in ${delay / 1000} seconds...`);
      await wait(delay);
    }
  }
};

module.exports = connectWithRetry;
