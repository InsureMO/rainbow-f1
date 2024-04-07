export const createDevMenu = (): Electron.MenuItemConstructorOptions => {
	return {
		label: 'Developers',
		submenu: [
			{label: 'Zoom In', role: 'zoomIn'} as Electron.MenuItemConstructorOptions,
			{label: 'Zoom Out', role: 'zoomOut'} as Electron.MenuItemConstructorOptions,
			{label: 'Zoom Reset', role: 'resetZoom'} as Electron.MenuItemConstructorOptions,
			{type: 'separator'} as Electron.MenuItemConstructorOptions,
			{label: 'Reload', role: 'reload'} as Electron.MenuItemConstructorOptions,
			{label: 'Force Reload', role: 'forceReload'} as Electron.MenuItemConstructorOptions,
			{type: 'separator'} as Electron.MenuItemConstructorOptions,
			{label: 'Toggle Developer Tools', role: 'toggleDevTools'} as Electron.MenuItemConstructorOptions
		]
	};
};
