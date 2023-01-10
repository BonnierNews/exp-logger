{
  process.env.NODE_ENV = "development"
  const logger = require("../index")();
  logger.info("hello world");
}

{
  process.env.NODE_ENV = "test"
  const logger = require("../index")();
  logger.info("hello world");
}

{
  process.env.NODE_ENV = "production"
  const logger = require("../index")();
  logger.info("hello world");
}