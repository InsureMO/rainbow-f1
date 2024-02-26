import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const LeftBarContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-left-bar'})`
    display: flex;
    position: relative;
    flex-direction: column;
    width: var(--f1-wb-left-bar-width);
    height: calc(100vh - var(--f1-wb-location-bar-height) - var(--f1-wb-status-bar-height));
    border-right: var(--f1-border);
    background-color: var(--f1-wb-bar-background-color);
`;
