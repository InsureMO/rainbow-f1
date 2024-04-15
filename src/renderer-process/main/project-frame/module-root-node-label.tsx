import {F1ModuleStructure} from '../../../shared';
import {FolderClosed, FolderOpen} from '../../common/icons';
import {TreeNodeInnerLabel} from '../opened/sides/side-bar';

export interface ModuleNodeLabelProps {
	module: F1ModuleStructure;
}

export const ModuleRootNodeLabel = (props: ModuleNodeLabelProps) => {
	const {module} = props;

	return <TreeNodeInnerLabel>
		<FolderClosed/>
		<FolderOpen/>
		<span data-name="">{module.name}</span>
	</TreeNodeInnerLabel>;
};
