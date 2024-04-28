import {FolderIcon} from '../../../assets/icons';
import {F1ModuleStructure, ModuleFile} from '../../../shared';
import {ProjectRoot} from './types';
import {NodeLabel} from './widgets';

export interface ModuleO23ScriptsPipelineDirNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
	file: ModuleFile;
}

export const ModuleO23ScriptsPipelineDirNodeLabel = (props: ModuleO23ScriptsPipelineDirNodeLabelProps) => {
	const {file} = props;

	return <NodeLabel>
		<FolderIcon/>
		<span data-name="">{file.basename}</span>
	</NodeLabel>;
};
