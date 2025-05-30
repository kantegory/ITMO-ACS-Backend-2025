const rollDice = (dice: number): number => {
    return Math.floor(Math.random() * dice) + 1;
};

export default rollDice;