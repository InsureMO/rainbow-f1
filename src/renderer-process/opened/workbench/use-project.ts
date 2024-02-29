import {F1Project} from '../../../shared';
import {useWorkbenchEventBus, WorkbenchEventTypes} from './event-bus';

export const useProject = () => {
	const {fire} = useWorkbenchEventBus();

	return {
		ask: async (): Promise<F1Project> => {
			return new Promise<F1Project>(resolve => {
				fire(WorkbenchEventTypes.ASK_PROJECT, (project: F1Project) => {
					resolve(project);
				});
			});
		}
	};
};
