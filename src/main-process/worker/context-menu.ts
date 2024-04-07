import {BrowserWindow, ipcMain, Menu} from 'electron';
import {ContextMenu, ContextMenuEvent, ContextMenuTemplateItem} from '../../shared';

class ContextMenuWorker {
	public showContextMenu(event: Electron.IpcMainEvent, template: ContextMenu): void {
		const transformed: Array<Electron.MenuItemConstructorOptions> = template.map(item => {
			return this.transformTemplateItem(item, event);
		});
		const menu = Menu.buildFromTemplate(transformed);
		menu.on('menu-will-close', () => event.sender.send(ContextMenuEvent.ON_WILL_CLOSE));
		menu.popup({window: BrowserWindow.fromWebContents(event.sender)});
	}

	protected transformTemplateItem(item: ContextMenuTemplateItem, event: Electron.IpcMainEvent): Electron.MenuItemConstructorOptions {
		return {
			...item,
			submenu: item.submenu?.map(subItem => this.transformTemplateItem(subItem, event)),
			click: item.click != null ? () => event.sender.send(ContextMenuEvent.ON_CLICK, item.click) : (void 0)
		};
	};
}

const INSTANCE = (() => {
	const worker = new ContextMenuWorker();
	ipcMain.on(ContextMenuEvent.SHOW, (event: Electron.IpcMainEvent, template: ContextMenu): void => {
		worker.showContextMenu(event, template);
	});
	return worker;
})();
export {INSTANCE as ContextMenuWorker};
