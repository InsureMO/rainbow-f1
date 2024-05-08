import {CssVars, DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const EditorNotSupportedContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-editor-not-supported'})`
    display: grid;
    position: relative;
    grid-template-rows: 1fr 1fr;
    width: 100%;
    align-items: center;
    align-self: stretch;

    > span:first-child {
        align-self: end;
        justify-self: center;
        margin-bottom: 12px;
    }

    > div:last-child {
        align-self: start;
        justify-self: center;
        margin-top: 4px;
    }
`;
export const EditorResourceLocation = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-editor-resource-location'})`
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 4px;
    white-space: nowrap;
    overflow: hidden;

    > svg {
        height: calc(var(--f1-wb-work-area-header-height) * 0.4);
        width: calc(var(--f1-wb-work-area-header-height) * 0.4);
        color: var(--f1-wb-work-area-segment-icon-color);
        opacity: 0.2;
    }
`;
export const EditorResourceLocationSegment = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-editor-resource-location-segment'})`
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 8px;
    cursor: default;

    > svg {
        height: calc(var(--f1-wb-work-area-header-height) * 0.4);
        width: calc(var(--f1-wb-work-area-header-height) * 0.4);
        color: var(--f1-wb-work-area-segment-icon-color);
        margin-right: 8px;
    }
`;
export const EditorContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wb-work-area-editor-container'})`
    display: grid;
    position: relative;
    align-self: stretch;
    grid-template-columns: 1fr;
    overflow: hidden;
`;
export const EditorPanel = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wb-work-area-editor-panel'})`
    display: block;
    position: relative;
    width: 100%;
    align-self: stretch;
    overflow: hidden;

    > div.cm-editor {
        height: 100%;

        &.cm-focused {
            outline: none;
        }

        > div.cm-scroller {
            overflow-x: auto;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                background-color: transparent;
                height: ${CssVars.SCROLL_HEIGHT};
                width: ${CssVars.SCROLL_WEIGHT};
            }

            &::-webkit-scrollbar-track {
                background-color: ${CssVars.SCROLL_TRACK_COLOR};
                border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
            }

            &::-webkit-scrollbar-thumb {
                background-color: ${CssVars.SCROLL_THUMB_COLOR};
                border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
            }

            > div.cm-gutters {
                background-color: var(--f1-wb-work-area-editor-gutter-background-color);

                div.cm-gutter.cm-lineNumbers {
                    > div.cm-activeLineGutter {
                        color: var(--f1-font-color);
                    }
                }

                div.cm-activeLineGutter {
                    background-color: var(--f1-wb-work-area-editor-active-line-background-color);
                }
            }
        }

        > ul.cm-tooltip-lint {
            background-color: var(--f1-wb-work-area-editor-lint-tooltip-background-color);
        }

        div.cm-search.cm-panel {
            /** beautify search panel */
            display: grid;
            position: relative;
            grid-template-columns: auto auto 1fr auto auto auto;
            grid-column-gap: 8px;
            grid-template-rows: auto auto auto;
            grid-row-gap: 8px;

            > * {
                margin: 0;
            }

            > input {
                grid-column: span 3;

                &:not(:first-child) {
                    grid-row: 3;

                    ~ * {
                        grid-row: 3;
                    }
                }
            }

            > button {
                background-image: none;
                border: ${CssVars.BORDER};
                border-radius: ${CssVars.BORDER_RADIUS};
                text-transform: capitalize;
                cursor: pointer;

                &:last-child {
                    padding: 0 8px;
                }
            }

            > label {
                display: flex;
                position: relative;
                align-items: center;
                text-transform: capitalize;

                &:nth-child(7) {
                    grid-column: span 4;
                }

                > input {
                    margin: 0 4px 0 0;
                }
            }

            > br {
                display: none;
            }
        }

        div.cm-tooltip-autocomplete {
            > ul {
                &::-webkit-scrollbar {
                    background-color: transparent;
                    height: ${CssVars.SCROLL_HEIGHT};
                    width: ${CssVars.SCROLL_WEIGHT};
                }

                &::-webkit-scrollbar-track {
                    background-color: ${CssVars.SCROLL_TRACK_COLOR};
                    border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
                }

                &::-webkit-scrollbar-thumb {
                    background-color: ${CssVars.SCROLL_THUMB_COLOR};
                    border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
                }
            }

            span.cm-completionLabel {
                font-weight: 600;
                margin-right: 16px;
            }
        }
    }
`;