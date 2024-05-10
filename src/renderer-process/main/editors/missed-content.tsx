import {ButtonFill, UnwrappedButton} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import {isNotBlank} from '../../../shared';
import {Resource} from '../opened/types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../opened/workbench/event-bus';
import {EditorMissedContentMessage, EditorMissedContentReminder} from './widgets';

export interface MissedContentProps {
	resource: Resource;
	message?: string;
	children: ReactNode;
}

export const MissedContent = (props: MissedContentProps) => {
	const {resource, message, children} = props;

	const {fire} = useWorkbenchEventBus();

	if (isNotBlank(message)) {
		const onCloseClicked = () => {
			fire(WorkbenchEventTypes.ASK_CLOSE_RESOURCE, resource);
		};
		return <EditorMissedContentReminder>
			<EditorMissedContentMessage>{message}</EditorMissedContentMessage>
			<UnwrappedButton onClick={onCloseClicked} fill={ButtonFill.LINK}>Close This Editor</UnwrappedButton>
		</EditorMissedContentReminder>;
	} else {
		return <>{children}</>;
	}
};