import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {Side, SideContent} from '../side-bar';

export const BottomSideContainer = styled(Side).attrs({[DOM_KEY_WIDGET]: 'f1-wb-bottom-side'})`
    grid-column: 2 / span 3;
    grid-row: 3;
`;
export const BottomSideContent = styled(SideContent).attrs({[DOM_KEY_WIDGET]: 'f1-wb-bottom-side-content'})`
    width: 100%;
    border-top: var(--f1-border);
    border-top-color: var(--f1-wb-border-color);
    border-top-width: var(--border);
`;
