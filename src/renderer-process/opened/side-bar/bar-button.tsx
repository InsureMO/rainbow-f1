import {ReactNode} from 'react';
import {SideBarButtonContainer} from './widgets';

export const SideBarButton = (props: { icon: ReactNode; tooltip: ReactNode; left?: boolean }) => {
	const {icon, tooltip, left = false} = props;

	return <SideBarButtonContainer>
		{icon}
		<span data-tooltip="" data-left={left}>{tooltip}</span>
	</SideBarButtonContainer>;
};
