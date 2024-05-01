import React from 'react';
import {FolderIcon} from '../../../../assets/icons';
import {F1ModuleStructure, ModuleFile} from '../../../../shared';
import {ModuleFileResource, PresentResourceSegment} from '../../opened/types';
import {castTo} from '../../utils';
import {icon} from '../../utils/icons-utils';
import {ModuleFileNodeDef, ProjectTreeNodeDef} from '../types';

export interface ModuleFileNodesCreateOptions {
	module: F1ModuleStructure;
	files?: Array<ModuleFile>;
	asDirNode: (file: ModuleFile) => ProjectTreeNodeDef;
	asFileNode: (file: ModuleFile) => ProjectTreeNodeDef;
}

export const createModuleFileNodes = (options: ModuleFileNodesCreateOptions): Array<ProjectTreeNodeDef> => {
	const {files, asDirNode, asFileNode} = options;
	const sorted = ([...(files ?? [])]).sort((f1, f2) => {
		return f1.path.localeCompare(f2.path, (void 0), {sensitivity: 'base'});
	});
	const top: Array<ProjectTreeNodeDef> = [];
	const map: Record<string, ProjectTreeNodeDef> = {};
	sorted.forEach(file => {
		let node;
		if (file.dir) {
			node = asDirNode(file);
		} else {
			node = asFileNode(file);
		}
		map[file.path] = node;
		let lastSepIndex = file.path.lastIndexOf('/');
		lastSepIndex = lastSepIndex === -1 ? file.path.lastIndexOf('\\') : lastSepIndex;
		if (lastSepIndex === -1) {
			top.push(node);
		} else {
			const parentPath = file.path.substring(0, lastSepIndex);
			const parent = map[parentPath];
			if (parent != null) {
				if (parent.$children == null) {
					parent.$children = [];
				}
				parent.$children.push(node);
			} else {
				top.push(node);
			}
		}
	});
	const sort = ({value: {file: f1}}: ModuleFileNodeDef, {value: {file: f2}}: ModuleFileNodeDef) => {
		if (f1.dir === f2.dir) {
			return f1.path.localeCompare(f2.path, (void 0), {sensitivity: 'base'});
		} else if (f1.dir) {
			return -1;
		} else {
			return 1;
		}
	};
	const sortChildren = (node: ModuleFileNodeDef) => {
		(node.$children ?? []).sort((c1, c2) => sort(castTo(c1), castTo(c2)))
			.forEach(child => sortChildren(castTo(child)));
	};
	top.sort((n1, n2) => sort(castTo(n1), castTo(n2)))
		.forEach(node => sortChildren(castTo(node)));

	return top;
};
export const buildModuleFileAsResourceSegments = (file: ModuleFile): Array<PresentResourceSegment> => {
	const [last, ...others] = file.path.split(/[\/|\\]/g).reverse();
	return [
		...others.reverse().map(label => ({label})),
		{label: last, icon: file.dir ? <FolderIcon/> : icon(file)}
	];
};
export const buildModuleFileAsResource = (file: ModuleFile, marker: string, segments: () => Array<PresentResourceSegment>): ModuleFileResource => {
	return {file, marker, segments: segments()};
};
