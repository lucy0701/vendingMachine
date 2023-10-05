"use strict";

import LocalStorageController from "./src/localStorageController.js";
import Model from "./src/model.js";
import View from "./src/view.js";
import Controller from "./src/controller.js";

const localStorageController = new LocalStorageController;
const model = new Model (localStorageController);
const view = new View;
const controller = new Controller (localStorageController, model, view );
