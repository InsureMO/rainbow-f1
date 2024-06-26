import {Fragment, MouseEvent, ReactNode, useEffect, useRef, useState} from 'react';
import {isBlank} from '../../../../../shared';
import {
	SideContentKey,
	SideContentPosition,
	useWorkbenchEventBus,
	WorkbenchEventTypes
} from '../../workbench/event-bus';
import {SideFrame} from '../frames';
import {
	SideContentContainer,
	SideContentPartContainer,
	SideContentResizeOn,
	SideInnerSlider,
	SideSlider,
	SideSliderProps
} from './widgets';

export type SwitchFrame = (key: SideContentKey, pos: SideContentPosition) => SideFrame | undefined;

export interface SideContentPartState {
	key?: SideContentKey;
}

const useSideContentPart = (position: SideContentPosition) => {
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

	return state.key;
};

export const SideContentPart = (props: { contentPosition: SideContentPosition; switch: SwitchFrame }) => {
	const {contentPosition, switch: switchFrame} = props;

	// at most one transient element
	const [state, setState] = useState<Array<{ key: SideContentKey; keep: boolean; element: ReactNode }>>([]);
	const key = useSideContentPart(contentPosition);
	useEffect(() => {
		if (isBlank(key)) {
			const hasTransient = state.some(({keep}) => keep === false);
			if (!hasTransient) {
				return;
			} else {
				// otherwise remove the transient element
				setState(state.filter(({keep}) => keep === true));
			}
		}
		// find existing
		const exists = state.find(({key: existKey}) => existKey === key);
		if (exists != null) {
			if (exists === state[state.length - 1]) {
				// do nothing
				return;
			} else {
				// already exists, let it be last. meanwhile, remove transient elements
				setState([...state.filter(({key: existKey}) => existKey !== key), exists]);
			}
		} else {
			const {keep, element} = switchFrame(key, contentPosition) ?? {keep: false, element: (void 0)};
			setState([
				...state.filter(({key: existKey, keep}) => keep === true && existKey !== key),
				...(element == null ? [] : [{key, keep, element}])
			]);
		}
	}, [key, state]);

	return <SideContentPartContainer>
		{state.map(({key, element}) => {
			return <Fragment key={key}>{element}</Fragment>;
		})}
	</SideContentPartContainer>;
};

export {SideContentResizeOn};

export interface SideContentSliderState extends SideSliderProps {
	parentWidth?: number;
	parentHeight?: number;
}

export interface SideContentInnerSliderState extends SideSliderProps {
	lowerHeight?: number;
}

export type ComputeNewSize = (
	parentWidth: number, parentHeight: number,
	mouseStartX: number, mouseStartY: number,
	mouseCurrentX: number, mouseCurrentY: number) => {
	currentX: number; currentY: number; resizeToWidth: number; resizeToHeight: number
}

export const SideContentInnerSlider = (props: { resizeTo: (lowerHeight: number) => void }) => {
	const {resizeTo} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off} = useWorkbenchEventBus();
	const [state, setState] = useState<SideContentInnerSliderState>({active: false});
	useEffect(() => {
		const onRecomputePosition = () => {
			setTimeout(() => {
				const {height} = ref.current.previousElementSibling.previousElementSibling.getBoundingClientRect();
				setState(state => ({...state, sliderTop: height - 4}));
			}, 30);
		};
		const observer = new ResizeObserver(() => {
			onRecomputePosition();
		});
		observer.observe(ref.current.parentElement);
		on(WorkbenchEventTypes.SIDE_FRAME_OPENED, onRecomputePosition);
		on(WorkbenchEventTypes.SIDE_FRAME_CLOSED, onRecomputePosition);

		return () => {
			off(WorkbenchEventTypes.SIDE_FRAME_OPENED, onRecomputePosition);
			off(WorkbenchEventTypes.SIDE_FRAME_CLOSED, onRecomputePosition);
			observer.disconnect();
		};
	}, []);

	const MIN_PART_HEIGHT = 150;
	const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		if (event.button === 0) {
			// respond to primary button only
			const {top: sliderTop, left: sliderLeft, width: sliderWidth} = ref.current.getBoundingClientRect();
			const {height: lowerHeight} = ref.current.previousElementSibling.getBoundingClientRect();
			const {screenY: startY} = event;
			setState(state => ({
				...state, active: true, startY, sliderTop, sliderLeft, sliderWidth, lowerHeight
			}));
		}
	};
	const onMouseUp = (_event: MouseEvent<HTMLDivElement>) => {
		const {height} = ref.current.previousElementSibling.previousElementSibling.getBoundingClientRect();
		setState(state => ({...state, sliderTop: height - 4, active: false}));
	};
	const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		if (!state.active) {
			return;
		}
		const {screenY} = event;
		// compute resize to
		let lowerHeight = state.lowerHeight + state.startY - screenY;
		if (lowerHeight < MIN_PART_HEIGHT) {
			lowerHeight = MIN_PART_HEIGHT;
		}
		const {top: parentTop, height: parentHeight} = ref.current.parentElement.getBoundingClientRect();
		if (parentHeight - lowerHeight < MIN_PART_HEIGHT) {
			lowerHeight = parentHeight - MIN_PART_HEIGHT;
		}
		const sliderTop = parentTop + parentHeight - lowerHeight - 4;
		setState(state => ({...state, sliderTop}));
		resizeTo(lowerHeight);
	};

	return <SideInnerSlider {...state}
	                        onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}
	                        ref={ref}/>;
};

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
	const innerResize = (lowerHeight: number) => {
		setState(state => ({...state, lowerHeight}));
	};

	return <SideContentContainer upper={state.upper} lower={state.lower}
	                             vertical={first === SideContentPosition.BOTTOM}
	                             contentSize={state.contentSize} lowerHeight={state.lowerHeight}
	                             {...rest} ref={ref}>
		<SideContentPart contentPosition={first} switch={switchFrame}/>
		{second != null ? <SideContentPart contentPosition={second} switch={switchFrame}/> : null}
		{second != null ? <SideContentInnerSlider resizeTo={innerResize}/> : null}
		<SideContentSlider resizeOn={resizeOn} resizeTo={resize} computeNewSize={createComputeNewSize(first)}/>
	</SideContentContainer>;
};
