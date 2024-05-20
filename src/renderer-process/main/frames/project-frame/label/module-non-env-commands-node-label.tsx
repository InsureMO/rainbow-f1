import {ModuleCommandsIcon} from '../../../../../assets/icons';
import {F1ModuleStructure} from '../../../../../shared';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleNonEnvCommandsNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
}

export const ModuleNonEnvCommandsNodeLabel = (_props: ModuleNonEnvCommandsNodeLabelProps) => {
	return <NodeLabel>
		<ModuleCommandsIcon/>
		<span data-name="">Others</span>
	</NodeLabel>;
};
