import React, {SVGProps} from 'react';

export const FolderClosed = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="folder-closed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		<path
			d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H289.9L247 53.1C233.5 39.6 215.2 32 196.1 32H64zM48 96c0-8.8 7.2-16 16-16H196.1c6.4 0 12.5 2.5 17 7l45.3 45.3c7.5 7.5 17.7 11.7 28.3 11.7H448c8.8 0 16 7.2 16 16v32H48V96zm0 144H464V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V240z"/>
	</svg>;
};
