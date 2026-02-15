import { Layout }
    from "../config/Layout.js";

export class SurvivalSystem {

    constructor(scene, inventory, inventoryUI, campfireSystem) {

        this.scene = scene;
        this.inventory = inventory;
        this.inventoryUI = inventoryUI;
        this.campfireSystem = campfireSystem;

        this.hunger = 100;
        this.thirst = 100;

        this.text =
            scene.add.text(

                Layout.status.x,
                Layout.status.y,

                "",

                {
                    fontSize: "18px",
                    color: "#ffffff",
                    fontFamily: "monospace"
                }

            )
                .setDepth(2000);

        this.start();

    }

    start() {

        this.timer =
            this.scene.time.addEvent({

                delay: 1000,
                loop: true,

                callback: () => {

                    this.hunger -= 1;
                    this.thirst -= 1;

                    this.campfireSystem.consume();

                    this.update();

                    this.checkGameOver();

                }

            });

    }

    eat() {

        if (this.inventory.resources.food > 0) {

            this.inventory.resources.food--;

            this.hunger =
                Math.min(
                    this.hunger + 25,
                    100
                );

            this.inventoryUI.update();

        }

    }

    drink() {

        if (this.inventory.resources.water > 0) {

            this.inventory.resources.water--;

            this.thirst =
                Math.min(
                    this.thirst + 25,
                    100
                );

            this.inventoryUI.update();

        }

    }

    update() {

        this.text.setText(

            `Status

🔥 Fire: ${this.campfireSystem.fire}
🍖 Hunger: ${this.hunger}
💧 Thirst: ${this.thirst}`

        );

    }

    checkGameOver() {

        if (
            this.hunger <= 0 ||
            this.thirst <= 0 ||
            this.campfireSystem.fire <= 0
        ) {

            this.timer.remove();

            this.scene.add.text(

                Layout.screenWidth / 2,
                Layout.screenHeight / 2,

                "GAME OVER",

                {
                    fontSize: "48px",
                    color: "#ff0000"
                }

            )
                .setOrigin(0.5)
                .setDepth(5000);

        }

    }

}
