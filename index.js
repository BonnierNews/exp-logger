"use strict";
const pino = require("pino");

function severity(label, severityLabels) {
  if (severityLabels.length > 0) {
    for (const object of severityLabels) {
      if (object.label === label) {
        return object.newLabel;
      }
    }
  }

  switch (label) {
    case "trace":
      return "DEBUG";
    case "debug":
      return "DEBUG";
    case "info":
      return "INFO";
    case "warn":
      return "WARNING";
    case "error":
      return "ERROR";
    case "fatal":
      return "CRITICAL";
    default:
      return "DEFAULT";
  }
}

function init({
  logLevel = "info",
  mixin,
  shouldPrettyPrint = false,
  severityLabels = [],
  logLocation = "./logs/test.log",
  setDestination = false,
}) {
  const env = process.env.NODE_ENV;
  return pino(
    {
      level: logLevel,
      formatters: {
        level(label) {
          return { level: label, severity: severity(label, severityLabels) };
        },
      },
      timestamp: () => `, "time": "${new Date().toISOString()}"`,
      transport: {
        target: "pino-pretty",
        options: shouldPrettyPrint && {
          destination: setDestination ? logLocation : 1,
          colorize: setDestination === false,
          ignore: "pid,hostname",
        },
      },
      messageKey: "message",
      mixin,
    },
    setDestination && pino.destination(logLocation)
  );
}

module.exports = init;
