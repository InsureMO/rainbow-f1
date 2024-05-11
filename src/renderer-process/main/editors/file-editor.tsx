import {ModuleCommandResource, ModuleFileResource, ResourceType} from '../opened/types';
import {isJavascriptFile, isJsonFile, isSqlFile, isTypescriptFile, isYamlFile} from '../utils';
import {EditModeSwitcher} from './edit-mode-switcher';
import {EnvCommandEditor} from './env-command-editor';
import {JavascriptEditor, JsonEditor, SqlEditor, YamlEditor} from './index';
import {TypescriptEditor} from './typescript-editor';
import {EditorContainer, EditorStatusBar, EditorStatusBarGrabber} from './widgets';

export interface ModuleFileEditorProps {
	resource: ModuleFileResource;
}

export const ModuleFileEditor = (props: ModuleFileEditorProps) => {
	const {resource} = props;
	const {file} = resource;

	let editor = null;
	// check is sequential
	switch (true) {
		case resource.type === ResourceType.COMMAND:
		case resource.type === ResourceType.ENV_COMMAND:
			return <EnvCommandEditor resource={resource as ModuleCommandResource}/>;
		case isSqlFile(file):
			editor = <SqlEditor resource={resource}/>;
			break;
		case isYamlFile(file):
			editor = <YamlEditor resource={resource}/>;
			break;
		case isJavascriptFile(file):
			editor = <JavascriptEditor resource={resource}/>;
			break;
		case isTypescriptFile(file):
			editor = <TypescriptEditor resource={resource}/>;
			break;
		case isJsonFile(file):
			editor = <JsonEditor resource={resource}/>;
			break;
		default:
		// do nothing, no editor found
	}

	return <>
		<EditorContainer>
			{editor}
		</EditorContainer>
		<EditorStatusBar>
			<EditorStatusBarGrabber/>
			<EditModeSwitcher resource={resource}/>
		</EditorStatusBar>
	</>;
};
