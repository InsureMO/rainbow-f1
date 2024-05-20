import {useEffect, useState} from 'react';
import {Resource} from '../opened/types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../opened/workbench/event-bus';
import {isResourceInitLocked, isResourceLockStatusSwitchable} from '../utils';

export interface ResourceLockStatus {
	locked: boolean;
	switchable: boolean;
}

/**
 * key is marker, value is file content
 */
export interface ResourceLockStatusState {
	[key: string]: ResourceLockStatus;
}

export const useLockStatus = () => {
	const {on, off} = useWorkbenchEventBus();
	const [statusState] = useState<ResourceLockStatusState>({});
	useEffect(() => {
		const onAskResourceLockStatus = (resource: Resource, onStatus: (locked: boolean, switchable: boolean) => void) => {
			const {marker} = resource;
			const status = statusState[marker];
			if (status == null) {
				const locked = isResourceInitLocked(resource);
				const switchable = isResourceLockStatusSwitchable(resource);
				statusState[marker] = {locked, switchable};
				onStatus(locked, switchable);
			} else {
				onStatus(status.locked, status.switchable);
			}
		};
		const onSwitchResourceLockStatus = (resource: Resource, locked: boolean) => {
			const {marker} = resource;
			// given resource lock status might be un-switchable, but here set it to switchable
			statusState[marker] = {locked, switchable: true};
		};
		on(WorkbenchEventTypes.ASK_RESOURCE_LOCK_STATUS, onAskResourceLockStatus);
		on(WorkbenchEventTypes.SWITCH_RESOURCE_LOCK_STATUS, onSwitchResourceLockStatus);
		return () => {
			off(WorkbenchEventTypes.ASK_RESOURCE_LOCK_STATUS, onAskResourceLockStatus);
			off(WorkbenchEventTypes.SWITCH_RESOURCE_LOCK_STATUS, onSwitchResourceLockStatus);
		};
	}, [statusState]);
};