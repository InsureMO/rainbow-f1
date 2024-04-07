import {ElectronBridges} from './shared';

declare global {
	interface Window {
		electron: ElectronBridges.WindowElectronBridge;
	}
}
