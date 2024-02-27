import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {SideBar} from '../side-bar';

export const LeftBarContainer = styled(SideBar).attrs({[DOM_KEY_WIDGET]: 'f1-wb-left-bar'})`
    border-right: var(--f1-border);
    border-right-color: var(--f1-wb-border-color);
`;
