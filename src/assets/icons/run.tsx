import React, {SVGProps} from 'react';

export const RunIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="f1-run" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M19.2901 9.1698L7.70015 3.0698C4.95015 1.6198 1.96015 4.5498 3.35015 7.3298L4.97015 10.5698C5.42015 11.4698 5.42015 12.5298 4.97015 13.4298L3.35015 16.6698C1.96015 19.4498 4.95015 22.3698 7.70015 20.9298L19.2901 14.8298C21.5701 13.6298 21.5701 10.3698 19.2901 9.1698Z"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>;
};