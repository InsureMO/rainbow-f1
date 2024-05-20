import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const EnvCommandEditorPanel = styled.div.attrs({
	[DOM_KEY_WIDGET]: 'd9-wb-work-area-env-command-editor-panel',
	'data-v-scroll': ''
})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    width: 100%;
    padding: 16px;
    align-self: stretch;
    overflow: hidden;
`;
export const EnvCommandBasic = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wb-work-area-env-command-editor-basic'})`
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
export const EnvFilesHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-env-command-files-header'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr auto;
    width: 100%;
    align-items: center;
    align-self: start;
    background-image: linear-gradient(to bottom, transparent calc(var(--f1-wb-work-area-header-height) - var(--f1-border-width)), var(--f1-border-color) var(--f1-border-width));
    background-size: 100% var(--f1-wb-work-area-header-height);
`;
export const EnvFilesHeaderTabs = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-env-command-files-tabs'})`
    display: flex;
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    //min-height: var(--f1-wb-work-area-header-height);
    overflow: hidden;
`;
export const EnvFilesHeaderTab = styled.div.attrs<{ active?: boolean }>(({active}) => {
	return {
		[DOM_KEY_WIDGET]: 'f1-wb-work-area-env-command-file-tab',
		style: {
			'--active-bar-visible': active ? 'block' : (void 0)
		}
	};
})<{ active?: boolean }>`
    display: flex;
    position: relative;
    align-items: center;
    height: var(--f1-wb-work-area-header-height);
    padding: 0 8px;
    cursor: pointer;

    &:after {
        content: '';
        display: var(--active-bar-visible, none);
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3px;
        border-radius: 1px;
        background-color: var(--f1-primary-color);
    }

    &:hover {
        background-color: var(--f1-wb-work-area-header-hover-color);
    }

    > svg {
        height: calc(var(--f1-wb-work-area-header-height) * 0.4);
        width: calc(var(--f1-wb-work-area-header-height) * 0.4);
        margin-right: 8px;
    }
`;
export const EnvFilesHeaderTabTitle = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-env-command-file-tab-title'})`
    white-space: nowrap;
    padding-right: 8px;
`;
export const EnvFileBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-env-command-files-body'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    width: 100%;
    align-items: center;
    align-self: stretch;
    overflow: hidden;
`;
export const EnvFileEditorWrapper = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-env-command-file-editor'})`
    display: grid;
    position: relative;
    align-self: stretch;
    grid-template-columns: 1fr;
    border: var(--f1-border);
    border-top: 0;
    overflow: hidden;
`;
