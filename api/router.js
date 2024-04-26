import { Router } from 'express';
import { login, getProfile, checkCode } from "./controllers/auth.controller.js";
import { getDataFrom1C, getMap, saveMap} from "./controllers/schema.controller.js";
import {createProblem} from "./controllers/problems.controller.js";

const router = Router();

router.post('/auth', login);

router.post('/auth/profile', getProfile);

router.post('/auth/check', checkCode);

router.post('/maps/level1', getDataFrom1C);

router.post('/maps', getDataFrom1C);

router.post('/map', getMap);

router.post('/map/save', saveMap);

router.post('/problems', getDataFrom1C);

router.post('/problem/create', getDataFrom1C);

router.post('/problem/update', getDataFrom1C);

router.post('/problem/worker', getDataFrom1C);


export default router;