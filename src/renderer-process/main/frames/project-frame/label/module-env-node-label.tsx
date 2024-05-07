import {ModuleEnvIcon} from '../../../../../assets/icons';
import {F1ModuleStructure, ModuleEnv} from '../../../../../shared';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleEnvNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
	env: ModuleEnv;
}

export const ModuleEnvNodeLabel = (props: ModuleEnvNodeLabelProps) => {
	const {env} = props;

	return <NodeLabel>
		<ModuleEnvIcon/>
		<span data-name="">{env.name}</span>
	</NodeLabel>;
};
