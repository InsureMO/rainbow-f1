import {CommandLines} from './command-lines';

export enum F1ModuleType {
	D9 = 'd9',
	O23 = 'o23'
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
	'@rainbow-d9/n5': boolean;
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

export interface F1ProjectEnvs {
	cli?: CommandLines;
}

export interface F1ProjectSettings {
	name: string;
	directory?: string;
	envs?: F1ProjectEnvs;
	modules: Array<F1ModuleSettings>;
}
