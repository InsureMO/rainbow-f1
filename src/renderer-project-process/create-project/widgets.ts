import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const CreateProjectContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-create-project-container'})`
    display: grid;
    position: relative;
    grid-template-columns: 250px 1fr auto;
    grid-template-rows: auto 1fr auto;
    width: 100vw;
    height: 100vh;
    padding: 0 24px;
    overflow: hidden;

    > span[data-w=d9-caption][data-page-title] {
        grid-column: span 2;
        height: 64px;
    }

    > svg[data-icon=logo] {
        height: 48px;
        width: 48px;
        color: var(--f1-danger-color);
        align-self: center;
    }

    > div[data-w=f1-create-project-content] {
        grid-column: span 2;
    }

    > div[data-w=d9-button-bar] {
        grid-column: span 3;
        border-top: var(--f1-border);
        border-radius: 0;
        height: 64px;
    }
`;

export const CreateProjectSidebar = styled.div.attrs({
	[DOM_KEY_WIDGET]: 'f1-create-project-sidebar',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
    display: flex;
    position: relative;
    flex-direction: column;
    border-top: var(--f1-border);
    border-right: var(--f1-border);
    overflow: auto;
`;
export const CreateProjectBaseItem = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-create-project-base-item'})`
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 16px;
    min-height: var(--f1-row-height);
    border-radius: var(--f1-border-radius);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

    &[data-active=true] {
        color: var(--f1-invert-color);
        background-color: var(--f1-primary-color);
    }

    &[data-active=false]:hover {
        background-color: var(--f1-hover-color);
    }

    > span {
        display: inline-flex;
        position: relative;
        align-items: center;
        align-self: stretch;
    }

    > span:nth-child(2) {
        opacity: 0.5;
        font-size: 0.8em;
        margin-top: 1px;
        margin-left: 4px;
    }
`;
export const CreateProjectContent = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-create-project-content'})`
    display: flex;
    position: relative;
    border-top: var(--f1-border);
`;
export const ModuleSettingsContainer = styled.div.attrs({
	[DOM_KEY_WIDGET]: 'f1-module-settings-container',
	'data-v-scroll': ''
})`
    display: grid;
    position: relative;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;
    align-content: start;
    width: calc(100% + 16px);
    height: calc(100vh - 64px * 2);
    overflow-y: auto;
    overflow-x: hidden;

    > div, > span, > input {
        &[data-columns-2] {
            grid-column-end: span 2;
        }

        &[data-columns-10] {
            grid-column-end: span 10;
        }

        &[data-column-3] {
            grid-column-start: 3;
        }
    }

    > div[data-w=d9-deco-input] {
        &[data-di-columns-10] {
            grid-column: span 10;
        }

        &[data-di-dir] {
            > span[data-w=d9-deco-tail] {
                padding: 0;
                overflow: unset;

                > button {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    border-color: transparent;

                    &[data-fill=plain][data-ink=primary] > span[data-w=d9-deco-tail] {
                        fill: var(--f1-waive-color);
                        transition: fill 0.3s ease-in-out;
                    }

                    &[data-fill=plain][data-ink=primary]:hover {
                        color: var(--f1-primary-color);
                        border-color: var(--f1-primary-color);

                        > span[data-w=d9-deco-tail] {
                            fill: var(--f1-primary-color);
                        }
                    }
                }
            }
        }
    }

    > div[data-w=f1-invalid-msg] {
        margin-top: -8px;
    }
`;
export const ModuleSettingsTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-module-settings-title'})`
    display: flex;
    position: sticky;
    top: 0;
    align-items: center;
    grid-column: span 12;
    padding: 12px 0;
    font-size: 1.2em;
    background-color: var(--f1-background-color);
    border-bottom: var(--f1-border);
    z-index: 1;
`;
export const ComponentsTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-module-components-title'})`
    display: flex;
    position: relative;
    align-items: center;
    grid-column: span 12;
    margin-top: 8px;
    padding: 8px 0;
    font-size: 1.1em;
    //border-top: var(--f1-border);
    opacity: 0.7;

    &:after {
        content: '';
        display: block;
        position: absolute;
        top: calc(100% - 1px);
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--f1-border-color);
        opacity: 0.3;
    }
`;
export const ComponentContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-component-container'})`
    display: grid;
    position: relative;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 8px;
    grid-column: span 12;
    margin: 0 -8px;
    padding: 4px 8px;
    border-radius: var(--f1-border-radius);
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: var(--f1-hover-color);
    }

    &:after {
        content: '';
        display: block;
        position: absolute;
        top: calc(100% - 1px);
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--f1-border-color);
        opacity: 0.1;
    }

    > div[data-w=d9-checkbox] {
        align-self: start;
        justify-self: end;
    }
`;
export const ComponentDescription = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-component-description'})`
    display: flex;
    position: relative;
    flex-direction: column;
    grid-column: span 11;

    > span {
        position: relative;
        line-height: 1.5;
    }

    > span[data-name] {
        display: flex;
        font-weight: 500;
        color: var(--f1-primary-color);
        height: 24px;
    }

    > span[data-desc] > span[data-name] {
        font-weight: 500;
        color: var(--f1-primary-color);
    }
`;