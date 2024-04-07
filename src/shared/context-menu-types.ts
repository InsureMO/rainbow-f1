export type ContextMenuClickCommand = string;

export interface ContextMenuTemplateItem extends Omit<Electron.MenuItemConstructorOptions, 'submenu' | 'click'> {
	submenu?: Array<ContextMenuTemplateItem>;
	click?: ContextMenuClickCommand;
}

export type ContextMenu = Array<ContextMenuTemplateItem>;

export enum ContextMenuEvent {
	SHOW = 'context-menu-show',
	ON_CLICK = 'context-menu-on-click',
	ON_WILL_CLOSE = 'context-menu-on-will-close'
}
