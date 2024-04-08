export type ProjectCliCommand = string;
export type ProjectCliVersion = string;

export interface ProjectCli {
	command?: ProjectCliCommand;
	version?: ProjectCliVersion;
	exists?: boolean;
}

export interface ProjectCliSet {
	volta?: ProjectCli;
	node?: ProjectCli;
	npm?: ProjectCli;
	yarn?: ProjectCli;
}

export enum ProjectCliEvent {
	DETECT_CLI_SET = 'cli-commands',
	DETECT_CLI_VERSION = 'cli-version'
}
