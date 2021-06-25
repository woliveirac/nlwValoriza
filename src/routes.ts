import { Router } from "express";
import {CreateUserController} from "./controllers/CreateUserController";
import {CreateTagController} from "./controllers/CreateTagController";
import {ensureAdmin} from "./middlewares/ensureAdmin";
import {AuthenticateUserController} from "./controllers/AuthenticateUserController";
import {CreateComplimentController} from "./controllers/CreateComplimentController";
import {ensureAuthenticated} from "./middlewares/ensureAuthenticated";
import {ListUserReceiverComplimentController} from "./controllers/ListUserReceiverComplimentController";
import {ListUserSenderComplimentController} from "./controllers/ListUserSenderComplimentController";
import {ListTagController} from "./controllers/ListTagController";
import {ListUsersController} from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

const listUserReceiverComplimentController = new ListUserReceiverComplimentController();
const listUserSenderComplimentController = new ListUserSenderComplimentController();

const listTagController = new ListTagController();
const listUsersController = new ListUsersController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/sent", ensureAuthenticated,listUserSenderComplimentController.handle)
router.get("/users/compliments/received", ensureAuthenticated,listUserReceiverComplimentController.handle)
router.get("/tags", ensureAuthenticated,listTagController.handle)
router.get("/users", ensureAuthenticated,listUsersController.handle)


export { router };

