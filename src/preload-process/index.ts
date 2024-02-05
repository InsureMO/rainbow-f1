import {contextBridge} from 'electron';
import {ContextMenuHandlers} from './context-menu';
import {RecentProjectsHandlers} from './recent-projects';
import {StoreHandlers} from './store';
import {ThemeHandlers} from './theme';
import {Versions} from './versions';

contextBridge.exposeInMainWorld('electron', {
	versions: Versions,
	store: StoreHandlers,
	theme: ThemeHandlers,
	recentProjects: RecentProjectsHandlers,
	contextMenu: ContextMenuHandlers
} as WindowElectronHandler);
