import {FolderIcon} from '../../../assets/icons';
import {F1ModuleStructure, ModuleFile} from '../../../shared';
import {ProjectRoot} from './types';
import {NodeLabel} from './widgets';

export interface ModuleDBScriptsDirNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
	file: ModuleFile;
}

export const ModuleDBScriptsDirNodeLabel = (props: ModuleDBScriptsDirNodeLabelProps) => {
	const {file} = props;

	return <NodeLabel>
		<FolderIcon/>
		<span data-name="">{file.basename}</span>
	</NodeLabel>;
};
