import { Layout }
    from "../config/Layout.js";

export class ActionBarUI {

    constructor(scene, inventory, inventoryUI, survivalSystem, campfireSystem) {
        this.scene = scene;

        this.inventory = inventory;
        this.inventoryUI = inventoryUI;
        this.survivalSystem = survivalSystem;
        this.campfireSystem = campfireSystem;

        this.messageUI = scene.messageUI;

        const centerX = scene.scale.width / 2;
        const y = scene.scale.height - 50;
        const spacing = 180;

        this.createButton(
            centerX - spacing,
            y,
            "🔥 Add fire",
            () => {
                if (this.inventory.resources.fire <= 0) {
                    this.messageUI.show("No fire");
                    return;
                }

                this.campfireSystem.addFire();
                this.inventoryUI.update();
            }
        );

        this.createButton(
            centerX,
            y,
            "🍖 Eat",
            () => {
                if (this.inventory.resources.food <= 0) {
                    this.messageUI.show("No food");
                    return;
                }

                this.survivalSystem.eat();
                this.inventoryUI.update();
            }
        );

        this.createButton(
            centerX + spacing,
            y,
            "💧 Drink",
            () => {
                if (this.inventory.resources.water <= 0) {
                    this.messageUI.show("No water");
                    return;
                }

                this.survivalSystem.drink();
                this.inventoryUI.update();
            }
        );
    }


    createButton(x, y, label, callback) {

        const btn =
            this.scene.add.rectangle(
                x,
                y,
                140,
                40,
                0x333333
            )
                .setDepth(3000)
                .setInteractive({ useHandCursor: true });

        const text =
            this.scene.add.text(
                x,
                y,
                label,
                {
                    fontSize: "18px",
                    color: "#ffffff",
                    fontFamily: "monospace"
                }
            )
                .setOrigin(0.5)
                .setDepth(3001);

        btn.on("pointerdown", callback);

        btn.on("pointerover", () =>
            btn.setFillStyle(0x555555)
        );

        btn.on("pointerout", () =>
            btn.setFillStyle(0x333333)
        );

    }

}
