"use strict";

import Model from "./src/model.js";
import View from "./src/view.js";
import Service from "./src/service.js";
import Controller from "./src/controller.js";

const model = new Model;
const view = new View;
const service = new Service;
const controller = new Controller (model, view, service);
