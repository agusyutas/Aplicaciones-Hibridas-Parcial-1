import autoRouter from './autoRouter.js';
import marcaRouter from './marcaRouter.js';
import userRouter from './userRouter.js';

const routerAPI = (app) =>{
    app.use('/api/usuarios', userRouter);
    app.use('/api/autos', autoRouter);
    app.use('/api/marcas', marcaRouter);
}

export default routerAPI;