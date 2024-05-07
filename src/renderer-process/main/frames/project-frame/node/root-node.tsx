import {PROPERTY_PATH_ME} from '@rainbow-d9/n1';
import React from 'react';
import {WorkbenchEventBus} from '../../../opened/workbench/event-bus';
import {castTo, ROOT_MARKER} from '../../../utils';
import {ProjectRootNodeLabel} from '../label';
import {ProjectRoot, ProjectTreeNodeDef, ProjectTreeNodeType} from '../types';

export const createRootNode = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (): ProjectTreeNodeDef => {
	// use structure as value
	return {
		value: castTo(rootData),
		$ip2r: rootData.project.directory, $ip2p: PROPERTY_PATH_ME, marker: ROOT_MARKER,
		label: <ProjectRootNodeLabel {...rootData}/>,
		$type: ProjectTreeNodeType.ROOT
	};
};
