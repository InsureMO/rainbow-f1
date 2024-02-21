export const isBlank = (value: string | null | undefined): boolean => value == null || `${value}`.trim().length === 0;
export const isNotBlank = (value: string | null | undefined): boolean => !isBlank(value);
