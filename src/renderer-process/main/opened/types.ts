import {ReactNode} from 'react';
import {ModuleCommand, ModuleEnv, ModuleFile} from '../../../shared';

export interface PresentResourceSegment {
	label: string;
	icon?: ReactNode;
}

export interface Resource {
	marker: string;
	segments: Array<PresentResourceSegment>;
	renamable?: boolean;
}

export interface VirtualNodeResource extends Resource {
}

export interface ModuleResource extends Resource {
	// modulePath: string;
}

export interface ModuleFileResource extends ModuleResource {
	file: ModuleFile;
	absolutePath: () => string;
	/** includes project and module */
	relativePathToRoot: () => string;
	/** include module */
	relativePathToProjectRoot: () => string;
	relativePathToModuleRoot: () => string;
}

export interface ModuleCommandResource extends ModuleFileResource {
	// env will be existed when this resource is constructed under an env
	env?: ModuleEnv;
	command: ModuleCommand;
}

export interface ModuleEnvResource extends ModuleFileResource {
	env: ModuleEnv;
}
