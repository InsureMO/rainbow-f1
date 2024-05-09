import {ReactNode, useEffect, useState} from 'react';
import {
	SideContentKey,
	SideContentPosition,
	useWorkbenchEventBus,
	WorkbenchEventTypes
} from '../../workbench/event-bus';
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

	const {on, off, fire} = useWorkbenchEventBus();
	const [opened, setOpened] = useState(false);
	useEffect(() => {
		const onOpened = (key: SideContentKey, pos: SideContentPosition) => {
			if (pos === contentPosition && key === contentKey) {
				setOpened(true);
			}
		};
		const onClosed = (key: SideContentKey, pos: SideContentPosition) => {
			if (pos === contentPosition && key === contentKey) {
				setOpened(false);
			}
		};
		on(WorkbenchEventTypes.SIDE_FRAME_OPENED, onOpened);
		on(WorkbenchEventTypes.SIDE_FRAME_CLOSED, onClosed);
		return () => {
			off(WorkbenchEventTypes.SIDE_FRAME_OPENED, onOpened);
			off(WorkbenchEventTypes.SIDE_FRAME_CLOSED, onClosed);
		};
	}, [on, off, contentKey, contentPosition]);

	const onClicked = () => {
		if (opened) {
			fire(WorkbenchEventTypes.CLOSE_SIDE_FRAME, contentKey, contentPosition);
		} else {
			fire(WorkbenchEventTypes.OPEN_SIDE_FRAME, contentKey, contentPosition);
		}
		setOpened(!opened);
	};

	return <SideBarButtonContainer data-active={opened} onClick={onClicked}>
		{icon}
		<span data-tooltip="" data-left={left}>{tooltip}</span>
	</SideBarButtonContainer>;
};
