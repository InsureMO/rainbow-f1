import {F1Project} from '../../../shared';
import {FolderClosed, FolderOpen} from '../../common/icons';
import {TreeNodeInnerLabel} from '../opened/sides/side-bar';

export interface ProjectNodeLabelProps {
	project: F1Project;
}

export const ProjectRootNodeLabel = (props: ProjectNodeLabelProps) => {
	const {project} = props;

	return <TreeNodeInnerLabel>
		<FolderClosed/>
		<FolderOpen/>
		<span data-name="">{project.name}</span>
		<span data-path="">{project.directory}</span>
	</TreeNodeInnerLabel>;
};
