import {F1ModuleStructure, ModuleFile} from '../../../shared';
import {icon} from '../utils/icons-utils';
import {ProjectRoot} from './types';
import {NodeLabel} from './widgets';

export interface ModuleO23ServerPipelineFileNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
	file: ModuleFile;
}

export const ModuleO23ServerPipelineFileNodeLabel = (props: ModuleO23ServerPipelineFileNodeLabelProps) => {
	const {file} = props;

	return <NodeLabel>
		{icon(file)}
		<span data-name="">{file.basename}</span>
	</NodeLabel>;
};
