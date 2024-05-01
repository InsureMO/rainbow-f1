import {ReactNode} from 'react';
import {ModuleCommand, ModuleEnv, ModuleFile} from '../../../shared';

export interface PresentResourceSegment {
	label: string;
	icon?: ReactNode;
}

export interface Resource {
	marker: string;
	segments: Array<PresentResourceSegment>;
}

export interface VirtualNodeResource extends Resource {
}

export interface ModuleCommandResource extends Resource {
	// env will be existed when this resource is constructed under an env
	env?: ModuleEnv;
	command: ModuleCommand;
}

export interface ModuleEnvResource extends Resource {
	env: ModuleEnv;
}

export interface ModuleFileResource extends Resource {
	file: ModuleFile;
}
