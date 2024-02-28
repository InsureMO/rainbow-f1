import {JSX, useEffect, useState} from 'react';
import {isNotBlank} from '../../../../shared';
import {SideContentKey, SideContentPosition, SideEventTypes, useSideEventBus} from './event-bus';
import {SideContentContainer, SideContentPartContainer} from './widgets';

export enum SideContentResizeOn {
	LEFT = 'left', RIGHT = 'right'
}

export type SwitchFrame = (key: SideContentKey, pos: SideContentPosition) => JSX.Element | undefined;

export interface SideContentPartState {
	key?: SideContentKey;
}

const useSideContentPart = (switchFrame: SwitchFrame, position: SideContentPosition) => {
	const {on, off, fire} = useSideEventBus();
	const [state, setState] = useState<SideContentPartState>({});
	useEffect(() => {
		const onOpen = (key: SideContentKey, pos: SideContentPosition) => {
			if (pos !== position) {
				return;
			}
			if (isNotBlank(state.key) && key !== state.key) {
				return;
			}
			setState({key});
			fire(SideEventTypes.OPENED, state.key, position);
		};
		const onClose = (key: SideContentKey, pos: SideContentPosition) => {
			if (pos !== position) {
				return;
			}
			if (key !== state.key) {
				return;
			}
			setState({});
			fire(SideEventTypes.CLOSED, state.key, position);
		};
		on(SideEventTypes.OPEN, onOpen);
		on(SideEventTypes.CLOSE, onClose);
		return () => {
			off(SideEventTypes.OPEN, onOpen);
			off(SideEventTypes.CLOSE, onClose);
		};
	}, [on, off]);

	const part = switchFrame(state.key, position);
	// TODO DEAL WITH NO PART NEED TO BE SWITCH
	return part;
};

export const SideContentUpper = (props: { switch: SwitchFrame }) => {
	const {switch: switchFrame} = props;

	const part = useSideContentPart(switchFrame, SideContentPosition.UPPER);

	return <SideContentPartContainer>
		{part}
	</SideContentPartContainer>;
};

export const SideContentLower = (props: { switch: SwitchFrame }) => {
	const {switch: switchFrame} = props;

	const part = useSideContentPart(switchFrame, SideContentPosition.LOWER);

	return <SideContentPartContainer>
		{part}
	</SideContentPartContainer>;
};

export interface SideContentProps {
	resizeOn: SideContentResizeOn;
	switchFrame: SwitchFrame;
}

export interface SideContentState {
	upper: boolean;
	lower: boolean;
}

export const SideContent = (props: SideContentProps) => {
	const {resizeOn, switchFrame, ...rest} = props;

	const {on, off} = useSideEventBus();
	const [state, setState] = useState<SideContentState>({upper: false, lower: false});
	useEffect(() => {
		const onOpened = (key: SideContentKey, pos: SideContentPosition) => {
			if (pos === SideContentPosition.UPPER || pos === SideContentPosition.BOTTOM) {
				setState(state => ({...state, upper: true}));
			} else {
				setState(state => ({...state, lower: true}));
			}
		};
		const onClosed = (key: SideContentKey, pos: SideContentPosition) => {
			if (pos === SideContentPosition.UPPER || pos === SideContentPosition.BOTTOM) {
				setState(state => ({...state, upper: false}));
			} else {
				setState(state => ({...state, lower: false}));
			}
		};
		on(SideEventTypes.OPENED, onOpened);
		on(SideEventTypes.CLOSED, onClosed);
		return () => {
			off(SideEventTypes.OPENED, onOpened);
			off(SideEventTypes.CLOSED, onClosed);
		};
	}, [on, off]);

	console.log(state);

	return <SideContentContainer upper={state.upper} lower={state.lower} {...rest}>
		<SideContentUpper switch={switchFrame}/>
		<SideContentLower switch={switchFrame}/>
	</SideContentContainer>;
};
