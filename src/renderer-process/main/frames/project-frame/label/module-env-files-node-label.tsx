import {ModuleEnvFilesIcon} from '../../../../../assets/icons';
import {F1ModuleStructure} from '../../../../../shared';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleEnvFilesNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
}

export const ModuleEnvFilesNodeLabel = (_props: ModuleEnvFilesNodeLabelProps) => {
	return <NodeLabel>
		<ModuleEnvFilesIcon/>
		<span data-name="">Environment Files</span>
	</NodeLabel>;
};
