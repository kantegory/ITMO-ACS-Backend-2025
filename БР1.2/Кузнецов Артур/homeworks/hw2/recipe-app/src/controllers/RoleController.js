"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.updateRole = exports.getRole = exports.getRoles = exports.createRole = void 0;
const AppDataSource_1 = require("../config/AppDataSource");
const Roles_1 = require("../models/Roles");
const roleRepository = AppDataSource_1.AppDataSource.getRepository(Roles_1.Roles);
// Создание новой роли
const createRole = async function (req, res) {
    try {
        const roleData = req.body;
        const role = roleRepository.create(roleData);
        const savedRole = await roleRepository.save(role);
        res.status(201).json(savedRole);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createRole = createRole;
// Получение всех ролей
const getRoles = async function (_req, res) {
    try {
        const roles = await roleRepository.find();
        res.json(roles);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRoles = getRoles;
// Получение одной роли по id
const getRole = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const role = await roleRepository.findOneBy({ id: id });
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.json(role);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRole = getRole;
// Обновление роли
const updateRole = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
        const result = await roleRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.json({ message: "Role updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateRole = updateRole;
// Удаление роли
const deleteRole = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const result = await roleRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteRole = deleteRole;
