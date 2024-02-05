import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {GlobalStyles} from '../renderer-process/global-styles';
import {Logo} from '../renderer-process/icons';

const AboutContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-about'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr auto auto;
    grid-column-gap: 8px;
    padding: 16px 32px;

    > div:first-child {
        grid-column: span 3;
        margin-bottom: 48px;
    }

    > div:first-child {
        display: flex;
        align-items: center;
        justify-content: center;

        > svg {
            height: 300px;
            width: 300px;
        }
    }

    > div:nth-child(3n) {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        opacity: 0.7;
    }

    > div:nth-child(3n+1):not(div:first-child) {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        opacity: 0.5;
        font-size: 0.8em;
    }
`;

export const App = () => {
	return <>
		<GlobalStyles/>
		<AboutContainer>
			<div><Logo/></div>
			<div/>
			<div>electron:</div>
			<div>{window.electron.versions.electron}</div>
			<div/>
			<div>chrome:</div>
			<div>{window.electron.versions.chrome}</div>
			<div/>
			<div>node:</div>
			<div>{window.electron.versions.node}</div>
			<div/>
			<div>v8:</div>
			<div>{window.electron.versions.v8}</div>
		</AboutContainer>
	</>;
};
