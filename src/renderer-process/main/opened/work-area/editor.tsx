import {useEffect, useRef, useState} from 'react';
import {ResourceEditor} from '../../editors';
import {Resource} from '../types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../workbench/event-bus';
import {WorkAreaEditorContainer} from './widgets';

export const WorkAreaEditor = () => {
	const editorRef = useRef<HTMLDivElement>(null);
	const {on, off} = useWorkbenchEventBus();
	const [resource, setResource] = useState<Resource>(null);
	useEffect(() => {
		const onOpenResource = (resourceToOpen: Resource) => {
			if (resourceToOpen === resource) {
				return;
			}
			setResource(resourceToOpen);
		};
		const onCloseResource = (resource?: Resource) => {
			setResource(null);
		};
		on(WorkbenchEventTypes.OPEN_RESOURCE, onOpenResource);
		on(WorkbenchEventTypes.CLOSE_RESOURCE, onCloseResource);
		return () => {
			off(WorkbenchEventTypes.OPEN_RESOURCE, onOpenResource);
			off(WorkbenchEventTypes.CLOSE_RESOURCE, onCloseResource);
		};
	}, [on, off]);

	return <WorkAreaEditorContainer ref={editorRef}>
		{resource == null ? null : <ResourceEditor resource={resource}/>}
	</WorkAreaEditorContainer>;
};
