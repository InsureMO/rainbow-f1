import {F1Project} from '../../../shared';
import {TreeNodeInnerLabel} from '../opened/sides/side-bar';

export interface AddModuleNodeLabelProps {
	project: F1Project;
}

export const AddModuleNodeLabel = (props: AddModuleNodeLabelProps) => {
	return <TreeNodeInnerLabel>
		<span data-link="" data-weak-link="">No module detected, create now?</span>
	</TreeNodeInnerLabel>;
};
