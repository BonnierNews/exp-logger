"use strict";
const pino = require("pino");

const config = require("exp-config");
const { getId } = require("exp-correlator");

function severity(label) {
    
  // In case of new/different labels it can be added through config
  if (config.logging?.severityLabels?.length > 0) {
    for (const object of config.severityLabels) {
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

const shouldPrettyPrint = ["development", "test"].includes(config.envName);
const logger = pino(
  {
    level: process.env.LOG_LEVEL || config.logLevel || "info",
    formatters: {
      level(label) {
        return { level: label, severity: severity(label) };
      },
    },
    timestamp: () => `, "time": "${new Date().toISOString()}"`,
    transport: {
      target: "pino-pretty",
      options: shouldPrettyPrint && {
        destination: config.envName === "test" ? "./logs/test.log" : 1,
        colorize: shouldPrettyPrint,
        ignore: "pid,hostname",
      },
    },
    messageKey: "message",
    mixin: () => ({ correlationId: getId() }),
  },
  config.envName === "test" && pino.destination("logs/test.log")
);

module.exports = logger
