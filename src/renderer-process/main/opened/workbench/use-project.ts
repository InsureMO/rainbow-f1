import {useEffect, useState} from 'react';
import {F1Project} from '../../../shared';
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
export const useAskProjectStructure = (ask: AskProject, asked: ProjectAsked) => {
	useEffect(() => {
		(async () => {
			const project = await ask();
			asked(project);
		})();
	}, []);
};
