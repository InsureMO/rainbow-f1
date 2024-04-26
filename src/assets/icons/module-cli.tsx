import React, {SVGProps} from 'react';

export const ModuleCliIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="f1-module-cli" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
	            fill="none">
		<path opacity="0.5"
		      d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
		      stroke="currentColor" strokeWidth="1.5"/>
		<path d="M17 15H14.5H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path
			d="M7 10L7.2344 10.1953C8.51608 11.2634 9.15693 11.7974 9.15693 12.5C9.15693 13.2026 8.51608 13.7366 7.2344 14.8047L7 15"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
	</svg>;
};
