import IpcRendererEvent = Electron.IpcRendererEvent;
import {ipcRenderer} from 'electron';
import {EventEmitter} from 'events';
import {ContextMenu, ContextMenuEvent} from '../shared/types';

class IpcRendererBridge {
	private readonly _eventBus = new EventEmitter();

	constructor() {
		ipcRenderer.on(ContextMenuEvent.CLICKED, (_: IpcRendererEvent, ...args: any[]) => {
			const [command] = args;
			this._eventBus.emit(ContextMenuEvent.CLICKED, command);
		});
		ipcRenderer.on(ContextMenuEvent.WILL_CLOSE, (_: IpcRendererEvent) => {
			this._eventBus.emit(ContextMenuEvent.WILL_CLOSE);
		});
	}

	public onMenuClicked(listener: (command: string) => void): void {
		this._eventBus.on(ContextMenuEvent.CLICKED, listener);
	}

	public offMenuClicked(listener: (command: string) => void): void {
		this._eventBus.off(ContextMenuEvent.CLICKED, listener);
	}

	public onceMenuClicked(listener: (command: string) => void): void {
		this._eventBus.once(ContextMenuEvent.CLICKED, listener);
	}

	public onceMenuClosed(listener: () => void): void {
		this._eventBus.once(ContextMenuEvent.WILL_CLOSE, listener);
	}
}

const ipcRendererBridge = new IpcRendererBridge();

export const ContextMenuHandlers: WindowElectronContextMenu = {
	onClicked: (listener: (command: string) => void) => {
		ipcRendererBridge.onMenuClicked(listener);
	},
	offClicked: (listener: (command: string) => void) => {
		ipcRendererBridge.offMenuClicked(listener);
	},
	onceClicked: (listener: (command: string) => void) => {
		ipcRendererBridge.onceMenuClicked(listener);
	},
	onClosed: (listener: () => void) => {
		ipcRendererBridge.onceMenuClosed(listener);
	},
	showContextMenu: (menu: ContextMenu) => {
		ipcRenderer.send(ContextMenuEvent.SHOW, menu);
	}
};
