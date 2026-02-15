import { Layout }
    from "./Layout.js";

export const Match3Config = {

    cols: 8,
    rows: 8,

    tileSize: 64,

    tileTypes: 4

};

// tamanho do grid
Match3Config.width =
    Match3Config.cols *
    Match3Config.tileSize;

Match3Config.height =
    Match3Config.rows *
    Match3Config.tileSize;

// posição centralizada
Match3Config.offsetX =
    (Layout.leftWidth - Match3Config.width) / 2;

Match3Config.offsetY =
    (Layout.screenHeight - Match3Config.height) / 2;

export const ResourceMap = [
    "wood",
    "stone",
    "food",
    "water"
];

export const ResourceIcons = [
    "🪵", // wood
    "🪨", // stone
    "🍖", // food
    "💧"  // water
];
