import {BrowserWindow} from 'electron';
import {F1Project} from '../../shared';
import {RecentProjectsWorker} from '../worker';

export enum WindowType {
	MAIN,
	PROJECT,
	SPLASH,
	ABOUT
}

const WINDOWS: Map<number, WindowType> = new Map<number, WindowType>();
const WINDOW_PROJECTS: Map<number, F1Project> = new Map<number, F1Project>();

class WindowManager {
	public registerWindow(window: BrowserWindow, type: WindowType) {
		WINDOWS.set(window.id, type);
		window.once('closed', () => WINDOWS.delete(window.id));
	}

	public registerMainWindow(window: BrowserWindow, project: F1Project) {
		WINDOW_PROJECTS.set(window.id, project);
		window.once('closed', () => {
			const project = WINDOW_PROJECTS.get(window.id);
			WINDOW_PROJECTS.delete(window.id);
			RecentProjectsWorker.removeLastProject(project);
		});
		this.registerWindow(window, WindowType.MAIN);
	}

	public type(window: BrowserWindow): WindowType | undefined {
		return WINDOWS.get(window.id);
	}

	public project(window: BrowserWindow): F1Project | null {
		return WINDOW_PROJECTS.get(window.id);
	}

	public projects(): Array<F1Project> {
		return [...WINDOW_PROJECTS.values()];
	}
}

const INSTANCE = new WindowManager();

export {INSTANCE as WindowManager};
