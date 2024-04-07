export interface FileSystemOperationResult<R> {
	success: boolean;
	/** return value when success */
	ret?: R;
	/** message when error rises */
	message?: string;
}

export interface FileSystemBooleanResult extends FileSystemOperationResult<boolean> {
}

export interface FileSystemFoldersResult extends FileSystemOperationResult<Array<string>> {
}

export enum FileSystemEvent {
	EXISTS = 'fs-exists',
	EMPTY = 'fs-empty',
	MKDIR = 'fs-mkdir',
	CREATE_FILE = 'fs-create-file',
}
