import {D9ModuleStructure, F1ModuleStructure, F1ModuleType, O23ModuleStructure} from '../../../shared';

export const castTo = <To>(value: any): To => {
	return value as unknown as To;
};
export const isD9Module = (module: F1ModuleStructure): module is D9ModuleStructure => {
	return module.type === F1ModuleType.D9;
};
export const isO23Module = (module: F1ModuleStructure): module is O23ModuleStructure => {
	return module.type === F1ModuleType.O23;
};
