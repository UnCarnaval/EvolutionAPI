import 'express-async-errors';

import { configService } from '@config/env.config';
import { router } from '@api/routes';
import compression from 'compression';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';

const app = express();
const serverConfig = configService.get('SERVER');

app.use(cors({ origin: serverConfig.CORS_ORIGIN, credentials: serverConfig.CORS_CREDENTIALS }));
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(join(process.cwd(), 'public')));
app.use('/', router);

app.listen(serverConfig.PORT, () => {
  console.log(`🚀 Server started on port ${serverConfig.PORT}`);
});