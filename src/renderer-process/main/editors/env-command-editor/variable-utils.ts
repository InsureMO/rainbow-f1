import {EnvVariableValueValidator} from './variable-types';

export const AnyValueAccepted: EnvVariableValueValidator = () => ({success: true});
