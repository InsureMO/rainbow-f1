import {ReactNode} from 'react';
import {SideContentKey, SideContentPosition, SideEventTypes, useSideEventBus} from './event-bus';
import {SideBarButtonContainer} from './widgets';

export interface SideBarButtonProps {
	icon: ReactNode;
	tooltip: ReactNode;
	/** tooltip location */
	left?: boolean;
	contentKey: SideContentKey;
	contentPosition: SideContentPosition;
}

export const SideBarButton = (props: SideBarButtonProps) => {
	const {icon, tooltip, left = false, contentKey, contentPosition} = props;

	const {fire} = useSideEventBus();

	const onClicked = () => {
		// TODO SHOULD BE SWITCHING
		fire(SideEventTypes.OPEN, contentKey, contentPosition);
	};

	return <SideBarButtonContainer onClick={onClicked}>
		{icon}
		<span data-tooltip="" data-left={left}>{tooltip}</span>
	</SideBarButtonContainer>;
};
