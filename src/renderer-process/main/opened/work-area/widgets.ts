import {DOM_KEY_WIDGET, UnwrappedButton} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const WorkAreaContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area'})`
    display: grid;
    position: relative;
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    //height: calc(100vh - var(--f1-wb-location-bar-height) - var(--f1-wb-status-bar-height));
`;
export const WorkAreaHeaderContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-header'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr auto;
    width: 100%;
    //min-height: var(--f1-wb-work-area-header-height);
    align-items: center;
    align-self: start;
    background-image: linear-gradient(to bottom, transparent calc(var(--f1-wb-work-area-header-height) - var(--f1-border-width)), var(--f1-border-color) var(--f1-border-width));
    background-size: 100% var(--f1-wb-work-area-header-height);
`;
export const WorkAreaHeaderTabsContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-header-tabs'})`
    display: flex;
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    //min-height: var(--f1-wb-work-area-header-height);
    overflow: hidden;
`;
export const WorkAreaHeaderTabContainer = styled.div.attrs<{ active?: boolean }>(({active}) => {
	return {
		[DOM_KEY_WIDGET]: 'f1-wb-work-area-header-tab',
		style: {
			'--active-bar-visible': active ? 'block' : (void 0)
		}
	};
})<{ active?: boolean }>`
    display: flex;
    position: relative;
    align-items: center;
    height: var(--f1-wb-work-area-header-height);
    padding: 0 8px;
    cursor: pointer;

    &:after {
        content: '';
        display: var(--active-bar-visible, none);
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3px;
        border-radius: 1px;
        background-color: var(--f1-primary-color);
    }

    &:hover {
        background-color: var(--f1-wb-work-area-header-hover-color);
    }

    > svg {
        height: calc(var(--f1-wb-work-area-header-height) * 0.4);
        width: calc(var(--f1-wb-work-area-header-height) * 0.4);
        margin-right: 8px;
    }
`;
export const WorkAreaHeaderTabTitle = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-header-tab-title'})`
    white-space: nowrap;
`;
export const WorkAreaHeaderTabCloseButton = styled(UnwrappedButton).attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-header-tab-close-button'})`
    height: calc(var(--f1-wb-work-area-header-height) * 0.5);
    width: calc(var(--f1-wb-work-area-header-height) * 0.5);
    border-radius: 100%;
    padding: 0;
    margin-left: 4px;

    &:hover {
        background-color: var(--f1-waive-color);

        > span[data-w=d9-deco-lead] > svg {
            fill: var(--f1-invert-color);
        }
    }

    > span[data-w=d9-deco-lead] > svg {
        height: calc(var(--f1-wb-work-area-header-height) * 0.35);
        width: calc(var(--f1-wb-work-area-header-height) * 0.35);
        fill: var(--f1-waive-color);
        transition: fill 300ms ease-in-out;
    }
`;
