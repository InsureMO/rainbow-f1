import {F1ModuleStructure, ModuleFile} from '../../../../../shared';
import {icon} from '../../../utils';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleO23ScriptsPipelineFileNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
	file: ModuleFile;
}

export const ModuleO23ScriptsPipelineFileNodeLabel = (props: ModuleO23ScriptsPipelineFileNodeLabelProps) => {
	const {file} = props;

	return <NodeLabel>
		{icon(file)}
		<span data-name="">{file.basename}</span>
	</NodeLabel>;
};
