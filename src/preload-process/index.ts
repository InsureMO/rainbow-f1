import {contextBridge} from 'electron';
import {ContextMenuHandlers} from './context-menu';
import {DialogHandlers} from './dialog';
import {F1ProjectHandlers} from './f1';
import {FileSystemHandlers} from './fs';
import {PathHandlers} from './path';
import {RecentProjectsHandlers} from './recent-projects';
import {StoreHandlers} from './store';
import {ThemeHandlers} from './theme';
import {Versions} from './versions';

contextBridge.exposeInMainWorld('electron', {
	versions: Versions,
	fs: FileSystemHandlers,
	path: PathHandlers,
	store: StoreHandlers,
	theme: ThemeHandlers,
	recentProjects: RecentProjectsHandlers,
	contextMenu: ContextMenuHandlers,
	dialog: DialogHandlers,
	f1: F1ProjectHandlers
} as WindowElectronHandler);
