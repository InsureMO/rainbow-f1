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
			if (pos !== contentPosition) {
				return;
			}
			if (key === contentKey) {
				return;
			}
			setOpened(false);
		};
		const onClosed = (key: SideContentKey, pos: SideContentPosition) => {
			if (pos !== contentPosition) {
				return;
			}
			if (key === contentKey) {
				setOpened(false);
			}
		};
		on(WorkbenchEventTypes.OPENED, onOpened);
		on(WorkbenchEventTypes.CLOSED, onClosed);
		return () => {
			off(WorkbenchEventTypes.OPENED, onOpened);
			off(WorkbenchEventTypes.CLOSED, onClosed);
		};
	}, [on, off, contentKey, contentPosition]);

	const onClicked = () => {
		if (opened) {
			fire(WorkbenchEventTypes.CLOSE, contentKey, contentPosition);
		} else {
			fire(WorkbenchEventTypes.OPEN, contentKey, contentPosition);
		}
		setOpened(!opened);
	};

	return <SideBarButtonContainer data-active={opened} onClick={onClicked}>
		{icon}
		<span data-tooltip="" data-left={left}>{tooltip}</span>
	</SideBarButtonContainer>;
};
