{
  const logger = require("../index")();
  logger.info("hello world 1");
  const error = new Error("Test error format");
  logger.warn(error, "This message overrides err.message");
}

{
  process.env.NODE_ENV = "test";
  const logger = require("../index")();
  logger.info("hello world 2");
  logger.warn({ some: "extra data" }, "And a message!");
}

{
  process.env.NODE_ENV = "production";
  const logger = require("../index")();
  logger.info("hello world 3");
}
