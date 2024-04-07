import {DropdownOption} from '@rainbow-d9/n2';
import {RecentProjectEntityId} from '../../../../shared';

export interface RecentProjectCategoryCandidate extends DropdownOption {
	value: RecentProjectEntityId;
	parentCategoryIds: Array<RecentProjectEntityId>;
}
