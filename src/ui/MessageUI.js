export class MessageUI {

    constructor(scene) {
        this.scene = scene;

        this.text =
            scene.add.text(
                scene.scale.width / 2,
                scene.scale.height - 120,
                "",
                {
                    fontSize: "22px",
                    color: "#ff5555",
                    fontStyle: "bold",
                    stroke: "#000000",
                    strokeThickness: 5,
                    align: "center"
                }
            )
                .setOrigin(0.5)
                .setDepth(10000)
                .setScrollFactor(0)
                .setAlpha(0);
    }

    show(message) {
        this.text.setText(message);

        this.scene.tweens.killTweensOf(this.text);

        this.text.setAlpha(1);
        this.text.y = this.scene.scale.height - 120;

        this.scene.tweens.add({
            targets: this.text,
            y: this.scene.scale.height - 140,
            alpha: 0,
            duration: 1600,
            ease: "Power2"
        });
    }

}
