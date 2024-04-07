import {contextBridge} from 'electron';
import {ElectronBridges} from '../shared';
import {ContextMenuBridge} from './context-menu';
import {DialogBridge} from './dialog';
import {FileSystemBridge} from './file-system';
import {PathBridge} from './path';
import {ProjectBridge} from './project';
import {ProjectCliBridge} from './project-cli';
import {RecentProjectsBridge} from './recent-projects';
import {StoreBridge} from './store';
import {ThemeBridge} from './theme';
import {VersionsBridge} from './versions';

contextBridge.exposeInMainWorld('electron', {
	versions: VersionsBridge,
	fs: FileSystemBridge,
	path: PathBridge,
	store: StoreBridge,
	theme: ThemeBridge,
	contextMenu: ContextMenuBridge,
	dialog: DialogBridge,
	recentProjects: RecentProjectsBridge,
	cli: ProjectCliBridge,
	project: ProjectBridge
} as ElectronBridges.WindowElectronBridge);
