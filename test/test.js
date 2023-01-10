{
  const logger = require("../index")({
    shouldPrettyPrint: true,
  });

  logger.info("pretty print");
}

{
  const logger = require("../index")({
    shouldPrettyPrint: true,
    logLocation: './logs/test.log'
  });

  logger.info("pretty print & log (ignores the pretty print because you dont need to colorize the log file)");
}

{
  const logger = require("../index")({
    logLocation: './logs/test.log'});

  logger.info("only log");
}

{
  const logger = require("../index")();

  logger.info("no options");
}

{
  const logger = require("../index")({ severityLabels: [ {label: "info", newLabel: "NEW_INFO"}]});

  logger.info("label change");
}

{
  const logger = require("../index")({
    shouldPrettyPrint: false
  });

  logger.info("no pretty print");
}
