import {TreeNodeInnerLabel} from '../../opened/sides/side-bar';
import {ProjectRoot} from '../types';

export interface AddModuleNodeLabelProps extends ProjectRoot {
}

export const AddModuleNodeLabel = (_props: AddModuleNodeLabelProps) => {
	return <TreeNodeInnerLabel>
		<span data-link="" data-weak-link="">No module detected, create now?</span>
	</TreeNodeInnerLabel>;
};
