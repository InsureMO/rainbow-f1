import React, {SVGProps} from 'react';

export const ModuleEnvIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="f1-module-env" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path
			d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
			stroke="currentColor" strokeWidth="1.5" fill="none"/>
		<path opacity="0.5" d="M21.5 8H2.5M7 8L10.5 2.5M13.5 8L17 2.5" stroke="currentColor" strokeWidth="1.5"
		      strokeLinecap="round" fill="none"/>
	</svg>;
};
