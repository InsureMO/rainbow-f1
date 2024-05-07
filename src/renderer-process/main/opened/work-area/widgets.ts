import {CssVars, DOM_KEY_WIDGET, UnwrappedButton} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const WorkAreaContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area'})`
    display: grid;
    position: relative;
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    //height: calc(100vh - var(--f1-wb-location-bar-height) - var(--f1-wb-status-bar-height));
`;
export const WorkAreaHeaderContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-header'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr auto;
    width: 100%;
    //min-height: var(--f1-wb-work-area-header-height);
    align-items: center;
    align-self: start;
    background-image: linear-gradient(to bottom, transparent calc(var(--f1-wb-work-area-header-height) - var(--f1-border-width)), var(--f1-border-color) var(--f1-border-width));
    background-size: 100% var(--f1-wb-work-area-header-height);
`;
export const WorkAreaHeaderTabsContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-header-tabs'})`
    display: flex;
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    //min-height: var(--f1-wb-work-area-header-height);
    overflow: hidden;
`;
export const WorkAreaHeaderTabContainer = styled.div.attrs<{ active?: boolean }>(({active}) => {
	return {
		[DOM_KEY_WIDGET]: 'f1-wb-work-area-header-tab',
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
export const WorkAreaHeaderTabTitle = styled.span.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-header-tab-title'})`
    white-space: nowrap;
`;
export const WorkAreaHeaderTabCloseButton = styled(UnwrappedButton).attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-header-tab-close-button'})`
    height: calc(var(--f1-wb-work-area-header-height) * 0.5);
    width: calc(var(--f1-wb-work-area-header-height) * 0.5);
    border-radius: 100%;
    padding: 0;
    margin-left: 4px;

    &:hover {
        background-color: var(--f1-waive-color);

        > span[data-w=d9-deco-lead] > svg {
            fill: var(--f1-invert-color);
        }
    }

    > span[data-w=d9-deco-lead] > svg {
        height: calc(var(--f1-wb-work-area-header-height) * 0.35);
        width: calc(var(--f1-wb-work-area-header-height) * 0.35);
        fill: var(--f1-waive-color);
        transition: fill 300ms ease-in-out;
    }
`;
export const WorkAreaEditorContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-wb-work-area-editor'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    width: 100%;
    align-items: center;
    align-self: stretch;
`;
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
