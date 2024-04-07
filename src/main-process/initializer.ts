import log from 'electron-log/main';
import fixPath from 'fix-path';

// fix the $PATH on macOS/Linux
fixPath();
// Optional, initialize the logger for any renderer process
log.initialize();
