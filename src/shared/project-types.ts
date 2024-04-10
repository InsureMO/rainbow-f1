import {ProjectCliSet} from './project-cli-types';

export enum F1ModuleType {
	D9 = 'd9',
	O23 = 'o23',
	UNKNOWN = 'unknown'
}

export interface F1ModuleDependencies {
	[key: string]: boolean;
}

export interface F1ModuleSettings<D extends F1ModuleDependencies = F1ModuleDependencies> {
	name: string;
	type: F1ModuleType;
	dependencies: D;
}

export interface D9ModuleDependencies extends F1ModuleDependencies {
	'@rainbow-d9/n1': boolean;
	'@rainbow-d9/n2': boolean;
	'@rainbow-d9/n3': boolean;
	'@rainbow-d9/echarts': boolean;
	'@rainbow-d9/thai-plan-selection': boolean;
}

export interface D9ModuleSettings extends F1ModuleSettings<D9ModuleDependencies> {
}

export interface O23ModuleDependencies extends F1ModuleDependencies {
	'@rainbow-o23/n90': boolean;
	'@rainbow-o23/n91': boolean;
	'@rainbow-o23/n92': boolean;
}

export interface O23ModuleSettings extends F1ModuleSettings<O23ModuleDependencies> {
}

export interface UnknownModuleDependencies extends F1ModuleDependencies {
}

export interface UnknownModuleSettings extends F1ModuleSettings<UnknownModuleDependencies> {
}

export interface F1ProjectEnvs {
	cli?: ProjectCliSet;
}

export interface F1ProjectSettings {
	name: string;
	directory?: string;
	envs?: F1ProjectEnvs;
	modules: Array<F1ModuleSettings>;
}

export interface F1Project {
	name: string;
	directory: string;
	envs?: F1ProjectEnvs;
	modules: Array<F1ModuleSettings>;
}

export interface F1ProjectCreated {
	success: boolean;
	project: F1Project;
	message?: string;
}

export interface F1ProjectExisted {
	success: boolean;
	project?: F1Project;
	message?: string;
	exists?: boolean;
	broken?: true;
}

export interface F1ProjectLoaded {
	success: boolean;
	project?: F1Project;
	message?: string;
}

export enum F1ProjectEvent {
	CREATE = 'f1-project-create',
	OPEN = 'f1-project-open',
	TRY_TO_OPEN = 'f1-project-try-to-open',
	CLOSE_ON_FAILED_OPEN = 'f1-project-close-on-failed-open',
	LOAD_ATTACHED = 'f1-project-load-attached',
	ON_OPENED = 'f1-project-on-opened'
}
