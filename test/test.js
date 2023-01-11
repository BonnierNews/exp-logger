{
  const logger = require("../index")();
  logger.info("hello world 1");
}

{
  process.env.NODE_ENV = "test";
  const logger = require("../index")();
  logger.info("hello world 2");
}

{
  process.env.NODE_ENV = "production";
  const logger = require("../index")();
  logger.info("hello world 3");
}

{
  process.env.NODE_ENV = "production";
  const logger = require("../index")({ shouldPrettyPrint: true });
  logger.info("hello world 4");
}
{
  process.env.NODE_ENV = "test";
  const logger = require("../index")({ logLocation: "./logs/diff.log" });
  logger.info("hello world 5");
}
