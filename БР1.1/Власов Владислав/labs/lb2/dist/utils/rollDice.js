"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rollDice = (dice) => {
    return Math.floor(Math.random() * dice) + 1;
};
exports.default = rollDice;
