import {ModuleRootIcon} from '../../../assets/icons';
import {F1ModuleStructure} from '../../../shared';
import {ProjectRoot} from './types';
import {NodeLabel} from './widgets';

export interface ModuleNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
}

export const ModuleRootNodeLabel = (props: ModuleNodeLabelProps) => {
	const {module} = props;

	return <NodeLabel>
		<ModuleRootIcon/>
		<span data-name="">{module.name}</span>
	</NodeLabel>;
};
