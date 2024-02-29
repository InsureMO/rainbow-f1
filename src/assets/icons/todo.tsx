import React, {SVGProps} from 'react';

export const TodoIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="f1-todo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fillRule="evenodd" clipRule="evenodd"
		      d="M11.9426 1.25H12.0574C14.3658 1.24999 16.1748 1.24998 17.5863 1.43975C19.031 1.63399 20.1711 2.03933 21.0659 2.93414C21.9607 3.82895 22.366 4.96897 22.5603 6.41371C22.75 7.82519 22.75 9.63423 22.75 11.9426V12.0574C22.75 14.3658 22.75 16.1748 22.5603 17.5863C22.366 19.031 21.9607 20.1711 21.0659 21.0659C20.1711 21.9607 19.031 22.366 17.5863 22.5603C16.1748 22.75 14.3658 22.75 12.0574 22.75H11.9426C9.63423 22.75 7.82519 22.75 6.41371 22.5603C4.96897 22.366 3.82895 21.9607 2.93414 21.0659C2.03933 20.1711 1.63399 19.031 1.43975 17.5863C1.24998 16.1748 1.24999 14.3658 1.25 12.0574V11.9426C1.24999 9.63423 1.24998 7.82519 1.43975 6.41371C1.63399 4.96897 2.03933 3.82895 2.93414 2.93414C3.82895 2.03933 4.96897 1.63399 6.41371 1.43975C7.82519 1.24998 9.63423 1.24999 11.9426 1.25ZM6.61358 2.92637C5.33517 3.09825 4.56445 3.42514 3.9948 3.9948C3.42514 4.56445 3.09825 5.33517 2.92637 6.61358C2.75159 7.91356 2.75 9.62177 2.75 12C2.75 14.3782 2.75159 16.0864 2.92637 17.3864C3.09825 18.6648 3.42514 19.4355 3.9948 20.0052C4.56445 20.5749 5.33517 20.9018 6.61358 21.0736C7.91356 21.2484 9.62177 21.25 12 21.25C14.3782 21.25 16.0864 21.2484 17.3864 21.0736C18.6648 20.9018 19.4355 20.5749 20.0052 20.0052C20.5749 19.4355 20.9018 18.6648 21.0736 17.3864C21.2484 16.0864 21.25 14.3782 21.25 12C21.25 9.62177 21.2484 7.91356 21.0736 6.61358C20.9018 5.33517 20.5749 4.56445 20.0052 3.9948C19.4355 3.42514 18.6648 3.09825 17.3864 2.92637C16.0864 2.75159 14.3782 2.75 12 2.75C9.62177 2.75 7.91356 2.75159 6.61358 2.92637ZM10.5172 6.4569C10.8172 6.74256 10.8288 7.21729 10.5431 7.51724L7.68596 10.5172C7.5444 10.6659 7.34812 10.75 7.14286 10.75C6.9376 10.75 6.74131 10.6659 6.59975 10.5172L5.4569 9.31724C5.17123 9.01729 5.18281 8.54256 5.48276 8.2569C5.78271 7.97123 6.25744 7.98281 6.5431 8.28276L7.14286 8.9125L9.4569 6.48276C9.74256 6.18281 10.2173 6.17123 10.5172 6.4569ZM12.25 9C12.25 8.58579 12.5858 8.25 13 8.25H18C18.4142 8.25 18.75 8.58579 18.75 9C18.75 9.41421 18.4142 9.75 18 9.75H13C12.5858 9.75 12.25 9.41421 12.25 9ZM10.5172 13.4569C10.8172 13.7426 10.8288 14.2173 10.5431 14.5172L7.68596 17.5172C7.5444 17.6659 7.34812 17.75 7.14286 17.75C6.9376 17.75 6.74131 17.6659 6.59975 17.5172L5.4569 16.3172C5.17123 16.0173 5.18281 15.5426 5.48276 15.2569C5.78271 14.9712 6.25744 14.9828 6.5431 15.2828L7.14286 15.9125L9.4569 13.4828C9.74256 13.1828 10.2173 13.1712 10.5172 13.4569ZM12.25 16C12.25 15.5858 12.5858 15.25 13 15.25H18C18.4142 15.25 18.75 15.5858 18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H13C12.5858 16.75 12.25 16.4142 12.25 16Z"
		      fill="currentColor"/>
	</svg>;
};
