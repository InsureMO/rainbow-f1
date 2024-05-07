import {ModuleCommandIcon} from '../../../../../assets/icons';
import {F1ModuleStructure, ModuleCommand, ModuleEnv} from '../../../../../shared';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleEnvCommandNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
	env: ModuleEnv;
	command: ModuleCommand;
}

export const ModuleEnvCommandNodeLabel = (props: ModuleEnvCommandNodeLabelProps) => {
	const {env, command} = props;

	const envName = env.name;
	const cmdName = command.name;
	const name = (cmdName.startsWith(`${envName}:`) || cmdName.startsWith(`${envName}-`)) ? cmdName.substring(envName.length + 1) : cmdName;

	return <NodeLabel>
		<ModuleCommandIcon/>
		<span data-name="">{name}</span>
	</NodeLabel>;
};
