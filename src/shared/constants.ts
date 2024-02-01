export enum Theme {
	EVENT_NAME = 'theme-changed', LIGHT = 'light', DARK = 'dark', SYSTEM = 'system'
}

export type ThemeSource = Exclude<Theme, Theme.EVENT_NAME>;

export enum Store {
	GET_EVENT_NAME = 'get-from-store', SET_EVENT_NAME = 'set-to-store',
	GET_THEME = 'get-theme'
}
