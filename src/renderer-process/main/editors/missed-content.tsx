import {ButtonFill, UnwrappedButton} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import {isNotBlank} from '../../../shared';
import {Resource} from '../opened/types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../opened/workbench/event-bus';
import {EditorMissedContentMessage, EditorMissedContentReminder} from './widgets';

export interface MissedContentProps {
	resource: Resource;
	message?: string;
	closable?: boolean;
	children: ReactNode;
}

export const MissedContent = (props: MissedContentProps) => {
	const {resource, message, closable = true, children} = props;

	const {fire} = useWorkbenchEventBus();

	if (isNotBlank(message)) {
		const onCloseClicked = () => {
			fire(WorkbenchEventTypes.ASK_CLOSE_RESOURCE, resource);
		};
		return <EditorMissedContentReminder>
			<EditorMissedContentMessage>{message}</EditorMissedContentMessage>
			{closable
				? <UnwrappedButton onClick={onCloseClicked} fill={ButtonFill.LINK}>Close This Editor</UnwrappedButton>
				: null}
		</EditorMissedContentReminder>;
	} else {
		return <>{children}</>;
	}
};