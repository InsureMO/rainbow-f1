import {
	ButtonBarAlignment,
	ButtonFill,
	ButtonInk,
	DOM_KEY_WIDGET,
	UnwrappedButton,
	UnwrappedButtonBar
} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {MainEventTypes, useMainEventBus} from '../event-bus';

const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-ask-project-failed-container'})`
    display: flex;
    position: relative;
    width: 768px;
    height: 100vh;
    align-items: center;
    justify-content: center;
    margin: auto;

    > div {
        display: grid;
        position: relative;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto 1fr;
        width: 768px;
        padding: 32px 32px 16px;
        border: var(--f1-border);
        border-radius: calc(var(--f1-border-radius) * 2);

        > span:first-child {
            font-size: 2em;
        }

        > span:nth-child(2) {
            opacity: 0.7;
        }
    }
`;
export const Failed = () => {
	const {fire} = useMainEventBus();
	const [failure, setFailure] = useState('');
	useEffect(() => {
		const onAskProjectFailure = (message: string) => {
			setFailure(message);
		};
		fire(MainEventTypes.ASK_PROJECT_FAILURE, onAskProjectFailure);
	}, [fire]);

	const onCloseClicked = () => {
		// TODO ASK CLOSE THIS WINDOW SINCE FAILED TO LOAD PROJECT
	};

	return <Container>
		<div>
			<span>Failed to load project</span>
			<span>{failure}</span>
			<UnwrappedButtonBar alignment={ButtonBarAlignment.RIGHT}>
				<UnwrappedButton onClick={onCloseClicked} ink={ButtonInk.WAIVE} fill={ButtonFill.FILL}>
					Close project
				</UnwrappedButton>
			</UnwrappedButtonBar>
		</div>
	</Container>;
};
