import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const ProjectWorkbenchContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb'})`
    display: grid;
    position: relative;
    width: 100vw;
    height: 100vh;
    grid-template-columns: auto auto 1fr auto auto;
    grid-template-rows: auto 1fr auto auto;
    overflow: hidden;

    > div[data-w=f1-wb-location-bar], > div[data-w=f1-wb-status-bar] {
        grid-column: span 5;
    }
`;
