export class SurvivalSystem {
    constructor(scene, inventory, inventoryUI, campfireSystem) {
        this.scene = scene;

        this.inventory = inventory;
        this.inventoryUI = inventoryUI;
        this.campfireSystem = campfireSystem;

        // STATUS

        this.max = 100;

        this.fire = 100;
        this.hunger = 100;
        this.thirst = 100;
        this.fear = 0;

        this.setValue("fire", this.fire);
        this.setValue("hunger", this.hunger);
        this.setValue("thirst", this.thirst);
        this.setValue("fear", this.fear);


        // posição lado direito
        const x =
            scene.scale.width - 240;

        const startY = 40;
        const gap = 55;

        this.bars = {};

        this.bars.fire =
            this.createBar("Fire", x, startY, 0xff6600);

        this.bars.hunger =
            this.createBar("Hunger", x, startY + gap, 0xffaa44);

        this.bars.thirst =
            this.createBar("Thirst", x, startY + gap * 2, 0x44aaff);

        this.bars.fear =
            this.createBar("Fear", x, startY + gap * 3, 0xff4444);

        this.updateUI();

        this.startDecay();

        this.startFearLoop();

    }

    setValue(key, value) {
        if (isNaN(value))
            value = 0;

        this[key] =
            Phaser.Math.Clamp(
                value,
                0,
                this.max
            );
    }



    startFearLoop() {

        this.scene.time.addEvent({

            delay: Phaser.Math.Between(5000, 9000),

            loop: true,

            callback: () => {

                let multiplier = 1;

                if (this.fire < 50)
                    multiplier = 1.2;

                if (this.fire < 25)
                    multiplier = 1.5;

                if (this.fire <= 0)
                    multiplier = 2;

                const amount =
                    Phaser.Math.FloatBetween(0.5, 2) * multiplier;

                this.addFear(amount);

            }

        });

    }




    createBar(label, x, y, color) {
        const text =
            this.scene.add.text(
                x,
                y,
                label,
                {
                    fontSize: "20px",
                    color: "#ffffff"
                }
            )
                .setDepth(3000);

        const bg =
            this.scene.add.rectangle(
                x,
                y + 28,
                160,
                14,
                0x222222
            )
                .setOrigin(0, 0.5)
                .setDepth(3000);

        const bar =
            this.scene.add.rectangle(
                x,
                y + 28,
                160,
                14,
                color
            )
                .setOrigin(0, 0.5)
                .setDepth(3001);

        const value =
            this.scene.add.text(
                x + 170,
                y + 18,
                "100%",
                {
                    fontSize: "18px",
                    color: "#ffffff"
                }
            )
                .setDepth(3000);

        return {
            text,
            bg,
            bar,
            value
        };
    }

    updateUI() {
        this.updateBar(this.bars.fire, this.fire);
        this.updateBar(this.bars.hunger, this.hunger);
        this.updateBar(this.bars.thirst, this.thirst);
        this.updateBar(this.bars.fear, this.fear);
    }

    updateBar(bar, value) {
        const percent =
            Phaser.Math.Clamp(value / this.max, 0, 1);

        bar.bar.width =
            160 * percent;

        bar.value.setText(
            `${Math.floor(
                Phaser.Math.Clamp(value, 0, this.max)
            )}%`
        );

    }

    // =================
    // FEAR
    // =================

    addFear(amount) {
        this.setValue(
            "fear",
            this.fear + amount
        );

        this.updateUI();

        if (this.fear >= this.max)
            this.gameOver("Consumed by fear");
    }




    reduceFear(amount) {
        this.setValue(
            "fear",
            this.fear - amount
        );

        this.updateUI();
    }


    // =================
    // CONSUME
    // =================

    eat() {
        if (this.inventory.resources.food <= 0) {
            this.scene.messageUI?.show("No food");
            return;
        }

        if (this.hunger >= this.max) {
            this.scene.messageUI?.show("Hunger already full");
            return;
        }

        this.inventory.resources.food--;

        this.setValue(
            "hunger",
            this.hunger + 25
        );



        this.inventoryUI.update();
        this.updateUI();
    }



    drink() {
        if (this.inventory.resources.water <= 0) {
            this.scene.messageUI?.show("No water");
            return;
        }

        if (this.thirst >= this.max) {
            this.scene.messageUI?.show("Thirst already full");
            return;
        }

        this.inventory.resources.water--;

        this.setValue(
            "thirst",
            this.thirst + 25
        );


        this.inventoryUI.update();
        this.updateUI();
    }



    // =================
    // DECAY LOOP
    // =================

    startDecay() {

        // FIRE decay (mais lento)
        this.scene.time.addEvent({

            delay: 4000,

            loop: true,

            callback: () => {

                this.setValue(
                    "fire",
                    this.fire - 1
                );

                // fogo baixo aumenta fear lentamente
                if (this.fire < 40) {

                    this.addFear(
                        Phaser.Math.FloatBetween(0.5, 1.5)
                    );

                }

                // fogo apagado aumenta mais
                if (this.fire <= 0) {

                    this.addFear(
                        Phaser.Math.FloatBetween(2, 4)
                    );

                }

                this.updateUI();

                if (this.campfireSystem)
                    this.campfireSystem.update();

            }

        });


        // HUNGER decay
        this.scene.time.addEvent({

            delay: 6000,

            loop: true,

            callback: () => {

                this.setValue(
                    "hunger",
                    this.hunger - 1
                );

                this.updateUI();

            }

        });


        // THIRST decay
        this.scene.time.addEvent({

            delay: 5000,

            loop: true,

            callback: () => {

                this.setValue(
                    "thirst",
                    this.thirst - 1
                );

                this.updateUI();

            }

        });

    }

    addFire(amount) {
        this.setValue(
            "fire",
            this.fire + amount
        );

        this.updateUI();
    }


    gameOver(reason) {
        this.scene.add.text(
            this.scene.scale.width / 2,
            this.scene.scale.height / 2,
            reason,
            {
                fontSize: "48px",
                color: "#ff0000",
                fontStyle: "bold"
            }
        )
            .setOrigin(0.5)
            .setDepth(9999);

        this.scene.scene.pause();
    }
}
