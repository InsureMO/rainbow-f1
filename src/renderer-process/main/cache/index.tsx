import {Fragment} from 'react';
import {F1Project} from '../../../shared';
import {useContentCache} from './use-content-cache';
import {useLockStatus} from './use-lock-status';

export interface ResourceCacheHolderProps {
	project: F1Project;
}

export const ResourceCacheHolder = (props: ResourceCacheHolderProps) => {
	useContentCache();
	useLockStatus();

	return <Fragment/>;
};