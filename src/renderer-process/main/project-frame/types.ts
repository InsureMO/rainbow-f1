import {TreeNodeDef} from '@rainbow-d9/n2';
import {F1ModuleStructure, F1Project} from '../../../shared';

export enum ProjectTreeNodeType {
	ROOT = 'root',
	ADD_MODULE = 'add-module',
	MODULE = 'module'
}

export interface ProjectTreeNodeDef extends TreeNodeDef {
	$type: ProjectTreeNodeType;
}

export const ROOT_NODE_MARKER = '$$root$$';
export const ADD_MODULE = Symbol();
export const ADD_MODULE_NODE_MARKER = (project: F1Project) => `$$add-module$$-${project.directory}`;
export const MODULE_NODE_MARKER = (module: F1ModuleStructure) => `$$module$$-${module.name}`;
