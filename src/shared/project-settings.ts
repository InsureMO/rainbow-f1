export interface F1ModuleSettings {
	name: string;
}

export interface D9ProjectSettings extends F1ModuleSettings {
}

export interface O23ProjectSettings extends F1ModuleSettings {
}

export interface F1ProjectSettings {
	name: string;
	d9?: Array<D9ProjectSettings>;
	o23?: Array<O23ProjectSettings>;
}
