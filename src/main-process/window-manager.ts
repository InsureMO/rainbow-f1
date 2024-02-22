import {BrowserWindow} from 'electron';
import {F1Project} from '../shared';

export enum WindowType {
	MAIN,
	PROJECT,
	SPLASH,
	ABOUT
}

const WINDOWS: Map<number, WindowType> = new Map<number, WindowType>();
const WINDOW_PROJECTS: Map<number, F1Project> = new Map<number, F1Project>();

export default class WindowManager {
	private constructor() {
		// to avoid extend
	}

	public static register(window: BrowserWindow, type: WindowType) {
		WINDOWS.set(window.id, type);
		window.once('closed', () => WINDOWS.delete(window.id));
	}

	public static registerMain(window: BrowserWindow, project: F1Project) {
		WINDOW_PROJECTS.set(window.id, project);
		window.once('closed', () => WINDOW_PROJECTS.delete(window.id));
		WindowManager.register(window, WindowType.MAIN);
	}

	public static type(window: BrowserWindow): WindowType | undefined {
		return WINDOWS.get(window.id);
	}

	public static project(window: BrowserWindow): F1Project | null {
		return WINDOW_PROJECTS.get(window.id);
	}

	public static projects(): Array<F1Project> {
		return [...WINDOW_PROJECTS.values()];
	}
}
