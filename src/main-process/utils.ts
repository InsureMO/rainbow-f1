export const isMac = () => process.platform === 'darwin';
export const isWin = () => process.platform === 'win32';
export const isDev = (): boolean => !!MAIN_WINDOW_VITE_DEV_SERVER_URL;

export const isBlank = (value: string | null | undefined): boolean => value == null || `${value}`.trim().length === 0;
export const isNotBlank = (value: string | null | undefined): boolean => !isBlank(value);
