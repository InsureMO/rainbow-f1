import dotenv from 'dotenv';
import {useEffect, useState} from 'react';
import {F1ModuleStructure, ModuleCommand, ModuleFile} from '../../../../shared';
import {ModuleCommandResource, ModuleFileResource, ResourceType} from '../../opened/types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../../opened/workbench/event-bus';
import {MODULE_ENV_FILE_MARKER} from '../../utils';
import {VariableTable} from './variable-table';

export interface EnvItemValues {
	/** no matter what value, it is parsed as a string. leave it to be empty if there is no value presented */
	value: string;
	/** sometimes the item is commented in env file, it will be loaded anyway */
	commented?: boolean;
	/** value is env file name, which relative to module root */
	file: ModuleFile;
}

export interface EnvValues {
	/**
	 * key is configuration key, values might be multiple when it occurs in multiple env files,
	 * only the first uncommented value will be applied
	 */
	[key: string]: Array<EnvItemValues>;
}

export interface EnvValuesWrapperProps {
	module: F1ModuleStructure;
	resource: ModuleCommandResource;
}

interface EnvValuesWrapperState {
	command: ModuleCommand;
	loaded: boolean;
	values: EnvValues;
}

const asModuleFileResource = (module: F1ModuleStructure, file: ModuleFile): ModuleFileResource => {
	return {
		marker: MODULE_ENV_FILE_MARKER(module, file),
		type: ResourceType.ENV_FILE,
		segments: [], // segments ignored here
		// @ts-ignore
		module: () => module,
		file: file,
		absolutePath: () => file.path,
		relativePathToRoot: () => file.pathRelativeToRoot,
		relativePathToProjectRoot: () => file.pathRelativeToProjectRoot,
		relativePathToModuleRoot: () => file.pathRelativeToModuleRoot
	};
};

export const EnvValuesWrapper = (props: EnvValuesWrapperProps) => {
	const {module, resource} = props;
	const {command} = resource;

	const {fire} = useWorkbenchEventBus();
	const [state, setState] = useState<EnvValuesWrapperState>({command, loaded: false, values: {}});
	useEffect(() => {
		if (state.loaded && command === state.command) {
			// loaded and command not changed, do nothing
		} else if (state.loaded) {
			// reset state since command changed
			// for next round initializing
			setState({command, loaded: false, values: {}});
		} else {
			// initializing
			const files = (module.files ?? []).reduce((files, file) => {
				files[file.pathRelativeToModuleRoot] = file;
				return files;
			}, {} as Record<string, ModuleFile>);
			const envFiles = (state.command.envFiles ?? [])
				.map(envFile => files[envFile])
				.filter(envFile => envFile != null);
			(async () => {
				const values: EnvValues = {};
				await envFiles.reverse().reduce(async (previous, envFile) => {
					await previous;
					return new Promise<void>(resolve => {
						fire(WorkbenchEventTypes.ASK_MODULE_FILE_CONTENT, asModuleFileResource(module, envFile),
							(content: string) => {
								Object.entries(dotenv.parse(Buffer.from(content)))
									.map(([name, value]) => {
										if (values[name] == null) {
											values[name] = [{value, file: envFile}];
										} else {
											values[name].push({value, file: envFile});
										}
									});
								resolve();
							}, () => {
								// ignore error
								resolve();
							});
					});
				}, Promise.resolve());
				setState(state => ({...state, loaded: true, values}));
			})();
		}
	}, [fire, command, state.command, state.loaded]);

	if (!state.loaded) {
		return null;
	}

	return <VariableTable module={module} resource={resource} values={state.values}/>;
};
