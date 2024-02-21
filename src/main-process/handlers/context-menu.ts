import {BrowserWindow, ipcMain, Menu} from 'electron';
import {ContextMenuEvent, ContextMenuTemplateItem} from '../../shared';
import IpcMainEvent = Electron.IpcMainEvent;
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

class ApplicationContextMenu {
	constructor() {
		ipcMain.on(ContextMenuEvent.SHOW, (event, template: Array<ContextMenuTemplateItem>) => {
			const transformed: Array<MenuItemConstructorOptions> = template.map(item => {
				return this.transformTemplateItem(item, event);
			});
			const menu = Menu.buildFromTemplate(transformed);
			menu.on('menu-will-close', () => event.sender.send(ContextMenuEvent.WILL_CLOSE));
			menu.popup({window: BrowserWindow.fromWebContents(event.sender)});
		});
	}

	protected transformTemplateItem(item: ContextMenuTemplateItem, event: IpcMainEvent): MenuItemConstructorOptions {
		return {
			...item,
			submenu: item.submenu?.map(subItem => this.transformTemplateItem(subItem, event)),
			click: item.click != null ? () => event.sender.send(ContextMenuEvent.CLICKED, item.click) : (void 0)
		};
	};
}

export default new ApplicationContextMenu();
