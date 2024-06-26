import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const RecentContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-create-or-recent-container'})`
    display: block;
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;
export const RecentContent = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-create-or-recent-content'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr auto;
    width: 100vw;
    height: 100vh;
    padding: 0 24px;

    > span[data-w=d9-caption][data-page-title] {
        height: 64px;
    }

    > svg[data-icon=f1-logo] {
        height: 48px;
        width: 48px;
        color: var(--f1-danger-color);
        align-self: center;
    }

    > div[data-w=d9-tree] {
        grid-column: span 2;
        border: 0;
        border-top: var(--f1-border);
        border-radius: 0;
        width: 100%;
        height: calc(100vh - 64px - 64px);
        max-height: 100%;
    }

    > div[data-w=d9-button-bar] {
        grid-column: span 2;
        border-top: var(--f1-border);
        border-radius: 0;
        height: 64px;
    }

    span[data-w=d9-tree-node-label] {
        flex-grow: 1;
        align-self: stretch;

        > span[data-recent-category], > span[data-recent-project] {
            display: flex;
            position: relative;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;

            > span[data-operator] {
                display: flex;
                position: relative;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                fill: var(--f1-label-color);
                border: 1px solid transparent;
                border-radius: calc(var(--f1-border-radius) * 2);
                opacity: 0;
                cursor: pointer;
                transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

                &:hover {
                    border-color: var(--f1-primary-color);
                    box-shadow: var(--f1-primary-hover-shadow);
                    fill: var(--f1-primary-color);
                }

                > svg[data-icon=f1-ellipsis-vertical] {
                    height: 14px;
                    transition: fill 0.3s ease-in-out;
                }
            }
        }

        > span[data-recent-category] {
            > span[data-name] {
                flex-grow: 1;
            }

            > svg {
                width: 14px;
                height: 14px;
                margin-right: 8px;
                fill: var(--f1-label-color);

                &[data-icon=f1-folder-closed-empty] + svg[data-icon=f1-folder-open] {
                    display: none;
                }
            }
        }

        > span[data-recent-project] {
            > span {
                display: flex;
                position: relative;
                align-items: center;
            }

            > span[data-short-name] {
                padding: 0 6px;
                height: 24px;
                margin-right: 8px;
                font-stretch: ultra-condensed;
                border-radius: 8px;
                color: var(--f1-invert-color);
                background-color: var(--f1-primary-color);
            }

            > span[data-path] {
                flex-grow: 1;
                opacity: 0.7;
                font-size: 0.85em;
                margin-left: 12px;
                margin-top: 2px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            > span[data-broken-msg] {
                color: var(--f1-danger-color);
                opacity: 0.7;
                font-size: 0.85em;
                margin-left: 12px;
                margin-top: 2px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    span[data-w=d9-tree-node-toggle] {
        &[data-expanded=true] + span[data-w=d9-tree-node-label] > span[data-recent-category] > svg[data-icon=f1-folder-closed] {
            display: none;
        }

        &[data-expanded=false] + span[data-w=d9-tree-node-label] > span[data-recent-category] > svg[data-icon=f1-folder-open] {
            display: none;
        }
    }

    div[data-w=d9-tree-node-container]:hover span[data-w=d9-tree-node-label] {
        > span[data-recent-category], > span[data-recent-project] {
            > span[data-operator] {
                opacity: 1;
            }
        }
    }
`;
export const NoRecentProject = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-create-or-recent-nothing-found'})`
    display: flex;
    position: relative;
    grid-column: span 2;
    flex-grow: 1;
    align-items: start;
    font-size: 1.2em;
    color: var(--f1-label-color);
    padding: 8px 0 24px;
    line-height: 1.5;
    border-top: var(--f1-border);
`;
