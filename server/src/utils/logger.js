function write(level, message, meta) {
  const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;

  if (meta === undefined) {
    console[level === 'error' ? 'error' : 'log'](line);
    return;
  }

  console[level === 'error' ? 'error' : 'log'](line, meta);
}

const logger = {
  info(message, meta) {
    write('info', message, meta);
  },
  warn(message, meta) {
    write('warn', message, meta);
  },
  error(message, meta) {
    write('error', message, meta);
  },
};

export default logger;
