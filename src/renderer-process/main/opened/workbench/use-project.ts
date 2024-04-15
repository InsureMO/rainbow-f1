import {useEffect, useState} from 'react';
import {F1Project, F1ProjectStructure} from '../../../../shared';
import {useWorkbenchEventBus, WorkbenchEventTypes} from './event-bus';

export type AskProject = () => Promise<F1Project>;

export interface UseProject {
	ask: AskProject;
}

export const useProject = (): UseProject => {
	const {fire} = useWorkbenchEventBus();
	const [funcs] = useState<UseProject>(() => {
		return {
			ask: async (): Promise<F1Project> => {
				return new Promise<F1Project>(resolve => {
					fire(WorkbenchEventTypes.ASK_PROJECT, (project: F1Project) => {
						resolve(project);
					});
				});
			}
		};
	});

	return funcs;
};

export type ProjectAsked = (project: F1Project) => void;
export const useAskProject = (ask: AskProject, asked: ProjectAsked) => {
	useEffect(() => {
		(async () => {
			asked(await ask());
		})();
	}, []);
};

export type AskProjectStructure = () => Promise<[F1Project, F1ProjectStructure]>;

export interface UseProjectStructure {
	ask: AskProjectStructure;
}

export const useProjectStructure = (): UseProjectStructure => {
	const {fire} = useWorkbenchEventBus();
	const [funcs] = useState<UseProjectStructure>(() => {
		return {
			ask: async (): Promise<[F1Project, F1ProjectStructure]> => {
				return new Promise<[F1Project, F1ProjectStructure]>(resolve => {
					fire(WorkbenchEventTypes.ASK_PROJECT_STRUCTURE, (project, structure) => {
						resolve([project, structure]);
					});
				});
			}
		};
	});

	return funcs;
};

export type ProjectStructureAsked = (project: F1Project, structure: F1ProjectStructure) => void;
export const useAskProjectStructure = (ask: AskProjectStructure, asked: ProjectStructureAsked) => {
	useEffect(() => {
		(async () => {
			const [project, structure] = await ask();
			asked(project, structure);
		})();
	}, []);
};
