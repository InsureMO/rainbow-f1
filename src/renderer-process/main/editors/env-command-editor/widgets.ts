import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const EnvCommandEditorPanel = styled.div.attrs({
	[DOM_KEY_WIDGET]: 'd9-wb-work-area-end-command-editor-panel',
	'data-v-scroll': ''
})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    width: 100%;
    padding: 16px;
    align-self: stretch;
    overflow: hidden;
`;
export const EnvCommandHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wb-work-area-end-command-editor-header'})`
    display: grid;
    position: relative;
    grid-template-columns: auto 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 8px;
    padding-bottom: 8px;
    border-bottom: var(--f1-border);

    > span[data-w=d9-caption] {
        color: var(--f1-font-color);
    }
`;
export const EnvCommandBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wb-work-area-end-command-editor-body'})`
    display: grid;
    position: relative;
    align-content: start;
`;