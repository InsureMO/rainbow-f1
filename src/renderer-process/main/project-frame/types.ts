import {TreeNodeDef} from '@rainbow-d9/n2';

export enum ProjectTreeNodeType {
	ROOT = 'root',
	ADD_MODULE = 'add-module',
	MODULE = 'module'
}

export interface ProjectTreeNodeDef extends TreeNodeDef {
	$type: ProjectTreeNodeType;
}
