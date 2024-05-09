import {useEffect, useState} from 'react';
import {ModuleFileResource} from '../opened/types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../opened/workbench/event-bus';

export interface ResourceCacheContent {
	content: string;
}

/**
 * key is marker, value is file content
 */
export interface ResourceCacheContents {
	[key: string]: ResourceCacheContent;
}

export const useContentCache = () => {
	const {on, off, fire} = useWorkbenchEventBus();
	const [contents] = useState<ResourceCacheContents>({});
	useEffect(() => {
		const onAskModuleFileContent = (resource: ModuleFileResource, onContent: (content: string) => void, onError: (message: string) => void) => {
			const {marker, file} = resource;
			if (contents[marker] != null) {
				onContent(contents[marker].content);
			} else {
				const {path} = file;
				const {success, ret: content, message} = window.electron.fs.readFile(path);
				if (success) {
					onContent(content);
				} else {
					onError(message);
				}
			}
		};
		on(WorkbenchEventTypes.ASK_MODULE_FILE_CONTENT, onAskModuleFileContent);
		return () => {
			off(WorkbenchEventTypes.ASK_MODULE_FILE_CONTENT, onAskModuleFileContent);
		};
	}, [on, off, contents]);
};