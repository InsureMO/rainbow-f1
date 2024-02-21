export interface CommandLine {
	command?: string;
	version?: string;
	exists?: boolean;
}

export interface CommandLines {
	volta?: CommandLine;
	node?: CommandLine;
	npm?: CommandLine;
	yarn?: CommandLine;
}
