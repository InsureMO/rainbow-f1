import {ModuleFileType} from '../../../shared';
import {JsonEditor} from './index';
import {ModuleFileResource} from '../opened/types';

import {EditorContainer} from './widgets';

export interface ModuleFileEditorProps {
	resource: ModuleFileResource;
}

export const ModuleFileEditor = (props: ModuleFileEditorProps) => {
	const {resource} = props;
	const {file} = resource;

	let editor = null;
	if (file.type === ModuleFileType.JSON || file.basename.endsWith('.json')) {
		editor = <JsonEditor resource={resource}/>;
	}

	return <EditorContainer>
		{editor}
	</EditorContainer>;
};