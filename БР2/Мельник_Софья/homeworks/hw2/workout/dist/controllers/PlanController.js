"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlan = exports.updatePlan = exports.createPlan = exports.getPlanById = exports.getPlans = void 0;
const app_data_source_1 = require("../config/app-data-source");
const Plan_1 = require("../entities/Plan");
const planRepository = app_data_source_1.AppDataSource.getRepository(Plan_1.Plan);
const getPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plans = yield planRepository.find();
    res.json(plans);
});
exports.getPlans = getPlans;
const getPlanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const plan = yield planRepository.findOneBy({ id: Number(id) });
    if (!plan) {
        return res.status(404).json({ message: 'Plan not found' });
    }
    res.json(plan);
});
exports.getPlanById = getPlanById;
const createPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPlan = planRepository.create(req.body);
    const result = yield planRepository.save(newPlan);
    res.status(201).json(result);
});
exports.createPlan = createPlan;
const updatePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield planRepository.update(id, req.body);
    res.json({ message: 'Plan updated' });
});
exports.updatePlan = updatePlan;
const deletePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield planRepository.delete(id);
    res.json({ message: 'Plan deleted' });
});
exports.deletePlan = deletePlan;
