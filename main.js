import { Match3Scene }
    from "./src/scenes/Match3Scene.js";

new Phaser.Game({

    type: Phaser.AUTO,

    parent: document.body,

    backgroundColor: "#1a1a1a",

    scale: {
        mode: Phaser.Scale.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight
    },

    scene: [Match3Scene]

});
