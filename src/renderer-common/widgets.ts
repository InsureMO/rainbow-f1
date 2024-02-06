import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const ButtonBarSpacer = styled.div.attrs({[DOM_KEY_WIDGET]: 'button-bar-spacer'})`
    display: block;
    position: relative;
    flex-grow: 1;
`;
