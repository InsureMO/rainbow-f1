import {ReactNode} from 'react';
import {isNotBlank} from '../../../shared';

export interface MissedContentProps {
	message?: string;
	children: ReactNode;
}

export const MissedContent = (props: MissedContentProps) => {
	const {message, children} = props;

	if (isNotBlank(message)) {
		return null;
	} else {
		return <>{children}</>;
	}
};