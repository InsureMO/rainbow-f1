import {ReactNode} from 'react';
import {SideEventBusProvider} from './event-bus';
import {SideContainer} from './widgets';

export const Side = (props: { children: ReactNode }) => {
	const {children, ...rest} = props;

	return <SideEventBusProvider>
		<SideContainer {...rest}>
			{children}
		</SideContainer>
	</SideEventBusProvider>;
};
