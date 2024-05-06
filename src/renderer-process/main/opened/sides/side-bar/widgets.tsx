import {DOM_KEY_WIDGET, Utils} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const SideContainer = styled.div`
    display: flex;
    position: relative;
`;

export const SideBarContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: var(--f1-wb-side-bar-width);
    height: calc(100vh - var(--f1-wb-location-bar-height) - var(--f1-wb-status-bar-height));
    padding: 4px 0;
    background-color: var(--f1-wb-bar-background-color);
`;
export const SideBarButtonContainer = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-wb-side-bar-button'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    min-width: calc(var(--f1-wb-side-bar-width) * 0.8);
    min-height: calc(var(--f1-wb-side-bar-width) * 0.8);
    border-radius: var(--f1-border-radius);
    cursor: pointer;
    transition: color 300ms ease-in-out, background-color 300ms ease-in-out;

    &[data-active=true] {
        color: var(--f1-wb-side-bar-button-active-color);
        background-color: var(--f1-wb-side-bar-button-active-background-color);
    }

    &[data-active=false]:hover {
        background-color: var(--f1-wb-side-bar-button-hover-color);
    }

    &:hover > span[data-tooltip] {
        display: flex;
    }

    + span[data-w=f1-wb-side-bar-button] {
        margin-top: 8px;
    }

    > svg {
        color: var(--f1-wb-side-bar-button-icon-color);
        width: calc(var(--f1-wb-side-bar-width) * 0.5);
        height: calc(var(--f1-wb-side-bar-width) * 0.5);
    }

    > span[data-tooltip] {
        display: none;
        position: absolute;
        align-items: center;
        left: calc(100% + 8px);
        height: calc(var(--f1-wb-side-bar-width) * 0.8);
        background-color: var(--f1-wb-side-bar-button-tooltip-background-color);
        box-shadow: var(--f1-wb-side-bar-button-tooltip-shadow);
        padding: 0 16px;
        border: var(--f1-border);
        border-color: var(--f1-wb-border-color);
        border-radius: var(--f1-border-radius);
        z-index: var(--f1-wb-side-bar-button-tooltip-z-index);

        &[data-left=true] {
            left: unset;
            right: calc(100% + 8px);
        }
    }
`;
export const SideBarSeparator = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-wb-side-bar-separator'})`
    display: block;
    position: relative;
    margin: 8px 0;
    width: calc(var(--f1-wb-side-bar-width) * 0.6);
    height: 2px;
    border: var(--f1-border);
    border-color: var(--f1-wb-border-color);
    opacity: 0.7;
`;
export const SideBarSpaceHolder = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-wb-side-bar-space-holder'})`
    display: block;
    position: relative;
    flex-grow: 1;
`;
export const SideContentContainer = styled.div.attrs<{
	upper: boolean; lower: boolean; vertical: boolean; contentSize?: string | number; lowerHeight?: string | number
}>(({upper, lower, vertical, contentSize, lowerHeight}) => {
	return {
		[DOM_KEY_WIDGET]: 'f1-wb-side-content-container',
		'data-upper': upper ? '' : (void 0),
		'data-lower': lower ? '' : (void 0),
		style: {
			'--min-width': vertical ? (void 0) : ((upper || lower) ? (contentSize != null ? Utils.toCssSize(contentSize) : 'max(300px, 25vw)') : (void 0)),
			'--width': vertical ? (void 0) : ((upper || lower) ? (contentSize != null ? Utils.toCssSize(contentSize) : 'max(300px, 25vw)') : 0),
			'--min-height': !vertical ? (void 0) : ((upper || lower) ? (contentSize != null ? Utils.toCssSize(contentSize) : 'max(300px, 30vh)') : (void 0)),
			'--height': !vertical ? (void 0) : ((upper || lower) ? (contentSize != null ? Utils.toCssSize(contentSize) : 'max(300px, 30vh)') : 0),
			'--border': (upper || lower) ? '1px' : 0,
			'--grid-rows': lower ? (upper ? (lowerHeight != null ? `1fr ${Utils.toCssSize(lowerHeight)}` : '1fr 1fr') : '0px 1fr') : '1fr 0px'
		}
	};
})<{ upper: boolean; lower: boolean; vertical: boolean; contentSize?: string | number; lowerHeight?: string | number }>`
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: var(--grid-rows);
    min-width: var(--min-width);
    width: var(--width);
    min-height: var(--min-height);
    height: var(--height);
    overflow: hidden;

    &[data-upper], &[data-lower] {
        > div[data-w=f1-wb-side-slider] {
            display: block;
        }
    }

    &[data-upper][data-lower] {
        > div[data-w=f1-wb-side-content-part]:nth-last-child(2) {
            /** last one is slider */
            border-top: var(--f1-border);
            border-top-color: var(--f1-wb-border-color);
        }
    }

    &[data-upper]:not([data-lower]),
    &[data-lower]:not([data-upper]) {
        > div[data-w=f1-wb-side-inner-slider] {
            display: none;
        }
    }

    > div[data-w=f1-wb-side-slider] {
        display: none;
    }
