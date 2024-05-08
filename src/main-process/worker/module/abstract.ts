import {spawnSync} from 'child_process';
import log from 'electron-log/main';
import {ModuleFileType, ProjectCliCommand} from '../../../shared';
import {PathWorker} from '../path';

export interface ModuleCreated {
	success: boolean;
	ret: boolean;
	message?: ErrorMessage;
}

export abstract class AbstractModuleProcessor {
	protected executeModuleCreateCli(command: ProjectCliCommand, args: Array<string>, directory: string, moduleName: string): ModuleCreated {
		const cli = [command, ...args].join(' ');
		log.info(`Create module[${directory}/${moduleName}] by command [${cli}].`);
		const result = spawnSync(command, args, {encoding: 'utf-8', cwd: directory});
		if (result.error == null && result.stdout != null && result.stdout.trim().length !== 0) {
			return {success: true, ret: true};
		} else {
			log.error(`Failed to create module[${moduleName}] by command [${cli}].`, result.error, result.stderr);
			return {
				success: true, ret: false,
				message: `Failed to create module[${moduleName}] by command [${cli}].`
			};
		}
	}

	/**
	 * 1. guess by basename first
	 * 2. guess by extname second
	 * 3. return unknown
	 *
	 * please note that
	 * 1. O23 pipeline configuration files are yaml, will not be detected here, they just are yaml.
	 * 2. O23 env files could be any name, will not be detected here, they just are unknown.
	 */
	protected guessFileType(file: string): ModuleFileType {
		const basename = PathWorker.basename(file);
		switch (true) {
			case basename === 'readme.md' || basename === 'README.md':
				return ModuleFileType.README;
			// only for O23, use vite for D9
			case basename === 'webpack.config.js':
				return ModuleFileType.WEBPACK_CONFIG;
			case basename === 'nest-cli.json':
				return ModuleFileType.NEST_CONFIG;
			// only for D9, use webpack for O23
			case basename === 'vite.config.js':
				return ModuleFileType.VITE_CONFIG;
			case /^babel\.config\.(json|js|cjs)$/.test(basename) || /^\.babelrc(\.(json|js|cjs))?$/.test(basename):
				return ModuleFileType.BABEL_CONFIG;
			case /^prettier\.config\.(json|js|cjs)$/.test(basename) || /^\.prettierrc(\.(json|js|cjs))?$/.test(basename):
				return ModuleFileType.PRETTIER_CONFIG;
			case /^tsconfig(\..+)?.json$/.test(basename):
				return ModuleFileType.TS_CONFIG;
			case /^eslint\.config\.(json|js|cjs)$/.test(basename) || /^\.eslintrc(\.(json|js|cjs))?$/.test(basename):
				return ModuleFileType.ESLINT_CONFIG;
			case basename === 'yarn.lock':
				return ModuleFileType.YARN_LOCK;
			case basename === 'package-lock.json':
				return ModuleFileType.NPM_LOCK;
			case basename === 'package.json':
				return ModuleFileType.PACKAGE_JSON;
		}
		const ext = (PathWorker.extname(file) ?? '').toLowerCase();
		switch (ext) {
			case '.ts':
			case '.tsx':
				return ModuleFileType.TYPESCRIPT;
			case '.js':
				return ModuleFileType.JAVASCRIPT;
			case '.cjs':
				return ModuleFileType.COMMON_JAVASCRIPT;
			case '.mjs':
				return ModuleFileType.ECMA_MODULE_JAVASCRIPT;
			case '.json':
				return ModuleFileType.JSON;
			case '.htm':
			case '.html':
				return ModuleFileType.HTML;
			case '.css':
				return ModuleFileType.CSS;
			case '.yml':
			case '.yaml':
				return ModuleFileType.YAML;
			case '.sql':
				return ModuleFileType.SQL;
		}

		return ModuleFileType.UNKNOWN;
	}
}