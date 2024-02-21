export const isMac = () => process.platform === 'darwin';
export const isWin = () => process.platform === 'win32';
export const isDev = (): boolean => !!MAIN_WINDOW_VITE_DEV_SERVER_URL;

