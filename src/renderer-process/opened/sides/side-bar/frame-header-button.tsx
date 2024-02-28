import {ReactNode} from 'react';
import {useWorkbenchEventBus} from '../../workbench/event-bus';
import {SideFrameHeaderButtonContainer} from './widgets';

export interface FrameHeaderButtonProps {
	icon: ReactNode;
	tooltip: ReactNode;
	click: () => Promise<void>;
}

export const SideFrameHeaderButton = (props: FrameHeaderButtonProps) => {
	const {icon, tooltip, click} = props;

	const {fire} = useWorkbenchEventBus();

	return <SideFrameHeaderButtonContainer onClick={click}>
		{icon}
		<span data-tooltip="">{tooltip}</span>
	</SideFrameHeaderButtonContainer>;
};
