import IpcRendererEvent = Electron.IpcRendererEvent;
import {ipcRenderer} from 'electron';
import {EventEmitter} from 'events';
import {ContextMenu, ContextMenuEvent} from '../shared';

class ContextMenuBridge {
	private readonly _eventBus = new EventEmitter();

	constructor() {
		ipcRenderer.on(ContextMenuEvent.CLICKED, (_: IpcRendererEvent, ...args: any[]) => {
			const [command] = args;
			this._eventBus.emit(ContextMenuEvent.CLICKED, command);
		});
		ipcRenderer.on(ContextMenuEvent.WILL_CLOSE, (_: IpcRendererEvent) => {
			// will close also can be triggered by clicking on the menu item
			// The event happens before the menu click (for some unknown reason),
			// so the clean-up action is executed after 200ms to ensure the menu click event is received correctly.
			setTimeout(() => {
				this._eventBus.removeAllListeners(ContextMenuEvent.CLICKED);
			}, 200);
		});
	}

	public onceMenuClicked(listener: (command: string) => void): void {
		this._eventBus.once(ContextMenuEvent.CLICKED, listener);
	}
}

const bridge = new ContextMenuBridge();

export const ContextMenuHandlers: WindowElectronContextMenu = {
	onClick: (listener: (command: string) => void) => {
		bridge.onceMenuClicked(listener);
	},
	showContextMenu: (menu: ContextMenu) => {
		ipcRenderer.send(ContextMenuEvent.SHOW, menu);
	}
};
