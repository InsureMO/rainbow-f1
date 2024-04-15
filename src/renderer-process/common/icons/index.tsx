import {Icons} from '@rainbow-d9/n2';
import React from 'react';
import {EllipsisVertical} from './ellipsis-vertical';
import {FolderClosed} from './folder-closed';
import {FolderClosedEmpty} from './folder-closed-empty';
import {FolderOpen} from './folder-open';
import {ModuleRoot} from './module-root';
import {ProjectRoot} from './project-root';

export * from './folder-closed';
export * from './folder-closed-empty';
export * from './folder-open';
export * from './ellipsis-vertical';
export * from './project-root';
export * from './module-root'

export * from './logo';

Icons.Registrar.register({
	'f1FolderOpen': () => <FolderOpen/>,
	'f1FolderClosed': () => <FolderClosed/>,
	'f1FolderClosedEmpty': () => <FolderClosedEmpty/>,
	'f1EllipsisVertical': () => <EllipsisVertical/>,
	'f1ProjectRoot': () => <ProjectRoot/>,
	'f1ModuleRoot': () => <ModuleRoot/>
});