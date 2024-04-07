import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {Side, SideBar, SideContent} from '../side-bar';

export const LeftSideContainer = styled(Side).attrs({[DOM_KEY_WIDGET]: 'f1-wb-left-side'})`
    grid-row: span 2;
`;
export const LeftBar = styled(SideBar).attrs({[DOM_KEY_WIDGET]: 'f1-wb-left-side-bar'})`
    border-right: var(--f1-border);
    border-right-color: var(--f1-wb-border-color);
`;
export const LeftSideContent = styled(SideContent).attrs({[DOM_KEY_WIDGET]: 'f1-wb-left-side-content'})`
    border-right: var(--f1-border);
    border-right-color: var(--f1-wb-border-color);
    border-right-width: var(--border);
`;
