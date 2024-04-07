import {UnwrappedCheckbox} from '@rainbow-d9/n2';
import {ReactNode, useState} from 'react';
import {ComponentContainer, ComponentDescription} from './widgets';

export interface ComponentProps {
	name: string;
	description: string | ReactNode;
	fixed: true | ((selected: boolean) => void);
	defaultUse?: boolean;
}

export const Component = (props: ComponentProps) => {
	const {name, description, fixed, defaultUse = false} = props;

	const [value, setValue] = useState(() => (fixed === true) || defaultUse);

	const onSelectChanged = () => {
		if (fixed === true) {
			return;
		}
		setValue(!value);
		fixed(!value);
	};

	return <ComponentContainer>
		<ComponentDescription>
			<span data-name="">{name}</span>
			<span data-desc="">{description}</span>
		</ComponentDescription>
		<UnwrappedCheckbox onValueChange={onSelectChanged} value={value} disabled={fixed === true}/>
	</ComponentContainer>;
};
