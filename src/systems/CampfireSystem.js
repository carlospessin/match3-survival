import { Campfire }
    from "../objects/Campfire.js";

import { Layout }
    from "../config/Layout.js";

export class CampfireSystem {

    constructor(scene, inventory, inventoryUI) {

        this.scene = scene;
        this.inventory = inventory;
        this.inventoryUI = inventoryUI;

        this.fire = 100;

        this.campfire =
            new Campfire(
                scene,
                Layout.campfire.x,
                Layout.campfire.y
            );

        // usar método correto
        this.campfire.setIntensity(this.fire);

    }

    addWood() {

        if (this.inventory.resources.wood > 0) {

            this.inventory.resources.wood--;

            this.fire =
                Math.min(this.fire + 25, 100);

            this.campfire.setIntensity(this.fire);

            this.inventoryUI.update();

        }

    }

    consume() {

        this.fire =
            Math.max(this.fire - 1, 0);

        this.campfire.setIntensity(this.fire);

    }

}
