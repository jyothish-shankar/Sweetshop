const app = require('./app');
const { syncDb } = require('./models');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await syncDb();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();