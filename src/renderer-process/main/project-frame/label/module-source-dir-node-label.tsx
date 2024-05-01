import {FolderIcon} from '../../../../assets/icons';
import {F1ModuleStructure, ModuleFile} from '../../../../shared';
import {ProjectRoot} from '../types';
import {NodeLabel} from '../widgets';

export interface ModuleSourceDirNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
	file: ModuleFile;
}

export const ModuleSourceDirNodeLabel = (props: ModuleSourceDirNodeLabelProps) => {
	const {file} = props;

	return <NodeLabel>
		<FolderIcon/>
		<span data-name="">{file.basename}</span>
	</NodeLabel>;
};
