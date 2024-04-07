import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {Side, SideBar, SideContent} from '../side-bar';

export const RightSideContainer = styled(Side).attrs({[DOM_KEY_WIDGET]: 'f1-wb-right-side'})`
    grid-row: span 2;
`;
export const RightBar = styled(SideBar).attrs({[DOM_KEY_WIDGET]: 'f1-wb-right-side-bar'})`
    border-left: var(--f1-border);
    border-left-color: var(--f1-wb-border-color);
`;
export const RightContent = styled(SideContent).attrs({[DOM_KEY_WIDGET]: 'f1-wb-right-side-content'})`
    border-left: var(--f1-border);
    border-left-color: var(--f1-wb-border-color);
    border-left-width: var(--border);
`;
