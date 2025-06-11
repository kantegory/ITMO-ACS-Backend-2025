const requiredEnvVariables = [
    "JWT_SECRET",
    "DB_HOST",
    "DB_PORT",
    "DB_USERNAME",
    "DB_PASSWORD",
    "DB_NAME",
    "PORT",
];

export const checkEnvVariables = () => {
    const missingEnvVariables = requiredEnvVariables.filter(
        (variable) => !process.env[variable]
    );

    if (missingEnvVariables.length > 0) {
        console.error(
            `Missing required environment variables: ${missingEnvVariables.join(", ")}`
        );
        process.exit(1);
    }
};