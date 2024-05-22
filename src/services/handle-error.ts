export const getMessage = (err?: unknown): string => err instanceof Error ? err.message : 'unknown error';
