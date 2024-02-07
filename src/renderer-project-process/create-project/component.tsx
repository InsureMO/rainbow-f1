import {UnwrappedCheckbox} from '@rainbow-d9/n2';
import {useState} from 'react';
import {ComponentContainer, ComponentDescription} from './widgets';

export interface ComponentProps {
	name: string;
	description: string;
	fixed: boolean;
	defaultUse?: boolean;
}

export const Component = (props: ComponentProps) => {
	const {name, description, fixed, defaultUse = false} = props;

	const [value, setValue] = useState(() => fixed || defaultUse);

	const onSelectChanged = () => {
		if (fixed) {
			return;
		}
		setValue(!value);
	}

	return <ComponentContainer>
		<ComponentDescription>
			<span data-name={true}>{name}</span>
			<span data-desc={true}>{description}</span>
		</ComponentDescription>
		<UnwrappedCheckbox onValueChange={onSelectChanged} value={value} disabled={fixed}/>
	</ComponentContainer>;
};
