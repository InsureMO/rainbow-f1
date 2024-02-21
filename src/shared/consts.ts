export const MIN_NODE_VERSION = '18.19';
export const MIN_NPM_VERSION = '10.2';
export const RECOMMENDED_YARN_VERSION = '1.22';

export const isNodeVersionValid = (version: string) => {
	return version >= MIN_NODE_VERSION;
};
export const isNpmVersionValid = (version: string) => {
	return version >= MIN_NPM_VERSION;
};

export const F1_PROJECT_FILE = '.f1.json';
export const F1_PROJECT_WORKSPACE_FILE = 'package.json';
