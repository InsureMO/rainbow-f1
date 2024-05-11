import {Fragment} from 'react';
import {F1Project} from '../../../shared';
import {useContentCache} from './use-content-cache';
import {useLockStatus} from './use-lock-status';
import {useResources} from './use-resources';

export interface ResourceCacheHolderProps {
	project: F1Project;
}

export const ResourceCacheHolder = (props: ResourceCacheHolderProps) => {
	useResources();
	useContentCache();
	useLockStatus();

	return <Fragment/>;
};