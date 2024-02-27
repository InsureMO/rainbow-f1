import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const StatusBarContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-status-bar'})`
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    height: var(--f1-wb-status-bar-height);
    border-top: var(--f1-border);
    border-top-color: var(--f1-wb-border-color);
    background-color: var(--f1-wb-bar-background-color);
    white-space: nowrap;
    overflow: hidden;
`;
