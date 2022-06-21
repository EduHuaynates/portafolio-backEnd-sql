const env = process.env.NODE_ENV;

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
  },
  server: {
    port: process.env.PORT || 3001,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || "27017",
    name: process.env.DEV_DB_NAME || "qlik-app",
    user: process.env.DEV_DB_USER || "qlik-app",
    password: process.env.DEV_DB_PASSWORD || "qlik-app",
  },
  jwt: {
    secreto: "esteesmisecretito",
    expireTime: "24h",
  },
  url: {
    mongo_connect: process.env.URL_MONGO_DEV,
  },
};

const config = {
  dev,
};

module.exports = config[env];
