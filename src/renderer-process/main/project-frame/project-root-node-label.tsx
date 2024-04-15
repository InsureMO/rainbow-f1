import {ProjectRootIcon} from '../../../assets/icons';
import {F1Project} from '../../../shared';
import {NodeLabel} from './widgets';

export interface ProjectNodeLabelProps {
	project: F1Project;
}

export const ProjectRootNodeLabel = (props: ProjectNodeLabelProps) => {
	const {project} = props;

	return <NodeLabel>
		<ProjectRootIcon/>
		<span data-name="">{project.name}</span>
		<span data-path="">{project.directory}</span>
	</NodeLabel>;
};
