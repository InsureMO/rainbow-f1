import {JSX, MouseEvent, useEffect, useRef, useState} from 'react';
import {
	SideContentKey,
	SideContentPosition,
	useWorkbenchEventBus,
	WorkbenchEventTypes
} from '../../workbench/event-bus';
import {
	SideContentContainer,
	SideContentPartContainer,
	SideContentResizeOn,
	SideSlider,
	SideSliderProps
} from './widgets';

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
			fire(WorkbenchEventTypes.SIDE_FRAME_OPENED, key, position);
		};
		const onClose = (key: SideContentKey, pos: SideContentPosition) => {
			if (pos !== position) {
				return;
			}
			if (key !== state.key) {
				return;
			}
			setState({});
			fire(WorkbenchEventTypes.SIDE_FRAME_CLOSED, key, position);
		};
		on(WorkbenchEventTypes.OPEN_SIDE_FRAME, onOpen);
		on(WorkbenchEventTypes.CLOSE_SIDE_FRAME, onClose);
		return () => {
			off(WorkbenchEventTypes.OPEN_SIDE_FRAME, onOpen);
			off(WorkbenchEventTypes.CLOSE_SIDE_FRAME, onClose);
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

export {SideContentResizeOn};

export interface SideContentSliderState extends SideSliderProps {
	parentWidth?: number;
	parentHeight?: number;
}

export type ComputeNewSize = (
	parentWidth: number, parentHeight: number,
	mouseStartX: number, mouseStartY: number,
	mouseCurrentX: number, mouseCurrentY: number) => {
	currentX: number; currentY: number; resizeToWidth: number; resizeToHeight: number
}

export const SideContentSlider = (props: {
	resizeOn: SideContentResizeOn; resizeTo: (width: number, height: number) => void; computeNewSize: ComputeNewSize
}) => {
	const {resizeOn, resizeTo, computeNewSize} = props;

	const ref = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<SideContentSliderState>({active: false});

	const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		if (event.button === 0) {
			// respond to primary button only
			const {
				top: sliderTop, left: sliderLeft,
				width: sliderWidth, height: sliderHeight
			} = ref.current.getBoundingClientRect();
			const {width: parentWidth, height: parentHeight} = ref.current.parentElement.getBoundingClientRect();
			const {screenX: startX, screenY: startY} = event;
			setState(state => ({
				...state,
				active: true,
				startX, startY, currentX: startX, currentY: startY,
				sliderTop, sliderLeft, sliderWidth, sliderHeight,
				parentWidth, parentHeight
			}));
		}
	};
	const onMouseUp = (_event: MouseEvent<HTMLDivElement>) => {
		setState(state => ({...state, active: false}));
	};
	const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		if (!state.active) {
			return;
		}
		const {screenX, screenY} = event;
		// compute resize to
		const {currentX, currentY, resizeToWidth, resizeToHeight} =
			computeNewSize(state.parentWidth, state.parentHeight, state.startX, state.startY, screenX, screenY);
		setState(state => ({...state, currentX, currentY}));
		resizeTo(resizeToWidth, resizeToHeight);
	};

	return <SideSlider {...state} resizeOn={resizeOn}
	                   onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}
	                   ref={ref}/>;
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

