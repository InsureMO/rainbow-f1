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
    grid-template-columns: auto 1fr auto;
    grid-column-gap: 16px;
    grid-row-gap: 8px;
    padding-bottom: 8px;
    margin-bottom: 16px;
    border-bottom: var(--f1-border);

    > span[data-w=d9-caption] {
        color: var(--f1-font-color);

        &[data-column="1"] {
            grid-column: 1;
        }
    }

    > button[data-role=run],
    > button[data-role=stop] {
        padding-left: 6px;
    }
`;
export const EnvCommandBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wb-work-area-end-command-editor-body'})`
    display: grid;
    position: relative;
    align-content: start;

    > span[data-w=d9-caption][data-role=command-body-title] {
        font-size: 1.1em;
        font-weight: 600;
        color: var(--f1-font-color);
    }
`;