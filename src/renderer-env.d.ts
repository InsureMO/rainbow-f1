import {ElectronBridges} from './shared';

declare global {
	type Undefinable<T> = T | undefined;
	type Nullable<T> = T | null | undefined;
	type ElementOfArray<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
	type ErrorMessage = string;
	type MightBeError<T> = [T, ErrorMessage] | [T];

	interface Window {
		electron: ElectronBridges.WindowElectronBridge;
	}
}
