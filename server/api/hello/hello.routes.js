import { Router } from 'express';
import * as HelloController from './hello.controller';

const router = new Router();

router.get('/', HelloController.getGreeting);

module.exports = router;
