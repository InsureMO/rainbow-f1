import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const LocationBarContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-location-bar'})`
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    height: var(--f1-wb-location-bar-height);
    padding: 0 4px;
    border-bottom: var(--f1-border);
    border-bottom-color: var(--f1-wb-border-color);
    background-color: var(--f1-wb-bar-background-color);
    white-space: nowrap;
    overflow: hidden;

    > svg {
        height: calc(var(--f1-wb-location-bar-height) * 0.4);
        width: calc(var(--f1-wb-location-bar-height) * 0.4);
        color: var(--f1-wb-location-segment-icon-color);
        opacity: 0.2;
    }
`;

export const LocationSegment = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-location-segment'})`
    display: flex;
    position: relative;
    align-items: center;
    height: calc(var(--f1-wb-location-bar-height) * 0.8);
    padding: 0 8px;
    border-radius: var(--f1-border-radius);
    cursor: default;

    &:hover {
        background-color: var(--f1-wb-location-segment-hover-color);
    }

    > svg {
        height: calc(var(--f1-wb-location-bar-height) * 0.5);
        width: calc(var(--f1-wb-location-bar-height) * 0.5);
        color: var(--f1-wb-location-segment-icon-color);
        margin-right: 8px;
    }
`;
