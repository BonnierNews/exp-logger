const logger = require("./index")({
  shouldPrettyPrint: true,
  severityLabels: [{ label: "info", newLabel: "new" }],
});


logger.info("hello world")