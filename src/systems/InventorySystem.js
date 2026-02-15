export class InventorySystem {

    constructor() {

        this.resources = {
            wood: 0,
            stone: 0,
            food: 0,
            water: 0
        };

    }

    add(type, amount = 1) {

        this.resources[type] += amount;

        console.log(
            type,
            "+",
            amount,
            this.resources[type]
        );

    }

}
