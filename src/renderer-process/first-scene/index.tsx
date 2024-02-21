import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {MainEventTypes, useMainEventBus} from '../event-bus';

export const FirstScene = () => {
	const navigate = useNavigate();
	const {on, off, fire} = useMainEventBus();
	useEffect(() => {
		(async () => {
			const {success, project, message} = await window.electron.f1.ask();
			if (success) {
				fire(MainEventTypes.SET_PROJECT, project);
			} else {
				fire(MainEventTypes.ASK_PROJECT_FAILED, message);
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
