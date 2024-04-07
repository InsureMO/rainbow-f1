import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const ButtonBarSpacer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-button-bar-spacer'})`
    display: block;
    position: relative;
    flex-grow: 1;
`;
export const InvalidMessage = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-invalid-msg'})`
    display: flex;
    position: relative;
    align-items: center;
    min-height: var(--d9-form-cell-invalid-message-height);
    padding: var(--d9-form-cell-invalid-message-padding);
    font-size: var(--d9-form-cell-invalid-message-font-size);
    font-weight: var(--d9-form-cell-invalid-message-font-weight);
    color: var(--d9-form-cell-invalid-message-color);
`;
