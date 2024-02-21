import {ContextMenuTemplateItem} from '../../shared';

export interface ContextMenuItem extends Omit<ContextMenuTemplateItem, 'submenu'> {
	invoke?: () => void;
	submenu?: Array<ContextMenuItem>;
}

export const showContextMenu = (menu: Array<ContextMenuItem>) => {
	const handlers: Record<ContextMenuItem['click'], ContextMenuItem['invoke']> = {};
	const transformItem = (item: ContextMenuItem): ContextMenuTemplateItem => {
		const {invoke, click, submenu, ...rest} = item;
		if (click != null) {
			handlers[click] = invoke;
		}
		return {
			...rest, click, submenu: (submenu != null && submenu.length !== 0) ? submenu.map(transformItem) : (void 0)
		};
	};
	const transformed = menu.map(transformItem);
	const onMenuClicked = (command: ContextMenuItem['click']) => {
		// console.log(`Context menu responds with command[${command}].`);
		const invoke = handlers[command];
		if (invoke != null) {
			invoke();
		} else {
			console.error(`No context menu handler found for command[${command}].`);
		}
	};
	window.electron.contextMenu.onClick(onMenuClicked);
	window.electron.contextMenu.showContextMenu(transformed);
};
