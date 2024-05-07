import {ModuleCommandsIcon} from '../../../../../assets/icons';
import {F1ModuleStructure} from '../../../../../shared';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleCommandsNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
}

export const ModuleCommandsNodeLabel = (_props: ModuleCommandsNodeLabelProps) => {
	return <NodeLabel>
		<ModuleCommandsIcon/>
		<span data-name="">CLI Commands</span>
	</NodeLabel>;
};
