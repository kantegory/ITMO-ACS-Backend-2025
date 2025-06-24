import 'reflect-metadata';

import { Character } from '../models/Character';
import { ICharacterService } from './interfaces/ICharacterService';
import { Effect, EffectType } from '../models/Effect';
import { IBattleService } from './interfaces/IBattleService';
import { CharacterService } from './CharacterService';
import { IEffectService } from './interfaces/IEffectService';
import { EffectService } from './EffectService';
import rollDice from '../utils/rollDice';
import { ConditionType } from '../models/Condition';
import { Condition } from '../models/Condition';
import { UpdateCharacterDto } from '../dtos/updateCharacterDto';

export class BattleService implements IBattleService
{

    _characterService: ICharacterService
    _effectService: IEffectService
    
    constructor()
    {
        this._characterService = new CharacterService()
        this._effectService = new EffectService()
    }

    //Атака
    //Вычисляет 2 списка эфектов, актуальных для персонажей
    //Вычисляет бросок навыка (свой + эффекты, влияющие на навык). Кидает на попадание.
    //Высчитывает парирование атакующего (своё + от эфектов, влияющих на "parry")
    //Если попал: Определяет урон (в зависимости от Активных эффектов оружия и персонажа, влияющих на параметр "damage").
    //Вычисляет наывки, снижающие урон ("target", "damage")
    //Высчитывает защиту защищающегося (свой + эффект "toughness" и "armor")
    //Вводит в шок и/или наносит раны
    async Attack(ownerId: number, attackCharId: number, defenceCharId: number, authToken: string): Promise<void> {

        let damage = 0
        console.log(damage)

        const conditionTypeOrder: Record<ConditionType, number> = {
            [ConditionType.Triggering]: 1,
            [ConditionType.Effect]: 2,
            [ConditionType.Ending]: 3
        };

        console.log(attackCharId, defenceCharId)

        const attacker = await this._characterService.getCharacter(authToken, attackCharId) as Character
        console.log(attacker.id)
        const defencer = await this._characterService.getCharacter(authToken, defenceCharId) as Character
        
        const attackerUniversalEffects = await this._characterService.getCharEffects(authToken, attackCharId, EffectType.Universal) as Effect[]
        const defencerUniversalEffects = await this._characterService.getCharEffects(authToken, defenceCharId, EffectType.Universal) as Effect[]
        const attackerAttackEffects = await this._characterService.getCharEffects(authToken, attackCharId, EffectType.Attact) as Effect[]
        const defencerDefenceEffects = await this._characterService.getCharEffects(authToken, defenceCharId, EffectType.Defence) as Effect[]

        //Пусть атакующий навык будет всегда Драка (хотя иногда это стрельба или магический навык)
        const attackingSkill = "fighting"

        //Учитываем бонусы к характеристикам 
        for (let effect of [...attackerUniversalEffects, ...defencerUniversalEffects, ...attackerAttackEffects, ...defencerDefenceEffects ])
        {
            const conditions = (await this._effectService.getConditions(authToken, effect.id) as Condition[]).sort((a, b) => 
                conditionTypeOrder[a.type] - conditionTypeOrder[b.type]
            );

            for (let condition of conditions)
            {
                if (condition.type == "triggering")
                {
                    let isCondition = true

                    if (condition.targetType == "self")
                    {
                        const value = this._countConditionValue(condition.value, attacker)
                        if (condition.parameter in attacker)
                        {
                            
                            switch (condition.operand)
                            {
                                case ">": isCondition = (attacker[condition.parameter] > value); break;
                                case ">=": isCondition = (attacker[condition.parameter] >= value); break;
                                case "<": isCondition = (attacker[condition.parameter] < value); break;
                                case "<=": isCondition = (attacker[condition.parameter] <= value); break;
                                case "==": isCondition = (attacker[condition.parameter] == value); break;
                            }
                        }
                        else if (condition.parameter == "damage")
                        {
                            switch (condition.operand)
                            {
                                case ">": isCondition = (damage > value); break;
                                case ">=": isCondition = (damage >= value); break;
                                case "<": isCondition = (damage < value); break;
                                case "<=": isCondition = (damage <= value); break;
                                case "==": isCondition = (damage == value); break;
                            }
                        }

                    }
                    else
                    {
                        const value = this._countConditionValue(condition.value, defencer)
                        console.log("Шок")
                        console.log(value)
                        if (condition.parameter in defencer)
                        {
                            switch (condition.operand)
                            {
                                case ">": isCondition = (defencer[condition.parameter] > value); break;
                                case ">=": isCondition = (defencer[condition.parameter] >= value); break;
                                case "<": isCondition = (defencer[condition.parameter] < value); break;
                                case "<=": isCondition = (defencer[condition.parameter] <= value); break;
                                case "==": isCondition = (defencer[condition.parameter] == value); break;
                            }
                        }
                        else if (condition.parameter == "damage")
                        {
                            switch (condition.operand)
                            {
                                case ">": isCondition = (damage > value); break;
                                case ">=": isCondition = (damage >= value); break;
                                case "<": isCondition = (damage < value); break;
                                case "<=": isCondition = (damage <= value); break;
                                case "==": isCondition = (damage == value); break;
                            }
                        }
                    }

                    if (!isCondition)
                    {
                        break
                    }

                }

                else if (condition.type == "effect")
                {
                    if (condition.targetType == "self")
                    {
                        const value = this._countConditionValue(condition.value, attacker)
                        if (condition.parameter in attacker)
                        {   
                            switch (condition.operand) {
                                case '+': attacker[condition.parameter] += value; break;
                                case '-': attacker[condition.parameter] -= value; break;
                                case '=': attacker[condition.parameter] = value; break;
                            }
                        }
                        else if (condition.parameter == "damage")
                        {
                            switch (condition.operand)
                            {
                                case "+": damage += value; break;
                                case "-": damage -= value; break;
                                case "=": damage = value; break;
                            }
                        }
                    }
                    else
                    {
                        const value = this._countConditionValue(condition.value, defencer)
                        if (condition.parameter in defencer)
                        {   
                            switch (condition.operand) {
                                case '+': defencer[condition.parameter] += value; break;
                                case '-': defencer[condition.parameter] -= value; break;
                                case '=': defencer[condition.parameter] = value; break;
                            }
                        }
                        else if (condition.parameter == "damage")
                        {
                            switch (condition.operand)
                            {
                                case "+": damage += value; break;
                                case "-": damage -= value; break;
                                case "=": damage = value; break;
                            }
                        }
                    }
                }
            }
        }

        //Бросок на попадание
        let hitRoll = rollDice(Math.max( ...attacker.skills.filter((skill) => skill.skillId == 1).map(skill => skill.level) ))
        if (attacker.isWildCard)
        {
            const hitWildRoll = rollDice(attacker.wildDice)
            if (hitWildRoll > hitRoll)
            {
                hitRoll = hitWildRoll
            }
        }

        if (hitRoll <= defencer.parry)
        {
            return
        }

        console.log("damage")
        console.log(damage)

        let resultArmor = Math.max(defencer.toughness, 0) + Math.max(defencer.armor, 0)
        if (damage >= resultArmor)
        {
            if (!defencer.isShaken)
            {
                defencer.isShaken = true
                resultArmor += 4
            }
        }

        while (damage >= resultArmor)
        {
            defencer.wounds += 1
            resultArmor += 4
        }

        if (defencer.wounds > defencer.hp)
        {
            if (rollDice(defencer.vigor) < 4)
            {
                defencer.isDead = true
            }
        }

        const updatingChar = new UpdateCharacterDto()
        updatingChar.wounds = defencer.wounds
        updatingChar.isShaken = defencer.isShaken
        updatingChar.isDead = defencer.isDead

        console.log(updatingChar)

        await this._characterService.updateCharacter(authToken, defenceCharId, updatingChar)
    }

