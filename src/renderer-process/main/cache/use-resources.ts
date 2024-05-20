import {useEffect, useState} from 'react';
import {ModuleResource, Resource} from '../opened/types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../opened/workbench/event-bus';

export interface Resources {
	[marker: string]: Resource;
}

export interface ModuleResources {
	[moduleName: string]: { [prefix: string]: Array<Resource> };
}

export const useResources = () => {
	const {on, off} = useWorkbenchEventBus();
	const [resources] = useState<Resources>({});
	const [moduleResources] = useState<ModuleResources>({});

	useEffect(() => {
		const getResourcePrefix = (resource: Resource) => {
			const prefixIndex = resource.marker.indexOf('$$', 2);
			return resource.marker.substring(0, prefixIndex + 2);
		};
		const onRegisterResource = (resource: Resource) => {
			resources[resource.marker] = resource;
			const module = (resource as ModuleResource).module;
			if (module != null) {
				const moduleName = module().name;
				if (moduleResources[moduleName] == null) {
					moduleResources[moduleName] = {};
				}
				const prefix = getResourcePrefix(resource);
				if (moduleResources[moduleName][prefix] == null) {
					moduleResources[moduleName][prefix] = [];
				}
				const index = moduleResources[moduleName][prefix].findIndex(r => r.marker === resource.marker);
				if (index === -1) {
					moduleResources[moduleName][prefix].push(resource);
				} else {
					moduleResources[moduleName][prefix][index] = resource;
				}
			}
		};
		const onUnregisterResource = (resource: Resource) => {
			delete resources[resource.marker];
			const module = (resource as ModuleResource).module;
			if (module != null) {
				const moduleName = module().name;
				const prefix = getResourcePrefix(resource);
				if (moduleResources[moduleName][prefix] != null) {
					const index = moduleResources[moduleName][prefix].findIndex(r => r.marker !== resource.marker);
					if (index !== -1) {
						moduleResources[moduleName][prefix].splice(index, 1);
					}
				}
			}
		};
		const onAskResource = (marker: string, callback: (resource?: Resource) => void) => {
			callback(resources[marker]);
		};
		const onAskChildResources = (parent: {
			prefix: string, moduleName?: string
		}, callback: (resources: Array<Resource>) => void) => {
			const {prefix, moduleName} = parent;
			if (moduleName != null) {
				callback(moduleResources[moduleName][prefix] || []);
			} else {
				callback(Object.values(moduleResources).map(resources => resources[prefix] ?? []).flat());
			}
		};
		on(WorkbenchEventTypes.REGISTER_RESOURCE, onRegisterResource);
		on(WorkbenchEventTypes.UNREGISTER_RESOURCE, onUnregisterResource);
		on(WorkbenchEventTypes.ASK_RESOURCE, onAskResource);
		on(WorkbenchEventTypes.ASK_RESOURCES, onAskChildResources);
		return () => {
			off(WorkbenchEventTypes.REGISTER_RESOURCE, onRegisterResource);
			off(WorkbenchEventTypes.UNREGISTER_RESOURCE, onUnregisterResource);
			off(WorkbenchEventTypes.ASK_RESOURCE, onAskResource);
			off(WorkbenchEventTypes.ASK_RESOURCES, onAskChildResources);
		};
	}, [on, off]);
};
