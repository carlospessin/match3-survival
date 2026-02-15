export class Campfire {

    constructor(scene, x, y) {

        this.scene = scene;

        this.x = x;
        this.y = y;

        this.createLogs(scene, x, y);

        this.fire =
            scene.add.particles(
                x,
                y - 10,
                "fire",
                {

                    lifespan: 900,

                    speed: {
                        min: 20,
                        max: 80
                    },

                    scale: {
                        start: 0.6,
                        end: 0
                    },

                    alpha: {
                        start: 1,
                        end: 0
                    },

                    angle: {
                        min: -95,
                        max: -85
                    },

                    gravityY: -100,

                    blendMode: Phaser.BlendModes.ADD,

                    frequency: 40

                }
            );

    }

    createLogs(scene, x, y) {
        const depth = 100;

        this.logs = [];

        const logsData = [

            { angle: -35, offsetX: -14, offsetY: 16, length: 52, thickness: 12 },
            { angle: 35, offsetX: 14, offsetY: 16, length: 52, thickness: 12 },
            { angle: 8, offsetX: 0, offsetY: 22, length: 46, thickness: 12 },
            { angle: -8, offsetX: 0, offsetY: 12, length: 46, thickness: 12 }

        ];

        logsData.forEach(data => {
            const log =
                scene.add.container(
                    x + data.offsetX,
                    y + data.offsetY
                )
                    .setDepth(depth);

            // base madeira
            const wood =
                scene.add.rectangle(
                    0,
                    0,
                    data.length,
                    data.thickness,
                    0x6b4423
                );

            // sombra inferior
            const shadow =
                scene.add.rectangle(
                    0,
                    3,
                    data.length,
                    data.thickness,
                    0x3b2514,
                    0.5
                );

            // highlight superior
            const highlight =
                scene.add.rectangle(
                    0,
                    -3,
                    data.length,
                    data.thickness * 0.5,
                    0x9c6a3a,
                    0.4
                );

            log.add([shadow, wood, highlight]);

            log.setRotation(
                Phaser.Math.DegToRad(data.angle)
            );

            this.logs.push(log);
        });
    }


    setIntensity(value) {

        const t =
            Phaser.Math.Clamp(
                value / 100,
                0,
                1
            );

        this.fire.setScale(
            0.4 + t * 1.5
        );

        this.fire.setFrequency(
            80 - t * 60
        );

    }

}
