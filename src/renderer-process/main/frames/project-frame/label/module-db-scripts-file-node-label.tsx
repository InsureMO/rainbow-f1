import {F1ModuleStructure, ModuleFile} from '../../../../../shared';
import {icon} from '../../../utils';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleDBScriptsFileNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
	file: ModuleFile;
}

export const ModuleDBScriptsFileNodeLabel = (props: ModuleDBScriptsFileNodeLabelProps) => {
	const {file} = props;

	return <NodeLabel>
		{icon(file)}
		<span data-name="">{file.basename}</span>
	</NodeLabel>;
};
