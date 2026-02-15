export class MatchSystem {

    constructor(grid, inventory) {

        this.grid = grid;
        this.inventory = inventory;

        this.map = [
            "wood",
            "stone",
            "food",
            "water"
        ];

    }

    find() {

        const matches = [];

        // horizontal
        for (let y = 0; y < 8; y++) {

            for (let x = 0; x < 6; x++) {

                const a = this.grid.get(x, y);
                const b = this.grid.get(x + 1, y);
                const c = this.grid.get(x + 2, y);

                if (!a || !b || !c) continue;

                if (
                    a.type === b.type &&
                    b.type === c.type
                ) {

                    matches.push(a, b, c);

                }

            }

        }

        // vertical
        for (let x = 0; x < 8; x++) {

            for (let y = 0; y < 6; y++) {

                const a = this.grid.get(x, y);
                const b = this.grid.get(x, y + 1);
                const c = this.grid.get(x, y + 2);

                if (!a || !b || !c) continue;

                if (
                    a.type === b.type &&
                    b.type === c.type
                ) {

                    matches.push(a, b, c);

                }

            }

        }

        return matches;

    }

    destroy(matches) {

        matches.forEach(tile => {

            if (!tile) return;

            const resource =
                this.map[tile.type];

            this.inventory.add(resource, 1);

            this.grid.set(
                tile.gridX,
                tile.gridY,
                null
            );

            tile.destroy();

        });

    }

}
