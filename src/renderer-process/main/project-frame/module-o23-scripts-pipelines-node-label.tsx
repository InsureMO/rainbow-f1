import {ModuleScriptsIcon} from '../../../assets/icons';
import {F1ModuleStructure} from '../../../shared';
import {ProjectRoot} from './types';
import {NodeLabel} from './widgets';

export interface ModuleScriptsNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
}

export const ModuleO23ScriptsPipelinesNodeLabel = (_props: ModuleScriptsNodeLabelProps) => {
	return <NodeLabel>
		<ModuleScriptsIcon/>
		<span data-name="">Scripts</span>
	</NodeLabel>;
};
