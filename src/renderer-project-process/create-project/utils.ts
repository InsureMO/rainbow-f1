import {VUtils} from '@rainbow-d9/n1';
import {D9ModuleSettings, F1ProjectSettings, O23ModuleSettings} from '../../shared/project-settings';
import {ProjectModuleBase} from './types';

export const createD9ModuleSettings = (): D9ModuleSettings => {
	return {
		name: 'awesome-d9',
		dependencies: {
			'@rainbow-d9/n1': true,
			'@rainbow-d9/n2': true,
			'@rainbow-d9/n3': false,
			'@rainbow-d9/n5': true,
			'@rainbow-d9/echarts': false,
			'@rainbow-d9/thai-plan-selection': false
		}
	};
};

export const createO23ModuleSettings = (): O23ModuleSettings => {
	return {
		name: 'awesome-o23',
		dependencies: {
			'@rainbow-o23/n90': true,
			'@rainbow-o23/n91': false
		}
	};
};

export const createF1ProjectSettings = (): F1ProjectSettings => {
	return {
		name: '',
		d9: [createD9ModuleSettings()],
		o23: [createO23ModuleSettings()]
	};
};

export const validateProjectName = (name?: string): string | undefined => {
	if (VUtils.isBlank(name)) {
		return 'Please fill in the project name.';
	} else if (/[\\\/]/.test(name)) {
		return 'Project name cannot contain / or \\.';
	} else {
		return (void 0);
	}
};

export const validateProjectDirectory = (directory?: string): string | undefined => {
	if (VUtils.isBlank(directory)) {
		return 'Please select the project directory.';
	}
	if (window.electron.fs.exists(directory).ret && !window.electron.fs.empty(directory).ret) {
		return 'The directory is not empty.';
	} else {
		return (void 0);
	}
};

export const validateModuleName = (name?: string): string | undefined => {
	if (VUtils.isBlank(name)) {
		return 'Please fill in the module name.';
	} else if (/[\\\/]/.test(name)) {
		return 'Module name cannot contain / or \\.';
	} else {
		return (void 0);
	}
};

export const validateModuleNameDuplication = (options: {
	settings: F1ProjectSettings;
	base: ProjectModuleBase; index: number;
}): string | undefined => {
	const {settings, base, index} = options;
	let name: string;
	switch (base) {
		case ProjectModuleBase.D9:
			name = settings.d9?.[index]?.name;
			break;
		case ProjectModuleBase.O23:
			name = settings.o23?.[index]?.name;
			break;
		default:
			return (void 0);
	}
	if (VUtils.isBlank(name)) {
		return (void 0);
	}
	name = name.trim().toLowerCase();
	const duplicated = [
		...(settings.d9 ?? []).filter((d9, i) => base !== ProjectModuleBase.D9 || index !== i),
		...(settings.o23 ?? []).filter((d9, i) => base !== ProjectModuleBase.O23 || index !== i)
	].some(module => (module.name ?? '').trim().toLowerCase() === name);
	if (duplicated) {
		return 'Module name is duplicated.';
	} else {
		return (void 0);
	}
};

export const validateD9N3N5 = (n3?: boolean, n5?: boolean) => {
	if (n3 !== true && n5 !== true) {
		return 'Select at least one between @rainbow-d9/n3 and @rainbow-d9/n5.';
	} else {
		return (void 0);
	}
};