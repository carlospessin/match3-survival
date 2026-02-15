import { Match3Config }
    from "../config/Match3Config.js";

import { GridSystem }
    from "../systems/GridSystem.js";

import { Tile }
    from "../objects/Tile.js";

import { InventorySystem }
    from "../systems/InventorySystem.js";

import { ResourceMap }
    from "../config/Match3Config.js";

import { InventoryUI }
    from "../ui/InventoryUI.js";

import { ActionBarUI }
    from "../ui/ActionBarUI.js";

import { ResourceFlyAnimation }
    from "../systems/ResourceFlyAnimation.js";

import { CampfireSystem }
    from "../systems/CampfireSystem.js";

import { SurvivalSystem }
    from "../systems/SurvivalSystem.js";

import { BottomPanelUI }
    from "../ui/BottomPanelUI.js";

import { MessageUI }
    from "../ui/MessageUI.js";


export class Match3Scene extends Phaser.Scene {

    preload() {
        this.load.image(
            "fire",
            "src/assets/particles/fire.png"
        );
    }

    async create() {

        this.bottomPanel =
            new BottomPanelUI(this);

        this.inventory =
            new InventorySystem();

        this.inventoryUI =
            new InventoryUI(
                this,
                this.inventory
            );

        this.messageUI =
            new MessageUI(this);

        this.resourceFlyAnimation =
            new ResourceFlyAnimation(
                this,
                this.inventoryUI
            );

        this.campfireSystem =
            new CampfireSystem(
                this,
                this.inventory,
                this.inventoryUI
            );

        this.survivalSystem =
            new SurvivalSystem(
                this,
                this.inventory,
                this.inventoryUI,
                this.campfireSystem
            );


        this.actionBar =
            new ActionBarUI(
                this,
                this.inventory,
                this.inventoryUI,
                this.survivalSystem,
                this.campfireSystem
            );


        this.grid =
            new GridSystem(
                this,
                Match3Config
            );



        this.selectedTile = null;
        this.isBusy = false;

        // INPUT CORRETO
        this.input.on(
            "gameobjectdown",
            this.onTileDown,
            this
        );

        this.input.on(
            "gameobjectup",
            this.onTileUp,
            this
        );

        await this.createGridWithoutMatches();

        await this.drawGrid();

    }



    // =========================
    // GRID INIT
    // =========================

    async createGridWithoutMatches() {

        for (let y = 0; y < Match3Config.rows; y++)
            for (let x = 0; x < Match3Config.cols; x++) {

                let tile;

                do {

                    tile =
                        new Tile(
                            this,
                            x,
                            y,
                            Phaser.Math.Between(
                                0,
                                Match3Config.tileTypes - 1
                            ),
                            Match3Config.tileSize,
                            Match3Config.offsetX,
                            Match3Config.offsetY
                        );


                }
                while (
                    this.createsMatch(
                        x,
                        y,
                        tile.type
                    )
                );

                this.grid.set(x, y, tile);

            }

    }

    createsMatch(x, y, type) {

        if (x >= 2) {

            const t1 =
                this.grid.get(x - 1, y);

            const t2 =
                this.grid.get(x - 2, y);

            if (
                t1 &&
                t2 &&
                t1.type === type &&
                t2.type === type
            )
                return true;

        }

        if (y >= 2) {

            const t1 =
                this.grid.get(x, y - 1);

            const t2 =
                this.grid.get(x, y - 2);

            if (
                t1 &&
                t2 &&
                t1.type === type &&
                t2.type === type
            )
                return true;

        }

        return false;

    }

    // =========================
    // INPUT CORRETO
    // =========================

    onTileDown(pointer, gameObject) {

        if (this.isBusy)
            return;

        const tile = gameObject.tile;

        this.selectedTile = tile;

        tile.highlight(true);

    }

    async onTileUp(pointer, gameObject) {

        if (
            this.isBusy ||
            !this.selectedTile
        )
            return;

        const target =
            gameObject.tile;

        this.selectedTile.highlight(false);

        if (
            target &&
            this.areAdjacent(
                this.selectedTile,
                target
            )
        ) {

            await this.trySwap(
                this.selectedTile,
                target
            );

        }

        this.selectedTile = null;

    }

    areAdjacent(a, b) {

        const dx =
            Math.abs(a.gridX - b.gridX);

        const dy =
            Math.abs(a.gridY - b.gridY);

        return dx + dy === 1;

    }

    // =========================
    // SWAP
    // =========================

    async trySwap(a, b) {

        this.isBusy = true;

        await this.swap(a, b);

        const matches =
            this.findMatches();

        if (matches.length === 0) {

            await this.swap(b, a);

        }
        else {

            await this.resolveMatches();

        }

        this.isBusy = false;

    }


    async swap(a, b) {

        const ax = a.gridX;
        const ay = a.gridY;

        const bx = b.gridX;
        const by = b.gridY;

        this.grid.set(ax, ay, b);
        this.grid.set(bx, by, a);

        await Promise.all([
            this.moveTile(a),
            this.moveTile(b)
        ]);

    }

    // =========================
    // MATCH DETECT
    // =========================

