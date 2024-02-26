import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const WorkAreaContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area'})`
    display: block;
    position: relative;
    width: 100%;
    height: calc(100vh - var(--f1-wb-location-bar-height) - var(--f1-wb-status-bar-height));
`;