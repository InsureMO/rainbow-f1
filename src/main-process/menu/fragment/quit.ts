export interface QuitMenuItemOptions {
	action: () => void;
	check: boolean;
}

export const createQuitMenuItem = (options: QuitMenuItemOptions): Electron.MenuItemConstructorOptions => {
	const {action} = options;

	return {
		label: 'Quit @Rainbow-F1',
		accelerator: 'CmdOrCtrl+Q',
		click: () => {
			// TODO CHECK IF THERE IS ANY UNSAVED WORK
			action();
		}
	};
};
