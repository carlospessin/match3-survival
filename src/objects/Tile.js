import { ResourceIcons }
    from "../config/Match3Config.js";

export class Tile {

    constructor(scene, gridX, gridY, type, size, offsetX, offsetY) {
        this.scene = scene;

        this.gridX = gridX;
        this.gridY = gridY;
        this.type = type;

        const colors = [
            0x8b5a2b, // wood
            0x888888, // stone
            0xaa3333, // food
            0x3366cc  // water
        ];

        const px =
            offsetX +
            gridX * size;

        const py =
            offsetY +
            gridY * size;

        // container do tile
        this.container =
            scene.add.container(px, py);

        // fundo
        this.bg =
            scene.add.rectangle(
                0,
                0,
                size - 6,
                size - 6,
                colors[type]
            )
                .setStrokeStyle(2, 0x000000);

        // ícone
        this.icon =
            scene.add.text(
                0,
                0,
                ResourceIcons[type],
                {
                    fontSize: "28px"
                }
            )
                .setOrigin(0.5);

        this.container.add([
            this.bg,
            this.icon
        ]);

        this.container.setSize(size, size);

        this.container.setInteractive();

        this.container.tile = this;
        this.sprite = this.container;

    }

    highlight(active) {
        if (active)
            this.bg.setStrokeStyle(4, 0xffffff);
        else
            this.bg.setStrokeStyle(2, 0x000000);
    }

    moveTo(x, y, duration) {
        return new Promise(resolve => {
            this.scene.tweens.add({

                targets: this.container,

                x,
                y,

                duration,

                ease: "Cubic.easeOut",

                onComplete: resolve

            });
        });
    }

    destroy() {
        this.container.destroy();
    }

}
