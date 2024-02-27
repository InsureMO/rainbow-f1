import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {SideBar} from '../side-bar';

export const RightBarContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-right-side'})`
    display: flex;
    position: relative;
`;
export const RightBar = styled(SideBar).attrs({[DOM_KEY_WIDGET]: 'f1-wb-right-bar'})`
    border-left: var(--f1-border);
    border-left-color: var(--f1-wb-border-color);
`;
export const RightContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-right-container'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
`;