    _tokenize(expression: string): string[] {
        const tokens: string[] = []
        let currentToken = ''
    
        for (const char of expression.replace(/\s+/g, ''))
        {
            if (['+', '-', '*', '/', '(', ')'].includes(char))
             {
                if (currentToken) tokens.push(currentToken)
                tokens.push(char)
                currentToken = ''
            } else {
                currentToken += char
            }
        }
    
        if (currentToken) tokens.push(currentToken)
        return tokens
    }
    
    _insertAttributes(tokens: string[], char: Character): string[] {

        let i = 0
        while (i < tokens.length) {
            if (tokens[i] in char)
            {
                tokens[i] = char[tokens[i]]
            }
            i ++
        }

        return tokens
    }
    
    _rolls(tokens: string[]): string[] {
        const rollingTokens: string[] = []
        let i = 0
    
        while (i < tokens.length) {
            if (tokens[i] === 'roll' && tokens[i + 1] === '(') {
                const dice = parseInt(tokens[i + 2], 10);
                rollingTokens.push(rollDice(dice).toString());
                i += 4;
            } else {
                rollingTokens.push(tokens[i])
                i++
            }
        }
    
        return rollingTokens;
    }

    _evaluate(tokens: string[]): number {
        const output: number[] = [];
        const operators: string[] = [];
    
        const precedence: Record<string, number> = {
            '*': 2,
            '/': 2,
            '+': 1,
            '-': 1,
        };
    
        for (const token of tokens) {
            if (!isNaN(parseInt(token))) {
                output.push(parseInt(token));
            } else if (token in precedence) {
                while (
                    operators.length &&
                    precedence[operators[operators.length - 1]] >= precedence[token]
                ) {
                    this._applyOperator(output, operators.pop()!);
                }
                operators.push(token);
            }
        }
    
        while (operators.length) {
            this._applyOperator(output, operators.pop()!);
        }
    
        return output[0];
    }
    
    _applyOperator(output: number[], operator: string): void {
        const b = output.pop()!;
        const a = output.pop()!;
        switch (operator) {
            case '+': output.push(a + b); break;
            case '-': output.push(a - b); break;
            case '*': output.push(a * b); break;
            case '/': output.push(a / b); break;
        }
    }

    _countConditionValue(formula: string, char: Character): number
    {
        let tokens = this._tokenize(formula)
        tokens = this._insertAttributes(tokens, char)
        tokens = this._rolls(tokens)
        return this._evaluate(tokens)
    }
}   