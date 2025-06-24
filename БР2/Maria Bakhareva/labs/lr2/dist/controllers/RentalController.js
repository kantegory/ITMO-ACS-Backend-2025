"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalController = void 0;
const databaseConfig_1 = require("../config/databaseConfig");
const Rental_1 = require("../entities/Rental");
const BaseController_1 = require("./BaseController");
exports.RentalController = new BaseController_1.BaseController(databaseConfig_1.AppDataSource.getRepository(Rental_1.Rental));
