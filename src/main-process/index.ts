import log from 'electron-log/main';
import fixPath from 'fix-path';
import './handlers';

// fix the $PATH on macOS/Linux
fixPath();
// Optional, initialize the logger for any renderer process
log.initialize();

export * from './splash-window';
export * from './project-window';
export * from './main-window';
export * from './first-window';
