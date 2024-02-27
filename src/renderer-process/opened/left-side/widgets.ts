import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {SideBar} from '../side-bar';

export const LeftSideContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-left-side'})`
    display: flex;
    position: relative;
`;
export const LeftBar = styled(SideBar).attrs({[DOM_KEY_WIDGET]: 'f1-wb-left-bar'})`
    border-right: var(--f1-border);
    border-right-color: var(--f1-wb-border-color);
`;
export const LeftContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-left-container'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
`;
