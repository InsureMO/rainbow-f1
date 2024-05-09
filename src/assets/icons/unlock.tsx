import React, {SVGProps} from 'react';

export const UnlockIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="f1-unlock" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M11 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path
			d="M6 10V8C6 7.65929 6.0284 7.32521 6.08296 7M17.811 6.5C17.1449 3.91216 14.7958 2 12 2C10.223 2 8.62643 2.7725 7.52779 4"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
	</svg>;
};
