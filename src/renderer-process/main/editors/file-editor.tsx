import {ModuleFileResource} from '../opened/types';
import {isJavascriptFile, isJsonFile} from '../utils';
import {JavascriptEditor, JsonEditor} from './index';

import {EditorContainer} from './widgets';

export interface ModuleFileEditorProps {
	resource: ModuleFileResource;
}

export const ModuleFileEditor = (props: ModuleFileEditorProps) => {
	const {resource} = props;
	const {file} = resource;

	let editor = null;
	if (isJavascriptFile(file)) {
		editor = <JavascriptEditor resource={resource}/>;
	} else if (isJsonFile(file)) {
		editor = <JsonEditor resource={resource}/>;
	}

	return <EditorContainer>
		{editor}
	</EditorContainer>;
};
