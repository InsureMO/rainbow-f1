/**
 * use pre-built edit menu
 */
export const createEditMenu = (): Electron.MenuItemConstructorOptions => {
	return {label: 'Edit', role: 'editMenu'} as Electron.MenuItemConstructorOptions;
};
