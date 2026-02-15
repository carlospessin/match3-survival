export class WildAnimalSystem {
    constructor(scene, campfireSystem, survivalSystem) {
        this.scene = scene;
        this.campfireSystem = campfireSystem;
        this.survivalSystem = survivalSystem;

        this.eyes = [];

        // update loop leve
        scene.time.addEvent({
            delay: 200,
            loop: true,
            callback: () => this.update()
        });
    }

    update() {
        const fear =
            this.survivalSystem.fear;

        const targetEyes =
            Math.floor(fear / 5);

        const currentEyes =
            this.eyes.length;

        // criar novos olhos
        if (currentEyes < targetEyes) {
            for (let i = currentEyes; i < targetEyes; i++)
                this.spawnEyes();
        }

        // remover olhos
        if (currentEyes > targetEyes) {
            for (let i = currentEyes - 1; i >= targetEyes; i--)
                this.removeEyes(i);
        }
    }

    spawnEyes() {
        const campfire =
            this.campfireSystem.campfire;

        const baseX = campfire.x;
        const baseY = campfire.y;

        const angle =
            Phaser.Math.FloatBetween(0, Math.PI * 2);

        const distance =
            Phaser.Math.Between(90, 200);

        const x =
            baseX +
            Math.cos(angle) * distance;

        const y =
            baseY +
            Math.sin(angle) * distance;

        const size =
            Phaser.Math.Between(2, 8);

        const container =
            this.scene.add.container(x, y)
                .setDepth(5000);

        const left =
            this.scene.add.circle(
                -size,
                0,
                size,
                0xff0000
            );

        const right =
            this.scene.add.circle(
                size,
                0,
                size,
                0xff0000
            );

        container.add([left, right]);

        container.setAlpha(0.8);

        // piscar infinito
        container.blinkTween =
            this.scene.tweens.add({
                targets: container,
                alpha: { from: 0.2, to: 1 },
                duration: Phaser.Math.Between(300, 900),
                yoyo: true,
                repeat: -1
            });

        this.eyes.push(container);
    }

    removeEyes(index) {
        const eyes =
            this.eyes[index];

        if (!eyes)
            return;

        if (eyes.blinkTween)
            eyes.blinkTween.stop();

        this.scene.tweens.add({
            targets: eyes,
            alpha: 0,
            duration: 300,
            onComplete: () => eyes.destroy()
        });

        this.eyes.splice(index, 1);
    }
}
