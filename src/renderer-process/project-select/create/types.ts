export enum ProjectModuleBase {
	BASIC = 'basic',
	ENVS = 'envs',
	MODULE = 'module'
}

export interface BaseState {
	base: ProjectModuleBase;
	index: number;
}

export interface ModuleSettingsState {
	nameMessage?: string;
}
