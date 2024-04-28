import {ModuleServerIcon} from '../../../assets/icons';
import {F1ModuleStructure} from '../../../shared';
import {ProjectRoot} from './types';
import {NodeLabel} from './widgets';

export interface ModuleServerNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
}

export const ModuleO23ServerPipelinesNodeLabel = (_props: ModuleServerNodeLabelProps) => {
	return <NodeLabel>
		<ModuleServerIcon/>
		<span data-name="">Server</span>
	</NodeLabel>;
};
