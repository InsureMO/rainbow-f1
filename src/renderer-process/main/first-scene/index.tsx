import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {MainEventTypes, useMainEventBus} from '../event-bus';

export const FirstScene = () => {
	const navigate = useNavigate();
	const {on, off, fire} = useMainEventBus();
	useEffect(() => {
		(async () => {
			const {success, project, message} = await window.electron.project.loadAttached();
			if (!success) {
				// failed to load attached project
				fire(MainEventTypes.SET_FAILED_TO_ASK_PROJECT, message);
			} else {
				const {success, project: structure, message} = await window.electron.project.loadAttachedStructure();
				if (success) {
					// successfully loaded attached project and structure
					fire(MainEventTypes.SET_PROJECT, project, structure);
				} else {
					// failed to load attached project structure
					fire(MainEventTypes.SET_FAILED_TO_ASK_PROJECT, message);
				}
			}
		})();
	}, [fire]);
	useEffect(() => {
		const onProjectSettled = () => navigate('/opened');
		const onFailureSettled = () => navigate('/failed');
		on(MainEventTypes.PROJECT_SETTLED, onProjectSettled);
		on(MainEventTypes.FAILURE_SETTLED, onFailureSettled);
		return () => {
			off(MainEventTypes.PROJECT_SETTLED, onProjectSettled);
			off(MainEventTypes.FAILURE_SETTLED, onFailureSettled);
		};
	}, [on, off, navigate]);

	return <div/>;
};
