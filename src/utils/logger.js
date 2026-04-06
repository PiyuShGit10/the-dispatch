const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };
const CURRENT_LEVEL = LEVELS[process.env.LOG_LEVEL || 'info'] ?? LEVELS.info;

function pad(n) {
  return String(n).padStart(2, '0');
}

function timestamp() {
  const d = new Date();
  return (
    d.getFullYear() + '-' +
    pad(d.getMonth() + 1) + '-' +
    pad(d.getDate()) + ' ' +
    pad(d.getHours()) + ':' +
    pad(d.getMinutes()) + ':' +
    pad(d.getSeconds())
  );
}

function format(level, component, message, data) {
  const ts = timestamp();
  const prefix = `[${ts}] [${level.toUpperCase()}] [${component}]`;
  if (data !== undefined) {
    return `${prefix} ${message} ${JSON.stringify(data)}`;
  }
  return `${prefix} ${message}`;
}

/**
 * Create a logger scoped to a component name.
 * @param {string} component
 */
export function createLogger(component) {
  return {
    debug(msg, data) {
      if (CURRENT_LEVEL <= LEVELS.debug) console.debug(format('debug', component, msg, data));
    },
    info(msg, data) {
      if (CURRENT_LEVEL <= LEVELS.info) console.log(format('info', component, msg, data));
    },
    warn(msg, data) {
      if (CURRENT_LEVEL <= LEVELS.warn) console.warn(format('warn', component, msg, data));
    },
    error(msg, data) {
      if (CURRENT_LEVEL <= LEVELS.error) console.error(format('error', component, msg, data));
    },
  };
}
