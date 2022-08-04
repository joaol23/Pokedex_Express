export const formatLog = (printf: any) => printf(({ level, message, label, timestamp }: { level: string, message: string, label: string, timestamp: string }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

export const NAME_LOG = "API POKEDEX";
