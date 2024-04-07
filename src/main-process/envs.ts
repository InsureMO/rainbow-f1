class Envs {
	private readonly _mac: boolean;
	private readonly _win: boolean;
	private readonly _dev: boolean;

	public constructor() {
		this._mac = process.platform === 'darwin';
		this._win = process.platform === 'win32';
		this._dev = !!MAIN_WINDOW_VITE_DEV_SERVER_URL;
	}

	get mac(): boolean {
		return this._mac;
	}

	get win(): boolean {
		return this._win;
	}

	get dev(): boolean {
		return this._dev;
	}
}

const INSTANCE = new Envs();

export {INSTANCE as Envs};
