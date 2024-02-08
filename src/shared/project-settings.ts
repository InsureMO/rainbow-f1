export interface F1ModuleSettings {
	name: string;
}

export interface D9ModuleSettings extends F1ModuleSettings {
}

export interface O23ModuleSettings extends F1ModuleSettings {
}

export interface F1ProjectSettings {
	name: string;
	directory?: string;
	d9?: Array<D9ModuleSettings>;
	o23?: Array<O23ModuleSettings>;
}
