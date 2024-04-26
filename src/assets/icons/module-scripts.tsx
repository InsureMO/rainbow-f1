import React, {SVGProps} from 'react';

export const ModuleScriptsIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="f1-module-scripts" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
	            fill="none">
		<path opacity="0.5"
		      d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
		      stroke="currentColor" strokeWidth="1.5" fill="none"/>
		<path d="M10 16H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M14 13H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M14 16H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M9.5 13H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M18 16H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M6 13H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
	</svg>;
};
