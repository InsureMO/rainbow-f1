import React, {SVGProps} from 'react';

export const WebpackIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="f1-webpack" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<radialGradient id="f1-webpack-style-1" cx="-236.884" cy="-171.086" r="0.006"
			                gradientTransform="matrix(2157.515, 0, 0, -2491.283, 511096.688, -426208.482)"
			                gradientUnits="userSpaceOnUse">
				<stop offset="0" stopColor="#93b4e7"/>
				<stop offset="0.593" stopColor="#b9d1f8"/>
				<stop offset="1" stopColor="#9cb6e0"/>
			</radialGradient>
		</defs>
		<path d="M16,2.043,3.9,9.032V23.011L16,30l12.106-6.989V9.032Z" fill="url(#f1-webpack-style-1)"/>
		<path d="M16,9.133,10,12.6v6.932L16,23l6-3.466V12.6Z" fill="#6f95db"/>
		<path d="M16,2,3.869,9.037,16,15.642,28.131,9.08Zm0,14.548L3.869,22.981,16,29.974l12.088-7.037L16,16.548Z"
		      fill="none" fillOpacity="0.1"/>
	</svg>;
};
