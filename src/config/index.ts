import express, { Application } from 'express';
import morgan from 'morgan';
import { Routes } from '../routes/index';
import cors from 'cors';

export class App {
    public routePrv: Routes = new Routes();
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(cors({
            origin: 'http://localhost:4200', // Asegúrate de que esto esté correcto
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }));
        this.app.use(express.json()); // leer json raw
        this.app.use(express.urlencoded({ extended: false })); // leer json form
    }

    routes() {
        this.routePrv.clienteRoutes.routes(this.app);
         this.routePrv.productoRoutes.routes(this.app);
         this.routePrv.tipoProductoRoutes.routes(this.app);
         this.routePrv.ventaRoutes.routes(this.app);
         //this.routePrv.productVentaRoutes.routes(this.app);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}





