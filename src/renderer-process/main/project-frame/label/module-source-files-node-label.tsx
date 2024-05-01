import {ModuleSourceFilesIcon} from '../../../../assets/icons';
import {F1ModuleStructure} from '../../../../shared';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleSourceFilesNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
}

export const ModuleSourceFilesNodeLabel = (_props: ModuleSourceFilesNodeLabelProps) => {
	return <NodeLabel>
		<ModuleSourceFilesIcon/>
		<span data-name="">SRC</span>
	</NodeLabel>;
};
