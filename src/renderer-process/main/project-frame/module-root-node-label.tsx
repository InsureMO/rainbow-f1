import {ModuleRootIcon} from '../../../assets/icons';
import {F1ModuleStructure} from '../../../shared';
import {NodeLabel} from './widgets';

export interface ModuleNodeLabelProps {
	module: F1ModuleStructure;
}

export const ModuleRootNodeLabel = (props: ModuleNodeLabelProps) => {
	const {module} = props;

	return <NodeLabel>
		<ModuleRootIcon/>
		<span data-name="">{module.name}</span>
	</NodeLabel>;
};
