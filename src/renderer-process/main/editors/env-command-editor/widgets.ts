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
export const EnvCommandBasic = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wb-work-area-end-command-editor-basic'})`
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
export const EnvCommandVariable = styled.div.attrs({
	[DOM_KEY_WIDGET]: 'd9-wb-work-area-end-command-editor-variable',
	'data-v-scroll': ''
})`
    display: grid;
    position: relative;
    align-content: start;
    grid-template-columns: auto auto 1fr auto;
    overflow-x: hidden;
    overflow-y: auto;

    > span[data-w=d9-caption][data-role=command-variable-title] {
        position: sticky;
        top: 0;
        font-size: 1.1em;
        font-weight: 600;
        color: var(--f1-font-color);
        background-color: var(--f1-background-color);
        grid-column: 1 / span 4;
        height: calc(var(--f1-row-height) * 1.1);
        z-index: 1;
    }

    > span[data-w=d9-caption][data-role=command-variable-column-header] {
        position: sticky;
        top: calc(var(--f1-row-height) * 1.1);
        font-weight: 600;
        color: var(--f1-font-color);
        background-color: var(--f1-background-color);
        padding: 0 16px 0 8px;
        border-bottom: var(--f1-border);
        z-index: 1;
    }

    > span[data-w=d9-caption][data-role=command-variable-column-cell] {
        color: var(--f1-font-color);
        padding: 0 16px 0 8px;
        border-bottom: var(--f1-border);

        &[data-cell-role=command-variable-cell-category] {
            text-transform: capitalize;
        }

        &:nth-child(8n + 6), &:nth-child(8n + 7), &:nth-child(8n + 8), &:nth-child(8n + 9) {
            background-color: var(--f1-odd-row-background-color);
        }
    }
`;
