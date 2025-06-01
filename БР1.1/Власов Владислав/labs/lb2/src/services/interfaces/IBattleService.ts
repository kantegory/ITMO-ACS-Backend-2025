import { ObjectLiteral } from "typeorm";

export interface IBattleService
{
    //Конец раунда
    //EndRounde(CharactersId: number[]): Promise<void>

    //Конец хода
    //EndTurn(CharacterId: number): Promise<void>

    //Атака
    //Вычисляет 2 спииска эфектов, актуальных для персонажей
    //Определяет активное оружие. Определяет атакующий навык.
    //Вычисляет бросок навыка (свой + эффекты, влияющие на навык). Кидает на попадание.
    //Высчитывает парирование атакующего (своё + от эфектов, влияющих на "parry")
    //Если попал: Определяет урон (в зависимости от Активных эффектов оружия и персонажа, влияющих на параметр "damage").
    //Вычисляет наывки, снижающие урон ("target", "damage")
    //Высчитывает защиту защищающегося (свой + эффект "toughness" и "armor")
    //Вводит в шок и/или наносит раны
    Attack(ownerId: number, attackCharId: number, defenceCharId: number): Promise<void>
}