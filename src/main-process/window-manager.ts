import {BrowserWindow} from 'electron';

export enum WindowType {
	MAIN,
	PROJECT,
	SPLASH,
	ABOUT
}

const WINDOWS: Map<number, WindowType> = new Map<number, WindowType>();

export default class WindowManager {
	private constructor() {
		// to avoid extend
	}

	public static register(window: BrowserWindow, type: WindowType) {
		WINDOWS.set(window.id, type);
		window.once('closed', () => WINDOWS.delete(window.id));
	}

	public static type(window: BrowserWindow): WindowType | undefined {
		return WINDOWS.get(window.id);
	}

	public static hasMainWindow(): boolean {
		return Array.from(WINDOWS.values()).filter(value => value === WindowType.MAIN).length !== 0;
	}
}
