import {ReactNode} from 'react';
import {SideContainer} from './widgets';

export const Side = (props: { children: ReactNode }) => {
	const {children, ...rest} = props;

	return <SideContainer {...rest}>
		{children}
	</SideContainer>;
};
