export const formatLog = (printf) => printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

export const NAME_LOG = "API POKEDEX";