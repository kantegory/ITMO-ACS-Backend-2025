"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    constructor(repository) {
        this.repository = repository;
        this.getAll = async (_req, res) => {
            try {
                const items = await this.repository.find();
                res.json(items);
            }
            catch (err) {
                res.status(500).json({ message: 'Server error', error: err });
            }
        };
        this.getById = async (req, res) => {
            try {
                const id = +req.params.id;
                const item = await this.repository.findOneBy({
                    [this.repository.metadata.primaryColumns[0].propertyName]: id,
                });
                if (!item) {
                    res.status(404).json({ message: 'Not found' });
                }
                res.json(item);
            }
            catch (err) {
                res.status(500).json({ message: 'Server error', error: err });
            }
        };
        this.create = async (req, res) => {
            try {
                const newItem = this.repository.create(req.body);
                const saved = await this.repository.save(newItem);
                res.status(201).json(saved);
            }
            catch (err) {
                res.status(400).json({ message: 'Create failed', error: err });
            }
        };
        this.update = async (req, res) => {
            try {
                const id = +req.params.id;
                await this.repository.update(id, req.body);
                const updated = await this.repository.findOneBy({
                    [this.repository.metadata.primaryColumns[0].propertyName]: id,
                });
                res.json(updated);
            }
            catch (err) {
                res.status(400).json({ message: 'Update failed', error: err });
            }
        };
        this.delete = async (req, res) => {
            try {
                await this.repository.delete(+req.params.id);
                res.status(204).send();
            }
            catch (err) {
                res.status(500).json({ message: 'Delete failed', error: err });
            }
        };
        this.createMessage = async (req, res) => { };
    }
}
exports.BaseController = BaseController;
