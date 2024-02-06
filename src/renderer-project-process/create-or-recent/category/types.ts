import {DropdownOption} from '@rainbow-d9/n2';

export interface RecentProjectCategoryCandidate extends DropdownOption {
	parentCategoryIds: Array<string>;
}
