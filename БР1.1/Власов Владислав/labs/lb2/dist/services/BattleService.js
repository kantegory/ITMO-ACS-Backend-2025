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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleService = void 0;
require("reflect-metadata");
const Effect_1 = require("../models/Effect");
const CharacterService_1 = require("./CharacterService");
const EffectService_1 = require("./EffectService");
const rollDice_1 = __importDefault(require("../utils/rollDice"));
const Condition_1 = require("../models/Condition");
const updateCharacterDto_1 = require("../dtos/updateCharacterDto");
class BattleService {
    constructor() {
        this._characterService = new CharacterService_1.CharacterService();
        this._effectService = new EffectService_1.EffectService();
    }
    //Атака
    //Вычисляет 2 списка эфектов, актуальных для персонажей
    //Вычисляет бросок навыка (свой + эффекты, влияющие на навык). Кидает на попадание.
    //Высчитывает парирование атакующего (своё + от эфектов, влияющих на "parry")
    //Если попал: Определяет урон (в зависимости от Активных эффектов оружия и персонажа, влияющих на параметр "damage").
    //Вычисляет наывки, снижающие урон ("target", "damage")
    //Высчитывает защиту защищающегося (свой + эффект "toughness" и "armor")
    //Вводит в шок и/или наносит раны
    Attack(ownerId, attackCharId, defenceCharId) {
        return __awaiter(this, void 0, void 0, function* () {
            let damage = 0;
            console.log(damage);
            const conditionTypeOrder = {
                [Condition_1.ConditionType.Triggering]: 1,
                [Condition_1.ConditionType.Effect]: 2,
                [Condition_1.ConditionType.Ending]: 3
            };
            console.log(attackCharId, defenceCharId);
            const attacker = yield this._characterService.getCharacter(ownerId, attackCharId);
            const defencer = yield this._characterService.getCharacter(ownerId, defenceCharId);
            const attackerUniversalEffects = yield this._characterService.getCharEffects(ownerId, attackCharId, Effect_1.EffectType.Universal);
            const defencerUniversalEffects = yield this._characterService.getCharEffects(ownerId, defenceCharId, Effect_1.EffectType.Universal);
            const attackerAttackEffects = yield this._characterService.getCharEffects(ownerId, attackCharId, Effect_1.EffectType.Attact);
            const defencerDefenceEffects = yield this._characterService.getCharEffects(ownerId, defenceCharId, Effect_1.EffectType.Defence);
            //Пусть атакующий навык будет всегда Драка (хотя иногда это стрельба или магический навык)
            const attackingSkill = "fighting";
            //Учитываем бонусы к характеристикам 
            for (let effect of [...attackerUniversalEffects, ...defencerUniversalEffects, ...attackerAttackEffects, ...defencerDefenceEffects]) {
                const conditions = (yield this._effectService.getConditions(effect.id)).sort((a, b) => conditionTypeOrder[a.type] - conditionTypeOrder[b.type]);
                for (let condition of conditions) {
                    if (condition.type == "triggering") {
                        let isCondition = true;
                        if (condition.targetType == "self") {
                            const value = this._countConditionValue(condition.value, attacker);
                            if (condition.parameter in attacker) {
                                switch (condition.operand) {
                                    case ">":
                                        isCondition = (attacker[condition.parameter] > value);
                                        break;
                                    case ">=":
                                        isCondition = (attacker[condition.parameter] >= value);
                                        break;
                                    case "<":
                                        isCondition = (attacker[condition.parameter] < value);
                                        break;
                                    case "<=":
                                        isCondition = (attacker[condition.parameter] <= value);
                                        break;
                                    case "==":
                                        isCondition = (attacker[condition.parameter] == value);
                                        break;
                                }
                            }
                            else if (condition.parameter == "damage") {
                                switch (condition.operand) {
                                    case ">":
                                        isCondition = (damage > value);
                                        break;
                                    case ">=":
                                        isCondition = (damage >= value);
                                        break;
                                    case "<":
                                        isCondition = (damage < value);
                                        break;
                                    case "<=":
                                        isCondition = (damage <= value);
                                        break;
                                    case "==":
                                        isCondition = (damage == value);
                                        break;
                                }
                            }
                        }
                        else {
                            const value = this._countConditionValue(condition.value, defencer);
                            if (condition.parameter in defencer) {
                                switch (condition.operand) {
                                    case ">":
                                        isCondition = (defencer[condition.parameter] > value);
                                        break;
                                    case ">=":
                                        isCondition = (defencer[condition.parameter] >= value);
                                        break;
                                    case "<":
                                        isCondition = (defencer[condition.parameter] < value);
                                        break;
                                    case "<=":
                                        isCondition = (defencer[condition.parameter] <= value);
                                        break;
                                    case "==":
                                        isCondition = (defencer[condition.parameter] == value);
                                        break;
                                }
                            }
                            else if (condition.parameter == "damage") {
                                switch (condition.operand) {
                                    case ">":
                                        isCondition = (damage > value);
                                        break;
                                    case ">=":
                                        isCondition = (damage >= value);
                                        break;
                                    case "<":
                                        isCondition = (damage < value);
                                        break;
                                    case "<=":
                                        isCondition = (damage <= value);
                                        break;
                                    case "==":
                                        isCondition = (damage == value);
                                        break;
                                }
                            }
                        }
                        if (!isCondition) {
                            break;
                        }
                    }
                    else if (condition.type == "effect") {
                        if (condition.targetType == "self") {
                            const value = this._countConditionValue(condition.value, attacker);
                            if (condition.parameter in attacker) {
                                switch (condition.operand) {
                                    case '+':
                                        attacker[condition.parameter] += value;
                                        break;
                                    case '-':
                                        attacker[condition.parameter] -= value;
                                        break;
                                    case '=':
                                        attacker[condition.parameter] = value;
                                        break;
                                }
                            }
                            else if (condition.parameter == "damage") {
                                switch (condition.operand) {
                                    case "+":
                                        damage += value;
                                        break;
                                    case "-":
                                        damage -= value;
                                        break;
                                    case "=":
                                        damage = value;
                                        break;
                                }
                            }
                        }
                        else {
                            const value = this._countConditionValue(condition.value, defencer);
                            if (condition.parameter in defencer) {
                                switch (condition.operand) {
                                    case '+':
                                        defencer[condition.parameter] += value;
                                        break;
                                    case '-':
                                        defencer[condition.parameter] -= value;
                                        break;
                                    case '=':
                                        defencer[condition.parameter] = value;
                                        break;
                                }
                            }
                            else if (condition.parameter == "damage") {
                                switch (condition.operand) {
                                    case "+":
                                        damage += value;
                                        break;
                                    case "-":
                                        damage -= value;
                                        break;
                                    case "=":
                                        damage = value;
                                        break;
                                }
                            }
                        }
                    }
                }
            }
            //Бросок на попадание
            let hitRoll = (0, rollDice_1.default)(Math.max(...attacker.skills.filter((skill) => skill.skillId == 1).map(skill => skill.level)));
            if (attacker.isWildCard) {
                const hitWildRoll = (0, rollDice_1.default)(attacker.wildDice);
                if (hitWildRoll > hitRoll) {
                    hitRoll = hitWildRoll;
                }
            }
            if (hitRoll <= defencer.parry) {
                return;
            }
            console.log(damage);
            let resultArmor = Math.max(defencer.toughness, 0) + Math.max(defencer.armor, 0);
            if (damage > resultArmor) {
                if (!defencer.isShaken) {
                    defencer.isShaken = true;
                    resultArmor += 4;
                }
            }
            while (damage >= resultArmor) {
                defencer.wounds += 1;
                resultArmor += 4;
            }
            if (defencer.wounds > defencer.hp) {
                if ((0, rollDice_1.default)(defencer.vigor) < 4) {
                    defencer.isDead = true;
                }
            }
            const updatingChar = new updateCharacterDto_1.UpdateCharacterDto();
            updatingChar.wounds = defencer.wounds;
            updatingChar.isShaken = defencer.isShaken;
            updatingChar.isDead = defencer.isDead;
            console.log(updatingChar);
            yield this._characterService.updateCharacter(ownerId, defenceCharId, updatingChar);
        });
    }
    _tokenize(expression) {
        const tokens = [];
        let currentToken = '';
        for (const char of expression.replace(/\s+/g, '')) {
            if (['+', '-', '*', '/', '(', ')'].includes(char)) {
                if (currentToken)
                    tokens.push(currentToken);
                tokens.push(char);
                currentToken = '';
            }
            else {
                currentToken += char;
            }
        }
        if (currentToken)
            tokens.push(currentToken);
        return tokens;
    }
    _insertAttributes(tokens, char) {
        let i = 0;
        while (i < tokens.length) {
            if (tokens[i] in char) {
                tokens[i] = char[tokens[i]];
            }
            i++;
        }
        return tokens;
    }
    _rolls(tokens) {
        const rollingTokens = [];
        let i = 0;
        while (i < tokens.length) {
            if (tokens[i] === 'roll' && tokens[i + 1] === '(') {
                const dice = parseInt(tokens[i + 2], 10);
                rollingTokens.push((0, rollDice_1.default)(dice).toString());
                i += 4;
            }
            else {
                rollingTokens.push(tokens[i]);
                i++;
            }
        }
        return rollingTokens;
    }
    _evaluate(tokens) {
        const output = [];
        const operators = [];
        const precedence = {
            '*': 2,
            '/': 2,
            '+': 1,
            '-': 1,
        };
        for (const token of tokens) {
            if (!isNaN(parseInt(token))) {
                output.push(parseInt(token));
            }
            else if (token in precedence) {
                while (operators.length &&
                    precedence[operators[operators.length - 1]] >= precedence[token]) {
                    this._applyOperator(output, operators.pop());
                }
                operators.push(token);
            }
        }
        while (operators.length) {
            this._applyOperator(output, operators.pop());
        }
        return output[0];
    }
    _applyOperator(output, operator) {
        const b = output.pop();
        const a = output.pop();
        switch (operator) {
            case '+':
                output.push(a + b);
                break;
            case '-':
                output.push(a - b);
                break;
            case '*':
                output.push(a * b);
                break;
            case '/':
                output.push(a / b);
                break;
        }
    }
    _countConditionValue(formula, char) {
        let tokens = this._tokenize(formula);
        tokens = this._insertAttributes(tokens, char);
        tokens = this._rolls(tokens);
        return this._evaluate(tokens);
    }
}
exports.BattleService = BattleService;
