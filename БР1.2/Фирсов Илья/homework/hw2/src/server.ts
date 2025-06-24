import { App } from './app';

new App()
    .start()
    .catch(err => {
        console.error('❌ Failed to start server', err);
        process.exit(1);
    });