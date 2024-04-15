import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const StatusBarContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-status-bar'})`
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    padding: 0 4px;
    height: var(--f1-wb-status-bar-height);
    border-top: var(--f1-border);
    border-top-color: var(--f1-wb-border-color);
    background-color: var(--f1-wb-bar-background-color);
    white-space: nowrap;
    overflow: hidden;
`;
export const StatusBarSegment = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-status-bar-segment'})`
    display: flex;
    position: relative;
    align-items: center;

    > svg[data-icon=f1-logo] {
        height: calc(var(--f1-wb-status-bar-height) * 0.7);
        width: calc(var(--f1-wb-status-bar-height) * 0.7);
        color: var(--f1-danger-color);
    }
`;
export const StatusBarSpaceHolder = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-status-bar-space-holder'})`
    display: block;
    position: relative;
    flex-grow: 1;
    height: 1px;
`;