`;

export enum SideContentResizeOn {
	TOP = 'top', LEFT = 'left', RIGHT = 'right'
}

export interface SideSliderProps {
	active: boolean;
	startX?: number;
	startY?: number;
	currentX?: number;
	currentY?: number;
	sliderTop?: number;
	sliderLeft?: number;
	sliderWidth?: number;
	sliderHeight?: number;
}

export const SideInnerSlider = styled.div.attrs<SideSliderProps>(
	({active, sliderTop, sliderLeft, sliderWidth}) => {
		let top, width, height, handleTop, handleLeft, handleWidth;
		[top, width, height] = [active ? 0 : Utils.toCssSize(sliderTop), active ? '100vw' : '100%', active ? '100vh' : '7px'];
		[handleTop, handleLeft, handleWidth] = [
			active ? Utils.toCssSize(sliderTop) : 0, active ? Utils.toCssSize(sliderLeft) : 0, active ? Utils.toCssSize(sliderWidth) : '100%'
		];

		return {
			[DOM_KEY_WIDGET]: 'f1-wb-side-inner-slider',
			style: {
				'--position': active ? 'fixed' : 'absolute',
				'--top': top, '--width': width, '--height': height,
				'--handle-top': handleTop, '--handle-left': handleLeft, '--handle-width': handleWidth,
				'--z-index': active ? 10000 : 1
			}
		};
	})<SideSliderProps>`
    display: block;
    position: var(--position);
    top: var(--top);
    left: 0;
    width: var(--width);
    height: var(--height);
    cursor: ns-resize;
    z-index: var(--z-index);

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: var(--handle-top);
        left: var(--handle-left);
        width: var(--handle-width);
        height: 7px;
        transition: background-color 300ms ease-in-out;
    }

    &:hover {
        :before {
            background-color: var(--f1-wb-side-slider-background-color);
        }
    }
`;
export const SideSlider = styled.div.attrs<SideSliderProps & { resizeOn: SideContentResizeOn }>(
	({
		 active,
		 startX, startY, currentX, currentY,
		 sliderTop, sliderLeft, sliderWidth, sliderHeight,
		 resizeOn
	 }) => {
		let top, left, width, height, handleTop, handleLeft, handleWidth, handleHeight, cursor;
		switch (resizeOn) {
			case SideContentResizeOn.TOP:
				[top, left, width, height] = [active ? 0 : '-3px', 0, active ? '100vw' : '100%', active ? '100vh' : '7px'];
				[handleTop, handleLeft, handleWidth, handleHeight] = [
					active ? Utils.toCssSize(currentY - startY + sliderTop) : 0, active ? Utils.toCssSize(sliderLeft) : 0,
					active ? Utils.toCssSize(sliderWidth) : '100%', active ? '7px' : '100%'
				];
				cursor = 'ns-resize';
				break;
			case SideContentResizeOn.RIGHT:
				[top, left, width, height] = [0, active ? 0 : 'calc(100% - 3px)', active ? '100vw' : '7px', active ? '100vh' : '100%'];
				[handleTop, handleLeft, handleWidth, handleHeight] = [
					active ? Utils.toCssSize(sliderTop) : 0, active ? Utils.toCssSize(currentX - startX + sliderLeft) : 0,
					active ? '7px' : '100%', active ? Utils.toCssSize(sliderHeight) : '100%'
				];
				cursor = 'ew-resize';
				break;
			case SideContentResizeOn.LEFT:
				[top, left, width, height] = [0, active ? 0 : '-3px', active ? '100vw' : '7px', active ? '100vh' : '100%'];
				[handleTop, handleLeft, handleWidth, handleHeight] = [
					active ? Utils.toCssSize(sliderTop) : 0, active ? Utils.toCssSize(currentX - startX + sliderLeft) : 0,
					active ? '7px' : '100%', active ? Utils.toCssSize(sliderHeight) : '100%'
				];
				cursor = 'ew-resize';
				break;
		}

		return {
			[DOM_KEY_WIDGET]: 'f1-wb-side-slider',
			style: {
				'--position': active ? 'fixed' : 'absolute',
				'--top': top, '--left': left, '--width': width, '--height': height,
				'--handle-top': handleTop, '--handle-left': handleLeft,
				'--handle-width': handleWidth, '--handle-height': handleHeight,
				'--cursor': cursor,
				'--z-index': active ? 10000 : 1
			}
		};
	})<SideSliderProps & { resizeOn: SideContentResizeOn }>`
    display: block;
    position: var(--position);
    top: var(--top);
    left: var(--left);
    width: var(--width);
    height: var(--height);
    cursor: var(--cursor);
    z-index: var(--z-index);

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: var(--handle-top);
        left: var(--handle-left);
        width: var(--handle-width);
        height: var(--handle-height);
        transition: background-color 300ms ease-in-out;
    }

    &:hover {
        :before {
            background-color: var(--f1-wb-side-slider-background-color);
        }
    }
