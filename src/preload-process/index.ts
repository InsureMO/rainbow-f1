import {contextBridge} from 'electron';
import {ContextMenuHandlers} from './context-menu';
import {RecentProjectsHandlers} from './recent-projects';
import {StoreHandlers} from './store';
import {ThemeHandlers} from './theme';

contextBridge.exposeInMainWorld('electron', {
	store: StoreHandlers,
	theme: ThemeHandlers,
	recentProjects: RecentProjectsHandlers,
	contextMenu: ContextMenuHandlers
} as WindowElectronHandler);