const createComputeNewSize = (position: SideContentPosition): ComputeNewSize => (
	parentWidth: number, parentHeight: number,
	mouseStartX: number, mouseStartY: number,
	mouseCurrentX: number, mouseCurrentY: number) => {
	const MIN_SIDE_SIZE = 200;

	let currentX = mouseCurrentX, currentY = mouseCurrentY;

	let resizeToWidth: number;
	if (position === SideContentPosition.LEFT_UPPER) {
		resizeToWidth = parentWidth - mouseStartX + mouseCurrentX;
	} else {
		resizeToWidth = parentWidth + mouseStartX - mouseCurrentX;
	}
	let resizeToHeight: number;
	if (position === SideContentPosition.BOTTOM) {
		resizeToHeight = parentHeight + mouseStartY - mouseCurrentY;
	} else {
		resizeToHeight = parentHeight - mouseStartY + mouseCurrentY;
	}
	let shouldComputeCurrentX = false;
	if (resizeToWidth < MIN_SIDE_SIZE) {
		resizeToWidth = MIN_SIDE_SIZE;
		shouldComputeCurrentX = true;
	} else if (resizeToWidth > window.innerWidth * 0.4) {
		resizeToWidth = window.innerWidth * 0.4;
		shouldComputeCurrentX = true;
	}
	if (shouldComputeCurrentX) {
		if (position === SideContentPosition.BOTTOM || position === SideContentPosition.RIGHT_UPPER) {
			currentX = parentWidth + mouseStartX - resizeToWidth;
		} else {
			currentX = resizeToWidth - parentWidth + mouseStartX;
		}
	}
	let shouldComputeCurrentY = false;
	if (resizeToHeight < MIN_SIDE_SIZE) {
		resizeToHeight = MIN_SIDE_SIZE;
		shouldComputeCurrentY = true;
	} else if (resizeToHeight > window.innerHeight * 0.8) {
		resizeToHeight = window.innerHeight * 0.8;
		shouldComputeCurrentY = true;
	}
	if (shouldComputeCurrentY) {
		if (position === SideContentPosition.BOTTOM) {
			currentY = parentHeight + mouseStartY - resizeToHeight;
		} else {
			currentY = resizeToHeight - parentHeight + mouseStartY;
		}
	}

	return {currentX, currentY, resizeToWidth, resizeToHeight};
};

export const SideContent = (props: SideContentProps) => {
	const {resizeOn, positions, switchFrame, ...rest} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off} = useWorkbenchEventBus();
	const [state, setState] = useState<SideContentState>({upper: false, lower: false});
	useEffect(() => {
		const observer = new ResizeObserver(() => {
			const {innerWidth, innerHeight} = window;
			const [first] = positions;
			// min width and height are controlled in main window,
			// to make sure the computed value from window width and height will not be smaller than min content size
			if (first === SideContentPosition.BOTTOM) {
				if (state.contentSize > innerHeight * 0.8) {
					setState(state => ({...state, contentSize: innerHeight * 0.8}));
				}
			} else {
				if (state.contentSize > innerWidth * 0.4) {
					setState(state => ({...state, contentSize: innerWidth * 0.4}));
				}
			}
		});
		if (ref.current != null) {
			observer.observe(ref.current);
		}
		return () => {
			observer.disconnect();
		};
	}, [state]);
	useEffect(() => {
		const onOpened = (_key: SideContentKey, pos: SideContentPosition) => {
			const [first, second] = positions;
			if (pos === first) {
				setState(state => ({...state, upper: true}));
			} else if (pos === second) {
				setState(state => ({...state, lower: true}));
			}
		};
		const onClosed = (_key: SideContentKey, pos: SideContentPosition) => {
			const [first, second] = positions;
			if (pos === first) {
				setState(state => ({...state, upper: false}));
			} else if (pos === second) {
				setState(state => ({...state, lower: false}));
			}
		};
		on(WorkbenchEventTypes.SIDE_FRAME_OPENED, onOpened);
		on(WorkbenchEventTypes.SIDE_FRAME_CLOSED, onClosed);
		return () => {
			off(WorkbenchEventTypes.SIDE_FRAME_OPENED, onOpened);
			off(WorkbenchEventTypes.SIDE_FRAME_CLOSED, onClosed);
		};
	}, [on, off, positions]);

	const [first, second] = positions;

	const resize = (width: number, height: number) => {
		if (first === SideContentPosition.BOTTOM) {
			setState(state => ({...state, contentSize: height}));
		} else {
			setState(state => ({...state, contentSize: width}));
		}
	};

	return <SideContentContainer upper={state.upper} lower={state.lower}
	                             vertical={first === SideContentPosition.BOTTOM}
	                             contentSize={state.contentSize} lowerHeight={state.lowerHeight}
	                             {...rest} ref={ref}>
		<SideContentUpper contentPosition={first} switch={switchFrame}/>
		{second != null ? <SideContentLower contentPosition={second} switch={switchFrame}/> : null}
		<SideContentSlider resizeOn={resizeOn} resizeTo={resize} computeNewSize={createComputeNewSize(first)}/>
	</SideContentContainer>;
};
