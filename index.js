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

function init({
  logLevel = "info",
  mixin,
  shouldPrettyPrint = false,
  severityLabels = [],
  logLocation = "./logs/test.log",
  setDestination = false,
}) {
  if (!severityLabelsMap)
    severityLabelsMap = new Map(
      severityLabels.map((o) => [o.label, o.newLabel])
    );

    return pino(
    {
      level: logLevel,
      formatters: {
        level(label) {
          return { level: label, severity: severity(label) };
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
