import {ReactNode} from 'react';
import {useSideEventBus} from './event-bus';
import {SideFrameHeaderButtonContainer} from './widgets';

export interface FrameHeaderButtonProps {
	icon: ReactNode;
	tooltip: ReactNode;
	click: () => Promise<void>;
}

export const SideFrameHeaderButton = (props: FrameHeaderButtonProps) => {
	const {icon, tooltip, click} = props;

	const {fire} = useSideEventBus();

	return <SideFrameHeaderButtonContainer onClick={click}>
		{icon}
		<span data-tooltip="">{tooltip}</span>
	</SideFrameHeaderButtonContainer>;
};
