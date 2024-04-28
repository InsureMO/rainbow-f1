import {
	BabelIcon,
	EslintIcon,
	ModulePipelineIcon,
	NestJsIcon,
	PackageJsonIcon,
	PrettierIcon,
	ReadmeIcon,
	SourceFileIcon,
	TypescriptConfigIcon,
	TypescriptIcon,
	ViteIcon,
	WebpackIcon
} from '../../../assets/icons';
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
		case ModuleFileType.O23_PIPELINE:
			return <ModulePipelineIcon/>;
		case ModuleFileType.PACKAGE_JSON:
			return <PackageJsonIcon/>;
		case ModuleFileType.README:
			return <ReadmeIcon/>;
		case ModuleFileType.NEST_CONFIG:
			return <NestJsIcon/>;
		case ModuleFileType.PRETTIER_CONFIG:
			return <PrettierIcon/>;
		case ModuleFileType.WEBPACK_CONFIG:
			return <WebpackIcon/>;
		case ModuleFileType.VITE_CONFIG:
			return <ViteIcon/>;
		case ModuleFileType.ESLINT_CONFIG:
			return <EslintIcon/>;
		case ModuleFileType.BABEL_CONFIG:
			return <BabelIcon/>;
		case ModuleFileType.TS_CONFIG:
			return <TypescriptConfigIcon/>;
		default:
			return <SourceFileIcon/>;
	}
};
