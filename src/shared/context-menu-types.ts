export type ContextMenuTemplateItem = Omit<Electron.MenuItemConstructorOptions, 'submenu' | 'click'> & {
	submenu?: Array<ContextMenuTemplateItem>;
	click?: string;
}

export type ContextMenu = Array<ContextMenuTemplateItem>;

export enum ContextMenuEvent {
	SHOW = 'context-menu-show',
	CLICKED = 'context-menu-clicked',
	WILL_CLOSE = 'context-menu-will-close'
}
