import React, {SVGProps} from 'react';

export const ModuleEnvFileIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="f1-module-env-file" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path opacity="0.4"
		      d="M17.625 21.0002C18.2666 20.4299 19.2334 20.4299 19.875 21.0002C20.3109 21.3876 21 21.0782 21 20.495V3.50519C21 2.92196 20.3109 2.61251 19.875 2.99999C19.2334 3.57029 18.2666 3.57029 17.625 2.99999C16.9834 2.42969 16.0166 2.42969 15.375 2.99999C14.7334 3.57029 13.7666 3.57029 13.125 2.99999C12.4834 2.42969 11.5166 2.42969 10.875 2.99999C10.2334 3.57029 9.26659 3.57029 8.625 2.99999C7.98341 2.42969 7.01659 2.42969 6.375 2.99999C5.73341 3.57029 4.76659 3.57029 4.125 2.99999C3.68909 2.61251 3 2.92196 3 3.50519V20.495C3 21.0782 3.68909 21.3876 4.125 21.0002C4.76659 20.4299 5.73341 20.4299 6.375 21.0002C7.01659 21.5705 7.98341 21.5705 8.625 21.0002C9.26659 20.4299 10.2334 20.4299 10.875 21.0002C11.5166 21.5705 12.4834 21.5705 13.125 21.0002C13.7666 20.4299 14.7334 20.4299 15.375 21.0002C16.0166 21.5705 16.9834 21.5705 17.625 21.0002Z"
		      stroke="currentColor" strokeWidth="1.5" fill="none"/>
		<path d="M7.5 15.5H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M7.5 12H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M7.5 8.5H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
	</svg>;
};
