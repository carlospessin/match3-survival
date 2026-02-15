export class InventorySystem {

    constructor() {

        this.resources = {
            fire: 0,
            stone: 0,
            food: 0,
            water: 0,
            wood: 0
        };

    }

    add(type, amount = 1) {
        if (this.resources[type] === undefined)
            return;

        this.resources[type] += amount;

        console.log(
            "ADD",
            type,
            this.resources[type]
        );
    }

}
