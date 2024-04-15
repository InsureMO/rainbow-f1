import {F1Project} from '../../../shared';
import {ProjectRoot} from '../../common/icons';
import {NodeLabel} from './widgets';

export interface ProjectNodeLabelProps {
	project: F1Project;
}

export const ProjectRootNodeLabel = (props: ProjectNodeLabelProps) => {
	const {project} = props;

	return <NodeLabel>
		<ProjectRoot/>
		<span data-name="">{project.name}</span>
		<span data-path="">{project.directory}</span>
	</NodeLabel>;
};
