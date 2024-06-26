import React, {SVGProps} from 'react';

export const SourceFileIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="f1-source-file" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path opacity="0.4"
		      d="M8.92969 2L8.95969 3.53003C8.97969 4.34003 9.64969 5 10.4597 5H13.4797C14.3097 5 14.9797 4.32 14.9797 3.5V2"
		      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		<path opacity="0.4" d="M17 17L15 19L17 21" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
		      strokeLinecap="round" strokeLinejoin="round"/>
		<path opacity="0.4" d="M20 17L22 19L20 21" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
		      strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M13 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7V14" stroke="currentColor"
		      strokeWidth="1.5"
		      strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
	</svg>;
};