    findMatches() {

        const matches = [];

        for (let y = 0; y < Match3Config.rows; y++) {

            let chain =
                [this.grid.get(0, y)];

            for (let x = 1; x < Match3Config.cols; x++) {

                const tile =
                    this.grid.get(x, y);

                if (
                    tile &&
                    chain[0] &&
                    tile.type === chain[0].type
                )
                    chain.push(tile);
                else {

                    if (chain.length >= 3)
                        matches.push(...chain);

                    chain = [tile];

                }

            }

            if (chain.length >= 3)
                matches.push(...chain);

        }

        for (let x = 0; x < Match3Config.cols; x++) {

            let chain =
                [this.grid.get(x, 0)];

            for (let y = 1; y < Match3Config.rows; y++) {

                const tile =
                    this.grid.get(x, y);

                if (
                    tile &&
                    chain[0] &&
                    tile.type === chain[0].type
                )
                    chain.push(tile);
                else {

                    if (chain.length >= 3)
                        matches.push(...chain);

                    chain = [tile];

                }

            }

            if (chain.length >= 3)
                matches.push(...chain);

        }

        return matches;

    }

    // =========================
    // CASCADE
    // =========================

    async resolveMatches() {

        while (true) {

            const matches =
                this.findMatches();

            if (matches.length === 0)
                break;

            await this.destroy(matches);

            await this.applyGravity();

            await this.refill();

        }

    }

    async destroy(matches) {

        const animations = [];

        for (const tile of matches) {

            const resource =
                ResourceMap[tile.type];

            // remover do grid imediatamente
            this.grid.set(
                tile.gridX,
                tile.gridY,
                null
            );

            animations.push(

                new Promise(resolve => {

                    this.resourceFlyAnimation.animate(
                        tile,
                        () => {

                            this.inventory.add(
                                resource,
                                1
                            );

                            resolve();

                        }
                    );

                })

            );

        }

        // espera todas animações terminarem
        await Promise.all(animations);

        // atualiza UI depois
        this.inventoryUI.update();

    }




    async applyGravity() {

        const columnAnimations = [];

        for (let x = 0; x < Match3Config.cols; x++) {

            columnAnimations.push(
                this.applyGravityColumn(x)
            );

        }

        await Promise.all(columnAnimations);

    }


    async applyGravityColumn(x) {

        // começa de baixo para cima
        for (let y = Match3Config.rows - 1; y >= 0; y--) {

            if (this.grid.get(x, y) === null) {

                // encontra o próximo tile acima
                for (let k = y - 1; k >= 0; k--) {

                    const tile =
                        this.grid.get(x, k);

                    if (tile) {

                        // guarda posição original REAL
                        const fromY = tile.gridY;

                        // move no grid lógico
                        this.grid.set(x, y, tile);
                        this.grid.set(x, k, null);

                        const distance =
                            y - fromY;

                        const duration =
                            40 + distance * 35;

                        // anima este tile e espera terminar
                        await this.moveTile(
                            tile,
                            duration
                        );

                        // IMPORTANTE: break para continuar cascata
                        break;

                    }

                }

            }

        }

    }




    async refill() {

        const columnAnimations = [];

        for (let x = 0; x < Match3Config.cols; x++) {

            columnAnimations.push(
                this.refillColumn(x)
            );

        }

        await Promise.all(columnAnimations);

    }

    async refillColumn(x) {

        // 1. encontrar posições vazias reais
        const emptyPositions = [];

        for (let y = Match3Config.rows - 1; y >= 0; y--) {

            if (!this.grid.get(x, y))
                emptyPositions.push(y);

        }

        const totalMissing =
            emptyPositions.length;

        // 2. criar tiles um por vez
        for (let i = 0; i < totalMissing; i++) {

            const targetY =
                emptyPositions[i];

            const tile =
                new Tile(
                    this,
                    x,
                    targetY,
                    Phaser.Math.Between(
                        0,
                        Match3Config.tileTypes - 1
                    ),
                    Match3Config.tileSize
                );

            const px =
                Match3Config.offsetX +
                tile.gridX * Match3Config.tileSize;

            // começa acima da tela
            const startY =
                Match3Config.offsetY -
                (totalMissing - i) *
                Match3Config.tileSize;

            tile.container.x = px;
            tile.container.y = startY;

            this.grid.set(x, targetY, tile);

            const distance =
                targetY + totalMissing - i;

            const duration =
                40 + distance * 35;

            await this.moveTile(
                tile,
                duration
            );

        }

    }





    async drawGrid() {

        const animations = [];

        let index = 0;

        const delayStep = 15; // ms entre cada tile

        for (let y = 0; y < Match3Config.rows; y++) {
            for (let x = 0; x < Match3Config.cols; x++) {

                const tile =
                    this.grid.get(x, y);

                const px =
                    Match3Config.offsetX +
                    tile.gridX *
                    Match3Config.tileSize;

                const py =
                    Match3Config.offsetY +
                    tile.gridY * Match3Config.tileSize;

                tile.container.y = -100;

                const promise =
                    new Promise(resolve => {

                        this.time.delayedCall(
                            index * delayStep,
                            () => {

                                this.tweens.add({

                                    targets: tile.container,

                                    x: px,
                                    y: py,

                                    duration: 200,

                                    ease: "Back.easeOut",

                                    onComplete: resolve

                                });

                            }
                        );

                    });

                animations.push(promise);

                index++;

            }
        }

        await Promise.all(animations);

    }




    moveTile(tile, duration = 120) {

        const px =
            Match3Config.offsetX +
            tile.gridX *
            Match3Config.tileSize;

        const py =
            Match3Config.offsetY +
            tile.gridY *
            Match3Config.tileSize;

        return tile.moveTo(px, py, duration);

    }



    delay(ms) {

        return new Promise(resolve =>
            this.time.delayedCall(
                ms,
                resolve
            )
        );

    }

}
