import { App } from './config/index';
import cors from 'cors';

async function main() {
    const app = new App(4000);
    
    // Habilitar CORS
    app.app.use(cors({
        origin: 'http://localhost:4200', // Asegúrate de que esto esté correcto
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }));
    
    await app.listen();
}

main();
