import {ModuleCommandIcon} from '../../../../assets/icons';
import {F1ModuleStructure, ModuleCommand} from '../../../../shared';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleCommandNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
	command: ModuleCommand;
}

export const ModuleCommandNodeLabel = (props: ModuleCommandNodeLabelProps) => {
	const {command} = props;

	return <NodeLabel>
		<ModuleCommandIcon/>
		<span data-name="">{command.name}</span>
	</NodeLabel>;
};
