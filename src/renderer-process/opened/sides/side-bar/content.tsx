import {JSX, useEffect, useState} from 'react';
import {
	SideContentKey,
	SideContentPosition,
	useWorkbenchEventBus,
	WorkbenchEventTypes
} from '../../workbench/event-bus';
import {SideContentContainer, SideContentPartContainer} from './widgets';

export enum SideContentResizeOn {
	TOP = 'top', LEFT = 'left', RIGHT = 'right'
}

export type SwitchFrame = (key: SideContentKey, pos: SideContentPosition) => JSX.Element | undefined;

export interface SideContentPartState {
	key?: SideContentKey;
}

const useSideContentPart = (switchFrame: SwitchFrame, position: SideContentPosition) => {
	const {on, off, fire} = useWorkbenchEventBus();
	const [state, setState] = useState<SideContentPartState>({});
	useEffect(() => {
		const onOpen = (key: SideContentKey, pos: SideContentPosition) => {
			if (pos !== position) {
				return;
			}
			if (key === state.key) {
				return;
			}
			setState({key});
			fire(WorkbenchEventTypes.OPENED, key, position);
		};
		const onClose = (key: SideContentKey, pos: SideContentPosition) => {
			if (pos !== position) {
				return;
			}
			if (key !== state.key) {
				return;
			}
			setState({});
			fire(WorkbenchEventTypes.CLOSED, key, position);
		};
		on(WorkbenchEventTypes.OPEN, onOpen);
		on(WorkbenchEventTypes.CLOSE, onClose);
		return () => {
			off(WorkbenchEventTypes.OPEN, onOpen);
			off(WorkbenchEventTypes.CLOSE, onClose);
		};
	}, [on, off, state.key, position]);

	return switchFrame(state.key, position);
};

export const SideContentUpper = (props: { contentPosition: SideContentPosition; switch: SwitchFrame }) => {
	const {contentPosition, switch: switchFrame} = props;

	const part = useSideContentPart(switchFrame, contentPosition);

	return <SideContentPartContainer>
		{part}
	</SideContentPartContainer>;
};

export const SideContentLower = (props: { contentPosition: SideContentPosition; switch: SwitchFrame }) => {
	const {contentPosition, switch: switchFrame} = props;

	const part = useSideContentPart(switchFrame, contentPosition);

	return <SideContentPartContainer>
		{part}
	</SideContentPartContainer>;
};

export interface SideContentProps {
	resizeOn: SideContentResizeOn;
	positions: [SideContentPosition, SideContentPosition] | [SideContentPosition];
	switchFrame: SwitchFrame;
}

export interface SideContentState {
	upper: boolean;
	lower: boolean;
	contentSize?: number;
	lowerHeight?: number;
}

export const SideContent = (props: SideContentProps) => {
	const {resizeOn, positions, switchFrame, ...rest} = props;

	const {on, off} = useWorkbenchEventBus();
	const [state, setState] = useState<SideContentState>({upper: false, lower: false});
	useEffect(() => {
		const onOpened = (key: SideContentKey, pos: SideContentPosition) => {
			const [first, second] = positions;
			if (pos === first) {
				setState(state => ({...state, upper: true}));
			} else if (pos === second) {
				setState(state => ({...state, lower: true}));
			}
		};
		const onClosed = (key: SideContentKey, pos: SideContentPosition) => {
			const [first, second] = positions;
			if (pos === first) {
				setState(state => ({...state, upper: false}));
			} else if (pos === second) {
				setState(state => ({...state, lower: false}));
			}
		};
		on(WorkbenchEventTypes.OPENED, onOpened);
		on(WorkbenchEventTypes.CLOSED, onClosed);
		return () => {
			off(WorkbenchEventTypes.OPENED, onOpened);
			off(WorkbenchEventTypes.CLOSED, onClosed);
		};
	}, [on, off, positions]);

	const [first, second] = positions;

	return <SideContentContainer upper={state.upper} lower={state.lower}
	                             vertical={first === SideContentPosition.BOTTOM}
	                             contentSize={state.contentSize} lowerHeight={state.lowerHeight}
	                             {...rest}>
		<SideContentUpper contentPosition={first} switch={switchFrame}/>
		{second != null ? <SideContentLower contentPosition={second} switch={switchFrame}/> : null}
	</SideContentContainer>;
};