`;
export const SideContentPartContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-side-content-part'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    overflow: hidden;

    > div[data-w=f1-wb-side-frame-container]:not(:last-child) {
        display: none;
    }
`;
export const SideFrameContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-side-frame-container'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    overflow: hidden;
`;
export const SideFrameHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-side-frame-header'})`
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    min-height: var(--f1-wb-side-frame-header-height);
    height: var(--f1-wb-side-frame-header-height);
    padding: 0 8px 0 16px;
    background-color: var(--f1-wb-side-frame-header-background-color);
    border-bottom: var(--f1-border);
    border-bottom-color: var(--f1-wb-border-color);
`;
export const SideFrameHeaderSpaceHolder = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-wb-side-frame-space-holder'})`
    display: block;
    position: relative;
    flex-grow: 1;
`;
export const SideFrameHeaderButtonContainer = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-wb-side-frame-header-button'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    min-width: calc(var(--f1-wb-side-frame-header-height) * 0.8);
    min-height: calc(var(--f1-wb-side-frame-header-height) * 0.8);
    border-radius: var(--f1-border-radius);
    cursor: pointer;

    &:hover {
        background-color: var(--f1-wb-side-frame-header-button-hover-color);

        > span[data-tooltip] {
            display: flex;
        }
    }

    + span[data-w=f1-wb-side-frame-header-button] {
        margin-left: 8px;
    }

    > svg {
        color: var(--f1-wb-side-frame-header-button-icon-color);
        width: calc(var(--f1-wb-side-frame-header-height) * 0.5);
        height: calc(var(--f1-wb-side-frame-header-height) * 0.5);
    }

    > span[data-tooltip] {
        display: none;
        position: absolute;
        align-items: center;
        top: calc(100% + 8px);
        height: calc(var(--f1-wb-side-frame-header-height) * 0.8);
        background-color: var(--f1-wb-side-frame-header-button-tooltip-background-color);
        box-shadow: var(--f1-wb-side-frame-header-button-tooltip-shadow);
        padding: 0 16px;
        border: var(--f1-border);
        border-color: var(--f1-wb-border-color);
        border-radius: var(--f1-border-radius);
        z-index: 10000;
    }
`;
export const SideFrameBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-side-frame-body'})`
    display: block;
    position: relative;
    overflow: hidden;

    span[data-w=d9-tree-node-toggle] {
        /** standard folder icons */

        &[data-expanded=true] + span[data-w=d9-tree-node-label] > span[data-w=f1-wb-side-frame-tree-node-inner-label] > svg[data-icon=f1-folder-closed] {
            display: none;
        }

        &[data-expanded=false] + span[data-w=d9-tree-node-label] > span[data-w=f1-wb-side-frame-tree-node-inner-label] > svg[data-icon=f1-folder-open] {
            display: none;
        }
    }
`;
export const TreeNodeInnerLabel = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-wb-side-frame-tree-node-inner-label'})`
    display: flex;
    position: relative;
    flex-grow: 1;
    align-self: stretch;
    align-items: center;
    padding-right: 16px;

    > svg {
        /** standard folder icons */
        width: 14px;
        height: 14px;
        margin-right: 8px;
        fill: var(--f1-label-color);

        &[data-icon=f1-folder-closed-empty] + svg[data-icon=f1-folder-open] {
            display: none;
        }
    }

    > span[data-name] {
        /** standard node name */
        flex-grow: 1;
    }

    > span[data-path] {
        /** standard node path, or anything path likes */
        flex-grow: 1;
        opacity: 0.7;
        font-size: 0.85em;
        margin-left: 12px;
        margin-top: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    > span[data-link] {
        text-decoration: underline;

        &[data-weak-link] {
            opacity: 0.7;
            transition: opacity 300ms ease-in-out;

            &:hover {
                opacity: 1;
            }
        }
    }
`;
