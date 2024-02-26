import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const LocationBarContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-location-bar'})`
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    height: var(--f1-wb-location-bar-height);
    border-bottom: var(--f1-border);
    background-color: var(--f1-wb-bar-background-color);
    white-space: nowrap;
    overflow: hidden;
`;
