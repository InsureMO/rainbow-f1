import {useEffect, useState} from 'react';
import {ModuleEnvFileIcon} from '../../../../assets/icons';
import {F1ModuleStructure, ModuleFile, ModuleFileType} from '../../../../shared';
import {ModuleCommandResource, ModuleFileResource, ResourceType} from '../../opened/types';
import {MODULE_ENV_FILE_MARKER} from '../../utils';
import {EnvFileEditor} from './env-file-editor';
import {
	EnvFileBody,
	EnvFileEditorWrapper,
	EnvFilesHeader,
	EnvFilesHeaderTab,
	EnvFilesHeaderTabs,
	EnvFilesHeaderTabTitle
} from './widgets';

export interface VariableSectionProps {
	resource: ModuleCommandResource;
}

export interface VariableSectionState {
	active?: string;
}

export const VariableSection = (props: VariableSectionProps) => {
	const {resource} = props;
	const {module: getModule, env, command} = resource;
	const [state, setState] = useState<VariableSectionState>(() => {
		const files = command.envFiles ?? [];
		return {active: files[files.length - 1]};
	});
	useEffect(() => {
		const files = command.envFiles ?? [];
		setState({active: files[files.length - 1]});
	}, [command]);

	if (env == null) {
		return null;
	}

	const module = getModule();
	const asModuleFileResource = (module: F1ModuleStructure, envFile: string): ModuleFileResource => {
		const files = (module.files ?? []).reduce((files, file) => {
			files[file.pathRelativeToModuleRoot] = file;
			return files;
		}, {} as Record<string, ModuleFile>);

		const file = files[envFile] ?? (() => {
			const resourcePath = resource.absolutePath();
			const modulePath = resourcePath.slice(0, -resource.relativePathToModuleRoot().length);
			const path = window.electron.path.resolve(modulePath, envFile);
			return {
				basename: window.electron.path.basename(envFile),
				path,
				pathRelativeToRoot: path.substring(resourcePath.slice(0, -resource.relativePathToRoot().length).length),
				pathRelativeToProjectRoot: path.substring(resourcePath.slice(0, -resource.relativePathToProjectRoot().length).length),
				pathRelativeToModuleRoot: envFile,
				dir: false, type: ModuleFileType.ENV_FILE
			} as ModuleFile;
		})();
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

	const onClicked = (envFile: string) => () => {
		setState(state => ({...state, active: envFile}));
	};

	return <>
		<EnvFilesHeader>
			<EnvFilesHeaderTabs>
				{[...(command.envFiles ?? [])].reverse().map((envFile) => {
					return <EnvFilesHeaderTab active={envFile === state.active}
					                          onClick={onClicked(envFile)}
					                          key={envFile}>
						<ModuleEnvFileIcon/>
						<EnvFilesHeaderTabTitle>{envFile}</EnvFilesHeaderTabTitle>
					</EnvFilesHeaderTab>;
				})}
			</EnvFilesHeaderTabs>
		</EnvFilesHeader>
		<EnvFileBody>
			<EnvFileEditorWrapper>
				{state.active == null
					? null
					: <EnvFileEditor resource={asModuleFileResource(module, state.active)}/>}
			</EnvFileEditorWrapper>
		</EnvFileBody>
	</>;
};
