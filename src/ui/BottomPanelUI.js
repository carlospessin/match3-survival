export class BottomPanelUI {

    constructor(scene) {

        this.scene = scene;

        const height = 140;

        this.background =
            scene.add.rectangle(

                scene.scale.width / 2,
                scene.scale.height - height / 2,

                scene.scale.width,
                height,

                0x111111

            )
                .setDepth(900);

    }

}
