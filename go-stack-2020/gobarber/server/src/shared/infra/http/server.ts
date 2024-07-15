import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import globalErrorHandler from '@shared/infra/http/middlewares/globalErrorHandler';
import routes from '@shared/infra/http/routes';

import { started } from '@utils/logger';

import { DIRECTORY } from '@config/uploading';

import '@config/authentication';
import '@shared/infra/typeorm';
import '@shared/container';

const PORT = 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(DIRECTORY));
app.use(routes);

app.use(globalErrorHandler);

app.listen(PORT, () => started(PORT));
