import {ModuleFileResource} from '../opened/types';
import {isJavascriptFile, isJsonFile, isSqlFile, isTypescriptFile, isYamlFile} from '../utils';
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
	if (isSqlFile(file)) {
		editor = <SqlEditor resource={resource}/>;
	} else if (isYamlFile(file)) {
		editor = <YamlEditor resource={resource}/>;
	} else if (isJavascriptFile(file)) {
		editor = <JavascriptEditor resource={resource}/>;
	} else if (isTypescriptFile(file)) {
		editor = <TypescriptEditor resource={resource}/>;
	} else if (isJsonFile(file)) {
		editor = <JsonEditor resource={resource}/>;
	}

	return <>
		<EditorContainer>
			{editor}
		</EditorContainer>
		<EditorStatusBar>
			<EditorStatusBarGrabber/>
		</EditorStatusBar>
	</>;
};
