export enum ProjectModuleBase {
	BASIC = 'basic',
	D9 = 'd9',
	O23 = 'o23'
}

export interface BaseState {
	base: ProjectModuleBase;
	index: number;
}
