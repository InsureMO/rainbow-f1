import {ModuleEnvsIcon} from '../../../../assets/icons';
import {F1ModuleStructure} from '../../../../shared';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleEnvsNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
}

export const ModuleEnvsNodeLabel = (_props: ModuleEnvsNodeLabelProps) => {
	return <NodeLabel>
		<ModuleEnvsIcon/>
		<span data-name="">Environments</span>
	</NodeLabel>;
};
