import {ProjectRootIcon} from '../../../../../assets/icons';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ProjectNodeLabelProps extends ProjectRoot {
}

export const ProjectRootNodeLabel = (props: ProjectNodeLabelProps) => {
	const {project} = props;

	return <NodeLabel>
		<ProjectRootIcon/>
		<span data-name="">{project.name}</span>
		<span data-path="">{project.directory}</span>
	</NodeLabel>;
};
