import {DOM_KEY_WIDGET, UnwrappedButton} from '@rainbow-d9/n2';
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
export const EditorMissedContentReminder = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wb-work-area-editor-missed-content'})`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: start;
    padding: 0 16px;

    > button {
        padding: 0;
    }
`;
export const EditorMissedContentMessage = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wb-work-area-editor-missed-content-message'})`
    display: flex;
    position: relative;
    align-items: center;
    min-height: var(--f1-row-height);
    margin: 16px 0;
    color: var(--f1-danger-color);
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
                height: var(--f1-wb-work-area-editor-scroll-height);
                width: var(--f1-wb-work-area-editor-scroll-width);
            }

            &::-webkit-scrollbar-track {
                background-color: var(--f1-wb-work-area-editor-scroll-track-color);
                border-radius: var(--f1-wb-work-area-editor-scroll-border-radius);
            }

            &::-webkit-scrollbar-thumb {
                background-color: var(--f1-wb-work-area-editor-scroll-thumb-color);
                border-radius: var(--f1-wb-work-area-editor-scroll-border-radius);
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
            background-color: var(--f1-wb-work-area-editor-search-background-color);

            > * {
                margin: 0;
            }

            > input {
                grid-column: span 3;
                background-color: transparent;
                border-radius: var(--f1-border-radius);
                color: var(--f1-font-color);

                &:not(:first-child) {
                    grid-row: 3;

                    ~ * {
                        grid-row: 3;
                    }
                }
            }

            > label {
                color: var(--f1-font-color);
            }

            > button {
                background-image: none;
                border: 0;
                border-radius: var(--f1-border-radius);
                text-transform: capitalize;
                cursor: pointer;
                color: var(--f1-invert-color);
                background-color: var(--f1-primary-color);

                &:last-child {
                    padding: 0 8px;
                    background-color: var(--f1-danger-color);
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
                    height: var(--f1-wb-work-area-editor-scroll-height);
                    width: var(--f1-wb-work-area-editor-scroll-width);
                }

                &::-webkit-scrollbar-track {
                    background-color: var(--f1-wb-work-area-editor-scroll-track-color);
                    border-radius: var(--f1-wb-work-area-editor-scroll-border-radius);
                }

                &::-webkit-scrollbar-thumb {
                    background-color: var(--f1-wb-work-area-editor-scroll-thumb-color);
                    border-radius: var(--f1-wb-work-area-editor-scroll-border-radius);
                }
            }

            span.cm-completionLabel {
                font-weight: 600;
                margin-right: 16px;
            }
        }
    }
`;
export const EditorStatusBar = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wb-work-area-editor-status-bar'})`
    display: flex;
    position: relative;
    min-height: var(--f1-wb-work-area-status-height);
    border-top: var(--f1-border);
`;
export const EditorStatusBarGrabber = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wb-work-area-editor-status-bar-grabber'})`
    display: block;
    position: relative;
    flex-grow: 1;
`;
export const EditorStatusButton = styled(UnwrappedButton)`
    border-radius: 0;
    border: 0;
    height: unset;
    font-size: calc(var(--f1-font-size) * 0.8);
    padding: 0 8px 0 12px;
    box-shadow: none;

    &[data-ink=primary] {
        background-color: transparent;
        color: var(--f1-font-color);
    }

    &[data-ink=primary]:hover {
        background-color: var(--f1-primary-color);
        color: var(--f1-invert-color);
        box-shadow: none;

        > span[data-w=d9-deco-lead] > svg {
            color: var(--f1-invert-color);
        }
    }

    &[data-ink=primary]:focus, &[data-ink=primary]:active {
        box-shadow: none;
    }

    > span[data-w=d9-deco-lead] {
        padding-left: 0;
        min-width: unset;
        color: var(--f1-font-color);

        > svg {
            height: calc(var(--f1-font-size) * 0.8);
            transition: color 0.3s ease-in-out;
        }
    }
`;
