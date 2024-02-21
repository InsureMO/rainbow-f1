import {CommandLines} from './command-lines';

export interface F1ModuleSettings {
	name: string;
}

export interface D9ModuleDependencies {
	'@rainbow-d9/n1': boolean;
	'@rainbow-d9/n2': boolean;
	'@rainbow-d9/n3': boolean;
	'@rainbow-d9/n5': boolean;
	'@rainbow-d9/echarts': boolean;
	'@rainbow-d9/thai-plan-selection': boolean;

	// other dependencies
	[key: string]: boolean;
}

export interface D9ModuleSettings extends F1ModuleSettings {
	dependencies: D9ModuleDependencies;
}

export interface O23ModuleDependencies {
	'@rainbow-o23/n90': boolean;
	'@rainbow-o23/n91': boolean;
	'@rainbow-o23/n92': boolean;

	// other dependencies
	[key: string]: boolean;
}

export interface O23ModuleSettings extends F1ModuleSettings {
	dependencies: O23ModuleDependencies;
}

export interface F1ProjectEnvs {
	cli?: CommandLines;
}

export interface F1ProjectSettings {
	name: string;
	directory?: string;
	envs?: F1ProjectEnvs;
	d9?: Array<D9ModuleSettings>;
	o23?: Array<O23ModuleSettings>;
}
