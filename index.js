"use strict";
const pino = require("pino");

function severity(label) {
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

/**
 * @typedef LoggerOptions
 * @property {string} options.logLevel="info" which level of severity to log at
 * @property {function} options.mixin mixin for additional information in the log statement
 * @property {function} [options.formatLog] function to do change the shape of the log object
 */

/** @typedef {import("pino").Logger} Logger */

/**
 * @param {LoggerOptions} options
 * @return {Logger} the logger.
 *
 */
function init(options) {
  const env = process.env.NODE_ENV || "development";
  const shouldPrettyPrint = ["development", "test", "dev"].includes(env);

  const logLocation = (env === "test" && "./logs/test.log");
  return pino({
    level: options?.logLevel ?? "info",
    messageKey: "message",
    base: undefined,
    formatters: {
      level(label) {
        if (shouldPrettyPrint) {
          return { level: label };
        }
        return { severity: severity(label) };
      },
      ...(options?.formatLog && { log: options?.formatLog }),
    },
    timestamp: () => `,"time": "${new Date().toISOString()}"`,
    transport: shouldPrettyPrint
      ? {
          target: "pino-pretty",
          options: {
            destination: logLocation || 1,
            colorize: !logLocation,
            messageKey: "message",
          },
        }
      : undefined,
    mixin: options?.mixin,
    redact: options?.redact,
  });
}

module.exports = init;
