import { Campfire }
    from "../objects/Campfire.js";

import { Layout }
    from "../config/Layout.js";

export class CampfireSystem {
    constructor(scene, inventory, inventoryUI, survivalSystem) {
        this.scene = scene;

        this.inventory = inventory;

        this.inventoryUI = inventoryUI;

        this.survivalSystem = survivalSystem;

        this.campfire =
            new Campfire(
                scene,
                Layout.campfire.x,
                Layout.campfire.y
            );

        // intensidade inicial segura
        this.update();
    }

    update() {
        if (!this.survivalSystem) return;

        this.campfire.setIntensity(
            this.survivalSystem.fire
        );
    }


    addWood() {
        if (this.inventory.resources.wood <= 0) {
            this.scene.messageUI?.show("No wood");
            return;
        }

        if (this.survivalSystem.fire >= 100) {
            this.scene.messageUI?.show("Fire already full");
            return;
        }

        this.inventory.resources.wood--;

        this.survivalSystem.addFire(25);

        this.inventoryUI.update();

        this.update();
    }


}
