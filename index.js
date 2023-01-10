"use strict";
const pino = require("pino");

let severityLabelsMap = null;

function severity(label) {
  if (severityLabelsMap && severityLabelsMap.has(label))
    return severityLabelsMap.get(label);

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
 * @property {string} options.logLocation where the log file will be located
 * @property {boolean} options.shouldPrettyPrint if it should be a pretty one line print (true) or a json object (false)
 * @property { [ { label: string, newLabel: string } ] } options.severityLabels add more severity labels
 * @property {function} options.mixin mixin for additional information in the log statement
 */

/**
 * @param {LoggerOptions} options
 * @return {object} the logger.
 *
 */
function init(options) {
  const shouldPrettyPrint =
    options?.shouldPrettyPrint ??
    ["development", "test", "dev"].includes(process.env.NODE_ENV?.toLowerCase());

  const logLocation = options?.logLocation ?? (process.env.NODE_ENV?.toLowerCase() === "test" && "./logs/test.log")

  if (!severityLabelsMap && options?.severityLabels) {
    severityLabelsMap = new Map(
      options.severityLabels.map((o) => [o.label, o.newLabel])
    );
  }

  return pino({
    level: options?.logLevel ?? "info",
    formatters: {
      level(label) {
        return {
          level: label,
          ...(!shouldPrettyPrint && { severity: severity(label) }),
        };
      },
    },
    timestamp: () => `, "time": "${new Date().toISOString()}"`,
    transport: shouldPrettyPrint
      ? {
          target: "pino-pretty",
          options: {
            destination: logLocation ?? 1,
            colorize: shouldPrettyPrint && !logLocation,
            ignore: "pid,hostname",
          },
        }
      : undefined,
    ...(!shouldPrettyPrint && { messageKey: "message" }),
    mixin: options?.mixin,
  });
}

module.exports = init;
