import {F1ModuleStructure, ModuleFile} from '../../../../../shared';
import {icon} from '../../../utils';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleEnvFilesFileNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
	file: ModuleFile;
}

export const ModuleEnvFilesFileNodeLabel = (props: ModuleEnvFilesFileNodeLabelProps) => {
	const {file} = props;

	return <NodeLabel>
		{icon(file)}
		<span data-name="">{file.basename}</span>
	</NodeLabel>;
};
