import { logger, consoleTransport } from "react-native-logs";

const InteractionManager = require("react-native").InteractionManager;
const log = logger.createLogger({
  transport: consoleTransport,
  severity: "debug",
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
  },
  asyncFunc: InteractionManager.runAfterInteractions,
});

export { log };
