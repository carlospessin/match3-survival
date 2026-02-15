export class ResourceFlyAnimation {

    constructor(scene, inventoryUI) {

        this.scene = scene;
        this.inventoryUI = inventoryUI;

    }

    animate(tile, onComplete) {

        const targetX =
            this.inventoryUI.text.x + 40;

        const targetY =
            this.inventoryUI.text.y + 40;

        this.scene.tweens.add({

            targets: tile.sprite,

            x: targetX,
            y: targetY,

            scale: 0.3,

            duration: 400,

            ease: "Cubic.easeIn",

            onComplete: () => {

                tile.destroy();

                if (onComplete)
                    onComplete();

            }

        });

    }

}
