import {useEffect, useState} from 'react';
import {ModuleEnvFileIcon} from '../../../../assets/icons';
import {F1ModuleStructure, ModuleFile, ModuleFileType} from '../../../../shared';
import {ModuleCommandResource, ModuleFileResource, Resource, ResourceType} from '../../opened/types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../../opened/workbench/event-bus';
import {MODULE_ENV_FILE_MARKER} from '../../utils';
import {useWorkAreaEditorEventBus, WorkAreaEditorEventTypes} from '../event-bus';
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
	files: Array<ModuleFileResource>;
	active?: ModuleFileResource;
}

const asModuleFileResource = (module: F1ModuleStructure, resource: ModuleCommandResource, envFile: string): ModuleFileResource => {
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

export const VariableSection = (props: VariableSectionProps) => {
	const {resource} = props;
	const {module: getModule, env, command} = resource;

	const {fire: fireWorkbench} = useWorkbenchEventBus();
	const {on, off, fire} = useWorkAreaEditorEventBus();
	const module = getModule();
	const [state, setState] = useState<VariableSectionState>(() => {
		const files = (command.envFiles ?? []).map(envFile => asModuleFileResource(module, resource, envFile));
		return {files, active: files[files.length - 1]};
	});
	useEffect(() => {
		const files = (resource.command.envFiles ?? []).map(envFile => asModuleFileResource(module, resource, envFile));
		setState({files, active: files[files.length - 1]});
	}, [module, resource]);
	useEffect(() => {
		// since the edit/read mode switcher is outside, and operate resource is given command resource
		// so here delegate the status to active env file resource
		if (state.active != null) {
			fireWorkbench(WorkbenchEventTypes.ASK_RESOURCE_LOCK_STATUS, resource, (locked: boolean) => {
				if (locked) {
					fire(WorkAreaEditorEventTypes.LOCK_CONTENT, state.active);
				} else {
					fire(WorkAreaEditorEventTypes.UNLOCK_CONTENT, state.active);
				}
			});
		}
		const onLockContent = (locked: Resource) => {
			if (resource !== locked || state.active == null) {
				return;
			}
			fire(WorkAreaEditorEventTypes.LOCK_CONTENT, state.active);
		};
		const onUnlockContent = (unlocked: Resource) => {
			if (resource !== unlocked || state.active == null) {
				return;
			}
			fire(WorkAreaEditorEventTypes.UNLOCK_CONTENT, state.active);
		};
		on(WorkAreaEditorEventTypes.LOCK_CONTENT, onLockContent);
		on(WorkAreaEditorEventTypes.UNLOCK_CONTENT, onUnlockContent);
		return () => {
			off(WorkAreaEditorEventTypes.LOCK_CONTENT, onLockContent);
			off(WorkAreaEditorEventTypes.UNLOCK_CONTENT, onUnlockContent);
		};
	}, [on, off, fire, resource, state.active]);

	if (env == null) {
		return null;
	}

	const onClicked = (envFile: ModuleFileResource) => () => {
		setState(state => ({...state, active: envFile}));
	};

	return <>
		<EnvFilesHeader>
			<EnvFilesHeaderTabs>
				{[...state.files].reverse().map((envFile) => {
					return <EnvFilesHeaderTab active={envFile === state.active}
					                          onClick={onClicked(envFile)}
					                          key={envFile.absolutePath()}>
						<ModuleEnvFileIcon/>
						<EnvFilesHeaderTabTitle>{envFile.relativePathToModuleRoot()}</EnvFilesHeaderTabTitle>
					</EnvFilesHeaderTab>;
				})}
			</EnvFilesHeaderTabs>
		</EnvFilesHeader>
		<EnvFileBody>
			<EnvFileEditorWrapper>
				{state.active == null
					? null
					: <EnvFileEditor resource={state.active}/>}
			</EnvFileEditorWrapper>
		</EnvFileBody>
	</>;
};
