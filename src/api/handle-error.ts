const DEFAULT_ERROR_MESSAGE = 'unknown error';

export const getMessage = (err?: unknown): string => err instanceof Error ? err.message : DEFAULT_ERROR_MESSAGE;
