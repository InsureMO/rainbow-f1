import {SourceFileIcon, TypescriptIcon} from '../../../assets/icons';
import {ModuleFile, ModuleFileType} from '../../../shared';

export const icon = (file: ModuleFile) => {
	const {type} = file;
	switch (type) {
		case ModuleFileType.TYPESCRIPT:
			return <TypescriptIcon/>;
		case ModuleFileType.JAVASCRIPT:
		case ModuleFileType.COMMON_JAVASCRIPT:
		case ModuleFileType.ECMA_MODULE_JAVASCRIPT:
			return <TypescriptIcon/>;
		default:
			return <SourceFileIcon/>;
	}
};
