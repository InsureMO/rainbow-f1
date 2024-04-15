import {F1ModuleStructure} from '../../../shared';
import {ModuleRoot} from '../../common/icons';
import {NodeLabel} from './widgets';

export interface ModuleNodeLabelProps {
	module: F1ModuleStructure;
}

export const ModuleRootNodeLabel = (props: ModuleNodeLabelProps) => {
	const {module} = props;

	return <NodeLabel>
		<ModuleRoot/>
		<span data-name="">{module.name}</span>
	</NodeLabel>;
};
