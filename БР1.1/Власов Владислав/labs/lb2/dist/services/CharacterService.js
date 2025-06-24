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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterService = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const data_source_1 = __importDefault(require("../config/data-source"));
const Character_1 = require("../models/Character");
const CharacterDescription_1 = require("../models/CharacterDescription");
const routing_controllers_1 = require("routing-controllers");
const ServicesValidator_1 = require("../validators/ServicesValidator");
const Race_1 = require("../models/Race");
const ItemToCharacter_1 = require("../models/ItemToCharacter");
const Effect_1 = require("../models/Effect");
const Edge_1 = require("../models/Edge");
const Skill_1 = require("../models/Skill");
const EffectToCharacter_1 = require("../models/EffectToCharacter");
const SkillToCharacter_1 = require("../models/SkillToCharacter");
class CharacterService {
    constructor() {
        this._characterRepository = data_source_1.default.getRepository(Character_1.Character);
        this._descriptionRepository = data_source_1.default.getRepository(CharacterDescription_1.CharacterDescription);
        this._raceRepository = data_source_1.default.getRepository(Race_1.Race);
        this._itemToCharRepository = data_source_1.default.getRepository(ItemToCharacter_1.ItemToCharacter);
        this._effectRepository = data_source_1.default.getRepository(Effect_1.Effect);
        this._edgeRepository = data_source_1.default.getRepository(Edge_1.Edge);
        this._skillRepository = data_source_1.default.getRepository(Skill_1.Skill);
        this._effectToCharRepository = data_source_1.default.getRepository(EffectToCharacter_1.EffectToCharacter);
        this._skillToCharRepository = data_source_1.default.getRepository(SkillToCharacter_1.SkillToCharacter);
        this._validator = new ServicesValidator_1.ServicesValidator();
    }
    createCharacter(createCharacter) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdCharacter = this._characterRepository.create(createCharacter);
            createdCharacter.description = this._descriptionRepository.create();
            if (createdCharacter.isWildCard) {
                createdCharacter.hp = 3;
            }
            else {
                createdCharacter.hp = 1;
            }
            yield this._descriptionRepository.save(createdCharacter.description);
            return yield this._characterRepository.save(createdCharacter);
        });
    }
    getCharacter(ownerId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const characterDB = yield this._characterRepository.findOne({
                where: { id },
                relations: {
                    description: true,
                    skills: { skill: true },
                    edges: true,
                    effects: { effect: true },
                    items: { item: true }
                }
            });
            if (!characterDB) {
                throw new routing_controllers_1.HttpError(404, 'Character not found!');
            }
            this._validator.isCharacterAvalible(ownerId, characterDB);
            return characterDB;
        });
    }
    getMyCharacters(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const charactersDB = yield this._characterRepository.find({ where: { playerId: ownerId } });
            return charactersDB;
        });
    }
    getOtherCharacters(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const charactersDB = yield this._characterRepository.find({
                where: {
                    playerId: (0, typeorm_1.Not)(ownerId),
                    isVisible: true
                }
            });
            return charactersDB;
        });
    }
    updateCharacter(ownerId, id, updateCharacterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatingCharacter = yield this._characterRepository.findOne({
                where: { id },
                relations: ['description'],
            });
            if (!updatingCharacter) {
                throw new routing_controllers_1.HttpError(404, 'Character not found!');
            }
            this._validator.isCharacterAvalible(ownerId, updatingCharacter);
            const { description } = updateCharacterDto, characterData = __rest(updateCharacterDto, ["description"]);
            Object.assign(updatingCharacter, characterData);
            if (description) {
                Object.assign(updatingCharacter.description, description);
            }
            return yield this._characterRepository.save(updatingCharacter);
        });
    }
    deleteCharacter(ownerId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletingCharacter = yield this._characterRepository.findOneBy({ id });
            if (!deletingCharacter) {
                throw new routing_controllers_1.HttpError(404, 'Character not found!');
            }
            this._validator.isCharacterAvalible(ownerId, deletingCharacter);
            return yield this._characterRepository.delete(id);
        });
    }
    setRace(ownerId, id, raceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const race = yield this._raceRepository.findOneBy({ id: raceId });
            if (!race) {
                throw new routing_controllers_1.HttpError(404, 'Race not found!');
            }
            const character = yield this._characterRepository.findOneBy({ id });
            if (!character) {
                throw new routing_controllers_1.HttpError(404, 'Character not found!');
            }
            this._validator.isCharacterAvalible(ownerId, character);
            character.race = race;
            yield this._characterRepository.save(character);
        });
    }
    setVisibleStatus(ownerId, id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const character = yield this._characterRepository.findOneBy({ id });
            if (!character) {
                throw new routing_controllers_1.HttpError(404, 'Character not found!');
            }
            this._validator.isCharacterAvalible(ownerId, character);
            character.isVisible = status;
            yield this._characterRepository.save(character);
        });
    }
    giveItems(ownerId, charId, itemsId) {
        return __awaiter(this, void 0, void 0, function* () {
            const character = yield this._characterRepository.findOneBy({ id: charId });
            this._validator.isCharacterAvalible(ownerId, character);
            this._validator.isItemExist(itemsId);
            for (const id of itemsId) {
                const itemByCharacter = this._itemToCharRepository.create({
                    itemId: id,
                    characterId: charId
                });
                yield this._itemToCharRepository.save(itemByCharacter);
            }
        });
    }
    changeItemStatus(ownerId, charId, itemId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const character = yield this._characterRepository.findOneBy({ id: charId });
            this._validator.isCharacterAvalible(ownerId, character);
            const charactersItem = yield this._itemToCharRepository.findOneBy({ id: itemId });
            console.log(itemId);
            if (!charactersItem) {
                throw new routing_controllers_1.HttpError(404, 'ItemByCharacter not found!');
            }
            charactersItem.status = status;
            yield this._itemToCharRepository.save(charactersItem);
        });
    }
    giveEffects(ownerId, charId, effectsId) {
        return __awaiter(this, void 0, void 0, function* () {
            const character = yield this._characterRepository.findOneBy({ id: charId });
            this._validator.isCharacterAvalible(ownerId, character);
            this._validator.isEffectExist(effectsId);
            for (const id of effectsId) {
                const effectsCharacter = this._effectToCharRepository.create({
                    effectId: id,
                    characterId: charId
                });
                yield this._effectToCharRepository.save(effectsCharacter);
            }
        });
    }
    giveEdges(ownerId, charId, edgesId) {
        return __awaiter(this, void 0, void 0, function* () {
            this._validator.isEdgeExist(edgesId);
            const character = yield this._characterRepository.findOne({ where: { id: charId }, relations: ['edges'] });
            if (!character) {
                throw new routing_controllers_1.HttpError(404, 'Character not found!');
            }
            this._validator.isCharacterAvalible(ownerId, character);
            for (const id of edgesId) {
                const edge = yield this._edgeRepository.findOneBy({ id });
                character.edges.push(edge);
            }
            yield this._characterRepository.save(character);
        });
    }
    giveSkills(ownerId, charId, skillsId) {
        return __awaiter(this, void 0, void 0, function* () {
            const character = yield this._characterRepository.findOneBy({ id: charId });
            this._validator.isCharacterAvalible(ownerId, character);
            for (const id of skillsId) {
                const skillsCharacter = this._skillToCharRepository.create({
                    skillId: id,
                    characterId: charId
                });
                yield this._skillToCharRepository.save(skillsCharacter);
            }
        });
    }
    upSkill(ownerId, skillToCharId, level) {
        return __awaiter(this, void 0, void 0, function* () {
            const skillByChar = yield this._skillToCharRepository.findOne({
                where: { id: skillToCharId },
                relations: ["character"]
            });
            if (!skillByChar) {
                throw new routing_controllers_1.HttpError(404, 'SkillByChar not found!');
            }
            this._validator.isCharacterAvalible(ownerId, skillByChar.character);
            skillByChar.level = level;
            yield this._skillToCharRepository.save(skillByChar);
        });
    }
    deleteItems(ownerId, itemsByCharId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (itemsByCharId.length) {
                const item = yield this._itemToCharRepository.findOne({
                    where: { id: itemsByCharId[0] },
                    relations: { character: true }
                });
                this._validator.isCharacterAvalible(ownerId, item.character);
            }
            for (const itemId of itemsByCharId) {
                const item = yield this._itemToCharRepository.findOneBy({ id: itemId });
                if (!item) {
                    throw new routing_controllers_1.HttpError(404, 'ItemByChar not found!');
                }
                yield this._itemToCharRepository.delete(itemId);
            }
        });
    }
    deleteEffects(ownerId, effectsByCharId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (effectsByCharId.length) {
                const effect = yield this._effectToCharRepository.findOne({
                    where: { id: effectsByCharId[0] },
                    relations: { character: true }
                });
                this._validator.isCharacterAvalible(ownerId, effect.character);
            }
            for (const effectId of effectsByCharId) {
                const effect = yield this._effectToCharRepository.findOneBy({ id: effectId });
                if (!effect) {
                    throw new routing_controllers_1.HttpError(404, 'ItemByChar not found!');
                }
                yield this._effectToCharRepository.delete(effectId);
            }
        });
    }
    deleteEdges(ownerId, charId, edgesId) {
        return __awaiter(this, void 0, void 0, function* () {
            const char = yield this._characterRepository.findOne({
                where: { id: charId },
                relations: ['edges'],
            });
            if (!char) {
                throw new routing_controllers_1.HttpError(404, 'ItemByChar not found!');
            }
            this._validator.isCharacterAvalible(ownerId, char);
            char.edges = char.edges.filter((edge) => {
                return !edgesId.includes(edge.id);
            });
            yield this._characterRepository.save(char);
        });
    }
    deleteSkills(ownerId, skillsByCharId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (skillsByCharId.length) {
                const skill = yield this._skillToCharRepository.findOne({
                    where: { id: skillsByCharId[0] },
                    relations: { character: true }
                });
                this._validator.isCharacterAvalible(ownerId, skill.character);
            }
            for (const skillId of skillsByCharId) {
                const skill = yield this._skillToCharRepository.findOneBy({ id: skillId });
                if (!skill) {
                    throw new routing_controllers_1.HttpError(404, 'ItemByChar not found!');
                }
                yield this._skillToCharRepository.delete(skillId);
            }
        });
    }
    getCharEffects(ownerId, charId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const character = yield this._characterRepository.findOneBy({ id: charId });
            this._validator.isCharacterAvalible(ownerId, character);
            const itemEffects = yield this._effectRepository
                .createQueryBuilder('effect')
                .innerJoin('item_effects_effect', 'item_effects', 'item_effects.effectId = effect.id')
                .innerJoin('item', 'item', 'item.id = item_effects.itemId')
                .innerJoin('item.characters', 'charactersItem')
                .innerJoin('charactersItem.character', 'character')
                .where('effect.type = :type', { type })
                .andWhere('character.id = :charId', { charId })
                .andWhere('charactersItem.status = :status', { status: "equipped" })
                .leftJoinAndSelect('effect.conditions', 'conditions')
                .getMany();
            const edgeEffects = yield this._effectRepository
                .createQueryBuilder('effect')
                .where('effect.type = :type', { type })
                .innerJoin('edge_effects_effect', 'edge_effects', 'edge_effects.effectId = effect.id')
                .innerJoin('edge', 'edge', 'edge.id = edge_effects.edgeId')
                .innerJoin('character_edges_edge', 'character_edges', 'character_edges.edgeId = edge.id')
                .innerJoin('character', 'character', 'character.id = character_edges.characterId')
                .andWhere('character.id = :charId', { charId })
                .leftJoinAndSelect('effect.conditions', 'conditions')
                .getMany();
            const raceEdgeEffects = yield this._effectRepository
                .createQueryBuilder('effect')
                .where('effect.type = :type', { type })
                .innerJoin('edge_effects_effect', 'edge_effects', 'edge_effects.effectId = effect.id')
                .innerJoin('edge', 'edge', 'edge.id = edge_effects.edgeId')
                .innerJoin('race_edges_edge', 'race_edges', 'race_edges.edgeId = edge.id')
                .innerJoin('race', 'race', 'race.id = race_edges.raceId')
                .innerJoin('character', 'character', 'character.raceId = race.id')
                .andWhere('character.id = :charId', { charId })
                .leftJoinAndSelect('effect.conditions', 'conditions')
                .getMany();
            const directEffects = yield this._effectRepository
                .createQueryBuilder('effect')
                .where('effect.type = :type', { type })
                .innerJoin('effect_to_character', 'characterEffect', 'characterEffect.effectId = effect.id')
                .innerJoin('characterEffect.character', 'character')
                .andWhere('character.id = :charId', { charId })
                .leftJoinAndSelect('effect.conditions', 'conditions')
                .getMany();
            return [...itemEffects, ...edgeEffects, ...raceEdgeEffects, ...directEffects];
        });
    }
}
exports.CharacterService = CharacterService;
