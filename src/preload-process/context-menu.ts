import {ipcRenderer} from 'electron';
import {EventEmitter} from 'events';
import {ContextMenu, ContextMenuEvent, ElectronBridges} from '../shared';

class ContextMenuClickBridge {
	private readonly _eventBus = new EventEmitter();

	constructor() {
		ipcRenderer.on(ContextMenuEvent.ON_CLICK, (_: Electron.IpcRendererEvent, ...args: any[]) => {
			const [command] = args;
			this._eventBus.emit(ContextMenuEvent.ON_CLICK, command);
		});
		ipcRenderer.on(ContextMenuEvent.ON_WILL_CLOSE, (_: Electron.IpcRendererEvent) => {
			// will close also can be triggered by clicking on the menu item
			// The event happens before the menu click (for some unknown reason),
			// so the clean-up action is executed after 200ms to ensure the menu click event is received correctly.
			setTimeout(() => {
				this._eventBus.removeAllListeners(ContextMenuEvent.ON_CLICK);
			}, 200);
		});
	}

	public onceMenuClicked(listener: (command: string) => void): void {
		this._eventBus.once(ContextMenuEvent.ON_CLICK, listener);
	}
}

const ClickBridge = new ContextMenuClickBridge();
export const ContextMenuBridge: ElectronBridges.WindowElectronContextMenu = {
	onClick: (listener: (command: string) => void) => {
		ClickBridge.onceMenuClicked(listener);
	},
	showContextMenu: (menu: ContextMenu) => {
		ipcRenderer.send(ContextMenuEvent.SHOW, menu);
	}
};
