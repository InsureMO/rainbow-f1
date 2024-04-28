import {SourceFileIcon, TypescriptIcon} from '../../../assets/icons';
import {F1ModuleStructure, ModuleFile, ModuleFileType} from '../../../shared';
import {ProjectRoot} from './types';
import {NodeLabel} from './widgets';

export interface ModuleSourceFileNodeLabelProps extends ProjectRoot {
	module: F1ModuleStructure;
	file: ModuleFile;
}

const icon = (file: ModuleFile) => {
	const {type} = file;
	console.log(type);
	switch (type) {
		case ModuleFileType.TYPESCRIPT:
			return <TypescriptIcon/>;
		default:
			return <SourceFileIcon/>;
	}
};

export const ModuleSourceFileNodeLabel = (props: ModuleSourceFileNodeLabelProps) => {
	const {file} = props;

	return <NodeLabel>
		{icon(file)}
		<span data-name="">{file.basename}</span>
	</NodeLabel>;
};
