import {ModulePipelinesIcon} from '../../../assets/icons';
import {F1ModuleStructure} from '../../../shared';
import {ProjectRoot} from './types';
import {NodeLabel} from './widgets';

export interface ModuleO23PipelinesNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
}

export const ModuleO23PipelinesNodeLabel = (_props: ModuleO23PipelinesNodeLabelProps) => {
	return <NodeLabel>
		<ModulePipelinesIcon/>
		<span data-name="">Pipelines</span>
	</NodeLabel>;
};
