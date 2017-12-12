/************************************
 *                                  *
 *              Size                *
 *                                  *
 ************************************/
const WIDTH_PIC = 101; // All pic width
const HEIGHT_PIC = 171; // All pic height

const WIDTH_BLOCK = WIDTH_PIC;
const HEIGHT_BLOCK = 83; // Partly show
const NUM_COL_BLOCKS = 5;
const NUM_ROW_BLOCKS = 6;
const NUM_COL_ROCK_BLOCKS = NUM_COL_BLOCKS;
const NUM_ROW_ROCK_BLOCKS = 3;

const WIDTH_GAME_ZONE_CANVAS = 505; // WIDTH_BLOCK * NUM_COL_BLOCKS
const HEIGHT_GAME_ZONE_CANVAS = 606; // ???

const WIDTH_ENEMY = WIDTH_PIC;
const HEIGHT_ENEMY = 83; // Partly size(visible part)

const WIDTH_PLAYER = 80;
const HEIGHT_PLAYER = WIDTH_PLAYER * HEIGHT_PIC / WIDTH_PIC;

const WIDTH_REWARD = 60;
const HEIGHT_REWARD = WIDTH_REWARD * HEIGHT_PIC / WIDTH_PIC;

const POS_DEFAULT_PLAYER = 22; // first one is 0

// Side Panel
const X_SIDE_PANEL = 0;
const Y_SIDE_PANEL = 0;
const WIDTH_SIDE_PANEL = WIDTH_BLOCK;
const WIDTH_SIDE_PANEL_ICON = 40;
const HEIGHT_SIDE_PANEL_ICON = WIDTH_SIDE_PANEL_ICON * HEIGHT_PIC / WIDTH_PIC;

// Cover
const X_ROLE_PANEL = 0;
const Y_ROLE_PANEL = 83;
const WIDTH_STAR = 55;
const HEIGHT_STAR = WIDTH_STAR * HEIGHT_PIC / WIDTH_PIC;
const WIDTH_COVER_LIFE_ICON = 30;
const HEIGHT_COVER_LIFE_ICON = WIDTH_COVER_LIFE_ICON * HEIGHT_PIC / WIDTH_PIC;
const WIDTH_COVER_LIFE_NUM = 30;
const HEIGHT_COVER_LIFE_NUM = 30;
const WIDTH_ROLE_PANEL = WIDTH_GAME_ZONE_CANVAS;
// const HEIGHT_ROLE_PANEL = HEIGHT_BLOCK + HEIGHT_STAR + HEIGHT_COVER_LIFE_ICON;

/*Page ID*/
const PAGE_COVER = 1;
const PAGE_GAME = 2;
const PAGE_FINISH = 3;

/*Panel item IDs*/
const ID_TYPE_BASE = 1;
const ID_LIFE = 1;
const ID_KEY = 2;
const ID_ROCK = 3;
const ID_GEM_BLUE = 4;
const ID_GEM_GREEN = 5;
const ID_GEM_ORANGE = 6;
const MAX_TYPES = 6;

/*Original values*/
const VALUE_DEFAULT_LIFE = 3;
const VALUE_DEFAULT_KEY = 0;
const VALUE_DEFAULT_ROCK = 0;
const VALUE_DEFAULT_GEM_BLUE = 0;
const VALUE_DEFAULT_GEM_GREEN = 0;
const VALUE_DEFAULT_GEM_ORANGE = 0;

/*Finish layout size*/
const X_TITLE = 252;
const Y_TITLE = 60;
const X_ROLE = 40;
const Y_ROLE = 40;
const WIDTH_REWARD_ICON = 40;
const HEIGHT_REWARD_ICON = WIDTH_REWARD_ICON * HEIGHT_PIC / WIDTH_PIC;
const WIDTH_REWARD_TEXT = WIDTH_REWARD_ICON;
const HEIGHT_REWARD_TEXT = HEIGHT_REWARD_ICON;
const NUM_ROW_REWARDS = 3; // show 1 column first

/********************************
 *                              *
 *            Config            *
 *                              *
 ********************************/
const MIN_REWARDS_PER_ROUND = 3;
const MAX_REWARDS_PER_ROUND = 10;
const MAX_GAME_TIME = 70 * 60; // second
// TODO: extend it later
const ENEMY_COUNT_PER_ROW = [
    2,
    1,
    1
];
const ENEMY_SPEED_BASE_PER_ROW = [
    WIDTH_BLOCK / 3,
    WIDTH_BLOCK / 2,
    WIDTH_BLOCK / 2,
];
const GAME_MODE_SPEED = 0;
const GAME_MODE_NORMAL = 1;

const MIN_SECCESS_REWARDS = 10;

// TODO: change rule of different reward
const MAX_FREEZE_TIME = 5 * 60; // 5s
const MAX_IGNORE_TIME = 5 * 60; // 5s

/*Roles*/
var ROLES = [
    "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png",
    "images/char-princess-girl.png"
]