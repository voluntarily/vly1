const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb+srv://vly-client:ZhF3BUDiwpy8C3xK@vly-cluster-1-dl1mj.mongodb.net/test?retryWrites=true',
  // 'mongodb://localhost:27017/vly1',
  port: process.env.PORT || 8000,
};

export default config;
