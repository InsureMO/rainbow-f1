import {ModuleDBScriptsIcon} from '../../../../../assets/icons';
import {F1ModuleStructure} from '../../../../../shared';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleDBScriptsNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
}

export const ModuleDBScriptsNodeLabel = (_props: ModuleDBScriptsNodeLabelProps) => {
	return <NodeLabel>
		<ModuleDBScriptsIcon/>
		<span data-name="">Database Scripts</span>
	</NodeLabel>;
};
