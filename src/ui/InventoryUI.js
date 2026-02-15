import { Match3Config }
    from "../config/Match3Config.js";

import { Layout }
    from "../config/Layout.js";

export class InventoryUI {

    constructor(scene, inventory) {

        this.scene = scene;
        this.inventory = inventory;

        const x = Layout.inventory.x;

        const y = Layout.inventory.y;

        this.background =
            scene.add.rectangle(
                x - 10,
                y - 10,
                180,
                140,
                0x000000,
                0.4
            )
                .setOrigin(0)
                .setDepth(2000);

        this.text =
            scene.add.text(
                x,
                y,
                "",
                {
                    fontSize: "18px",
                    color: "#ffffff",
                    fontFamily: "monospace"
                }
            )
                .setDepth(2001);

        this.update();

    }

    update() {

        const r =
            this.inventory.resources;

        this.text.setText(

            `Inventory
             Stone: ${r.stone}
             Wood: ${r.wood}`
        );

    }

}
