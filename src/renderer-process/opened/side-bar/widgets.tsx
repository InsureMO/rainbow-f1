import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const SideBarContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: var(--f1-wb-left-bar-width);
    height: calc(100vh - var(--f1-wb-location-bar-height) - var(--f1-wb-status-bar-height));
    padding: 4px 0;
    border-right: var(--f1-border);
    border-right-color: var(--f1-wb-border-color);
    background-color: var(--f1-wb-bar-background-color);
`;
export const SideBarButtonContainer = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-side-bar-button'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    min-width: calc(var(--f1-wb-left-bar-width) * 0.8);
    min-height: calc(var(--f1-wb-left-bar-width) * 0.8);
    border-radius: var(--f1-border-radius);
    cursor: pointer;

    &:hover {
        background-color: var(--f1-wb-side-bar-button-hover-color);

        > span[data-tooltip] {
            display: flex;
        }
    }

    + span[data-w=f1-side-bar-button] {
        margin-top: 8px;
    }

    > svg {
        color: var(--f1-wb-side-bar-button-icon-color);
        width: calc(var(--f1-wb-left-bar-width) * 0.5);
        height: calc(var(--f1-wb-left-bar-width) * 0.5);
    }

    > span[data-tooltip] {
        display: none;
        position: absolute;
        align-items: center;
        left: calc(100% + 8px);
        height: calc(var(--f1-wb-left-bar-width) * 0.8);
        background-color: var(--f1-wb-side-bar-button-tooltip-background-color);
        box-shadow: var(--f1-wb-side-bar-button-tooltip-shadow);
        padding: 0 16px;
        border: var(--f1-border);
        border-color: var(--f1-wb-border-color);
        border-radius: var(--f1-border-radius);
        z-index: 10000;

        &[data-left=true] {
            left: unset;
            right: calc(100% + 8px);
        }
    }
`;
export const SideBarSeparator = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-side-bar-separator'})`
    display: block;
    position: relative;
    margin: 8px 0;
    width: calc(var(--f1-wb-left-bar-width) * 0.6);
    height: 2px;
    border: var(--f1-border);
    border-color: var(--f1-wb-border-color);
    opacity: 0.7;
`;
export const SideBarSpaceHolder = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-side-bar-space-holder'})`
    display: block;
    position: relative;
    flex-grow: 1;
`;
