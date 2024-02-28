import color from 'color';
import {createGlobalStyle} from 'styled-components';

export const GlobalStyles: any = createGlobalStyle`
    html, body {
        font-family: 'Roboto Mono', 'Noto Sans SC', 'Noto Sans JP', Arial, Helvetica, sans-serif;
        font-size: 14px;

        *, *:before, *:after {
            font-family: 'Roboto Mono', 'Noto Sans SC', 'Noto Sans JP', Arial, Helvetica, sans-serif;
            box-sizing: border-box;
        }
    }

    body {
        --f1-font-family: 'Roboto Mono', 'Noto Sans SC', 'Noto Sans JP', Arial, Helvetica, sans-serif;
        --f1-row-height: 32px;
        // color
        --f1-background-color: #fdfdfd;
        --f1-font-color: #444;
        --f1-label-color: #808080;
        --f1-label-ligther-color: #c0c0c0;
        --f1-primary-color: #5f88d6;
        --f1-danger-color: #dc3559;
        --f1-waive-color: #b4b4b4;
        --f1-readonly-color: #f5f5f5;
        --f1-hover-color: #eef6fd;
        --f1-disable-color: #ebebeb;
        --f1-invert-color: #fff;
        --f1-primary-shadow: 0 0 0 3px ${color('#5f88d6').alpha(0.4).toString()};
        --f1-primary-hover-shadow: 0 0 0 3px ${color('#5f88d6').alpha(0.2).toString()};
        --f1-dialog-shadow: 0 0 18px 6px ${color('#000').alpha(0.4).toString()};
        // border
        --f1-border-color: #e9e9e9;
        --f1-border: 1px solid var(--f1-border-color);
        --f1-border-radius: 4px;
        // scrollbar
        --f1-scroll-background-color: rgba(229, 229, 229, 0.5);
        --f1-scroll-thumb-color: rgb(193, 193, 193);
        // d9 color
        --d9-background-color: var(--f1-background-color);
        --d9-font-color: var(--f1-font-color);
        --d9-primary-color: var(--f1-primary-color);
        --d9-danger-color: var(--f1-danger-color);
        --d9-waive-color: var(--f1-waive-color);
        --d9-hover-color: var(--f1-hover-color);
        --d9-disable-color: var(--f1-disable-color);
        --d9-invert-color: var(--f1-invert-color);
        // d9 border
        --d9-border-color: var(--f1-border-color);
        --d9-border: var(--f1-border);
        --d9-border-radius: var(--f1-border-radius);
        // d9 font
        --d9-font-variant: none;
        // d9 common
        --d9-input-height: var(--f1-row-height);
        // d9 caption
        --d9-caption-font-family: var(--f1-font-family);
        // d9 dialog
        --d9-dialog-margin-top: max(96px, 20vh);
        --d9-dialog-margin-left: calc(50vw - var(--d9-dialog-width) / 2 - 32px);
        --d9-dialog-width: 600px;
        --d9-dialog-padding: 32px 32px 16px;
        --d9-dialog-header-padding: 0;
        --d9-dialog-header-margin: -24px 0 0;
        --d9-dialog-shadow: var(--f1-dialog-shadow);
        // d9 caption
        --d9-caption-font-color: var(--f1-label-color);
        // d9 form cell invalid message
        --d9-form-cell-invalid-message-height: 22px;
        --d9-form-cell-invalid-message-padding: 4px;
        --d9-form-cell-invalid-message-font-size: 0.8em;
        --d9-form-cell-invalid-message-font-weight: 600;
        --d9-form-cell-invalid-message-color: var(--d9-danger-color);

        // workbench
        --f1-wb-border-color: #d5d5d5;
        --f1-wb-bar-background-color: #f2f2f2;
        --f1-wb-location-bar-height: 32px;
        --f1-wb-location-segment-icon-color: #292d32;
        --f1-wb-location-segment-hover-color: #dfdfdf;
        --f1-wb-side-bar-width: 40px;
        --f1-wb-side-bar-button-hover-color: #d1d1d1;
        --f1-wb-side-bar-button-icon-color: #292d32;
        --f1-wb-side-bar-button-active-color: #292d32;
        --f1-wb-side-bar-button-active-background-color: #d1d1d1;
        --f1-wb-side-bar-button-tooltip-background-color: #f7f7f7;
        --f1-wb-side-bar-button-tooltip-shadow: 0px 0px 10px 3px #c3c3c3;
        --f1-wb-status-bar-height: 28px;
        --f1-wb-side-frame-header-height: 40px;
        --f1-wb-side-frame-header-background-color: #f2f2f2;
        --f1-wb-side-frame-header-button-hover-color: #d1d1d1;
        --f1-wb-side-frame-header-button-icon-color: #292d32;
        --f1-wb-side-frame-header-button-tooltip-background-color: #f7f7f7;
        --f1-wb-side-frame-header-button-tooltip-shadow: 0px 0px 10px 3px #c3c3c3;

        color: var(--f1-font-color);
        background-color: var(--f1-background-color);
    }

    div[data-v-scroll],
    div[data-h-scroll] {
        &::-webkit-scrollbar {
            background-color: transparent;
            height: 6px;
            width: 4px;
        }

        &::-webkit-scrollbar-track {
            background-color: var(--f1-scroll-background-color);
            border-radius: 2px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--f1-scroll-thumb-color);
            border-radius: 2px;
        }
    }

    div[data-w=dialog-body] {
        &[data-flex-column=true] {
            display: flex;
            position: relative;
            flex-direction: column;

            div[data-w=d9-dropdown] {
                width: unset;
            }
        }

        span[data-w=dialog-label] > span[data-w=dialog-label] {
            display: block;
            position: relative;
        }
    }

    div[data-w=dialog-footer] {
        margin-top: 32px;
    }

    span[data-hierarchy-slash] {
        opacity: 0.7;
        font-weight: 600;
        font-size: 0.6em;
        margin: 4px 2px 0;
    }

    span[data-w=d9-caption][data-page-title=true] {
        font-size: 2em;
        color: var(--f1-font-color);
    }

    input[data-w=d9-input][readonly] {
        background-color: var(--f1-readonly-color);
        box-shadow: none;

        &:hover,
        &:focus {
            border: var(--d9-border);
            box-shadow: none;
        }

        + span[data-w=d9-deco-tail] {
            z-index: 1;
        }
    }

    @media (prefers-color-scheme: dark) {
        body {
            --f1-background-color: #242424;
            --f1-font-color: #eee;
            --f1-label-color: #c7c7c7;
            --f1-primary-color: #6b95f8;
            --f1-danger-color: #ff7d7d;
            --f1-waive-color: #777;
            --f1-readonly-color: #444;
            --f1-hover-color: #303f4b;
            --f1-disable-color: #444;
            --f1-primary-shadow: 0 0 0 3px ${color('#6b95f8').alpha(0.4).toString()};
            --f1-primary-hover-shadow: 0 0 0 3px ${color('#6b95f8').alpha(0.2).toString()};
            --f1-dialog-shadow: 0 0 18px 6px ${color('#fff').alpha(0.4).toString()};

            --f1-wb-border-color: #1e1f22;
            --f1-wb-bar-background-color: #2b2d30;
            --f1-wb-location-segment-icon-color: #d6d2cd;
            --f1-wb-location-segment-hover-color: #393b40;
            --f1-wb-side-bar-button-hover-color: #4e5156;
            --f1-wb-side-bar-button-icon-color: #d6d2cd;
            --f1-wb-side-bar-button-active-color: #d6d2cd;
            --f1-wb-side-bar-button-active-background-color: #4e5156;
            --f1-wb-side-bar-button-tooltip-background-color: #393b40;
            --f1-wb-side-bar-button-tooltip-shadow: 0px 0px 10px 3px #1a1c1d;
            --f1-wb-side-frame-header-background-color: #2b2d30;
            --f1-wb-side-frame-header-button-hover-color: #4e5156;
            --f1-wb-side-frame-header-button-icon-color: #d6d2cd;
            --f1-wb-side-frame-header-button-tooltip-background-color: #393b40;
            --f1-wb-side-frame-header-button-tooltip-shadow: 0px 0px 10px 3px #1a1c1d;
        }
    }

    @media (prefers-color-scheme: light) {
    }
`;
