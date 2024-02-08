import {useEffect} from 'react';
import {CreateProjectEventTypes, useCreateProjectEventBus} from './event-bus';
import {ProjectModuleBase} from './types';

export const useModuleValidate = (options: {
	base: ProjectModuleBase;
	index: number;
	validate: () => Promise<void>;
}) => {
	const {base, index, validate} = options;

	const {on, off} = useCreateProjectEventBus();
	useEffect(() => {
		const onValidate = (validateBase: ProjectModuleBase, validateIndex: number) => {
			if (base !== validateBase || index !== validateIndex) {
				return;
			}
			(async () => await validate())();
		};
		on(CreateProjectEventTypes.VALIDATE, onValidate);
		return () => {
			off(CreateProjectEventTypes.VALIDATE, onValidate);
		};
	}, [on, off]);
};