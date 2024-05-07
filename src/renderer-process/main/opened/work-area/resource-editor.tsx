import {Icons} from '@rainbow-d9/n2';
import {Fragment} from 'react';
import {ModuleFileResource, Resource} from '../types';
import {ModuleFileEditor} from './file-editor';
import {EditorNotSupportedContainer, EditorResourceLocation, EditorResourceLocationSegment} from './widgets';

export interface ResourceEditorProps {
	resource: Resource;
}

export const EditorNotSupported = (props: ResourceEditorProps) => {
	const {resource} = props;

	return <EditorNotSupportedContainer>
		<span>Editor is currently not supported for the open resource:</span>
		<EditorResourceLocation>
			{resource.segments.map((segment, index) => {
				return <Fragment key={`${segment.label}-${index}`}>
					{index !== 0 ? <Icons.AngleRight/> : null}
					<EditorResourceLocationSegment>
						{segment.icon}
						<span>{segment.label}</span>
					</EditorResourceLocationSegment>
				</Fragment>;
			})}
		</EditorResourceLocation>
	</EditorNotSupportedContainer>;
};

export const ResourceEditor = (props: ResourceEditorProps) => {
	const {resource} = props;

	const file = (resource as ModuleFileResource).file;
	if (file == null) {
		return <EditorNotSupported resource={resource}/>;
	} else {
		return <ModuleFileEditor resource={resource as ModuleFileResource}/>;
	}
};