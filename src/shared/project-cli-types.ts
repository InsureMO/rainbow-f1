export interface ProjectCli {
	command?: string;
	version?: string;
	exists?: boolean;
}

export interface ProjectCliSet {
	volta?: ProjectCli;
	node?: ProjectCli;
	npm?: ProjectCli;
	yarn?: ProjectCli;
}

export enum ProjectCliEvent {
	COMMANDS = 'cli-commands',
	VERSION = 'cli-version'
}
