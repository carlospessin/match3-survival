export class GridSystem {

    constructor(scene, config) {
        this.scene = scene;
        this.config = config;

        this.tiles = [];

        // criar grid vazio
        for (let y = 0; y < config.rows; y++) {
            this.tiles[y] = [];

            for (let x = 0; x < config.cols; x++) {
                this.tiles[y][x] = null;
            }
        }
    }

    get(x, y) {
        if (
            x < 0 ||
            y < 0 ||
            x >= this.config.cols ||
            y >= this.config.rows
        )
            return null;

        return this.tiles[y][x];
    }

    set(x, y, tile) {
        this.tiles[y][x] = tile;

        if (tile) {
            tile.gridX = x;
            tile.gridY = y;
        }
    }

}
