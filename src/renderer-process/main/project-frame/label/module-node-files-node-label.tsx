import {ModuleNodeFilesIcon} from '../../../../assets/icons';
import {F1ModuleStructure} from '../../../../shared';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleNodeFilesNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
}

export const ModuleNodeFilesNodeLabel = (_props: ModuleNodeFilesNodeLabelProps) => {
	return <NodeLabel>
		<ModuleNodeFilesIcon/>
		<span data-name="">NodeJS</span>
	</NodeLabel>;
};
