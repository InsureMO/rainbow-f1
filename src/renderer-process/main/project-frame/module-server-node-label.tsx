import {ModuleServerIcon} from '../../../assets/icons';
import {F1ModuleStructure} from '../../../shared';
import {ProjectRoot} from './types';
import {NodeLabel} from './widgets';

export interface ModuleServerNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
}

export const ModuleServerNodeLabel = (_props: ModuleServerNodeLabelProps) => {
	return <NodeLabel>
		<ModuleServerIcon/>
		<span data-name="">Server</span>
	</NodeLabel>;
};
