const TILE = 24;
const MAP_WIDTH = 720;
const MAP_HEIGHT = 480;

export const BETA_FRAME_MANIFEST = {
    meta: {
        image: "libassetpack-tiled.png",
        grid_size: 24
    },
    frames: {
        plant1: { x: 1, y: 1, w: 1, h: 1 },
        plant2: { x: 2, y: 1, w: 1, h: 1 },
        plant3: { x: 1, y: 2, w: 1, h: 1 },
        plant4: { x: 2, y: 2, w: 1, h: 1 },
        plant5: { x: 1, y: 3, w: 2, h: 2 },
        standing_clock: { x: 3, y: 1, w: 3, h: 5 },
        chest: { x: 2, y: 6, w: 3, h: 2 },

        rug_red_large_horizontal: { x: 19, y: 1, w: 7, h: 3 },
        rug_red_small_horizontal: { x: 19, y: 5, w: 6, h: 3 },
        rug_red_vertical_flat: { x: 31, y: 1, w: 3, h: 7 },
        rug_red_vertical_stairs: { x: 31, y: 8, w: 3, h: 7 },

        armchair_blue_back: { x: 28, y: 1, w: 2, h: 3 },
        armchair_blue_front: { x: 28, y: 4, w: 2, h: 3 },
        floor_lamp: { x: 26, y: 5, w: 1, h: 2 },

        box_single: { x: 7, y: 1, w: 2, h: 2 },
        box_wide: { x: 7, y: 3, w: 2, h: 2 },
        box_stacked: { x: 7, y: 6, w: 2, h: 2 },

        floor_tile_large: { x: 1, y: 9, w: 2, h: 2 },
        floor_tile_small: { x: 4, y: 9, w: 1, h: 1 },

        standing_book_pink: { x: 10, y: 7, w: 1, h: 1 },
        standing_book_orange: { x: 11, y: 7, w: 1, h: 1 },
        standing_book_yellow: { x: 12, y: 7, w: 1, h: 1 },
        standing_book_green: { x: 13, y: 7, w: 1, h: 1 },
        standing_book_blue: { x: 14, y: 7, w: 1, h: 1 },

        book_stack_blue_red: { x: 10, y: 1, w: 2, h: 2 },
        book_stack_green_brown: { x: 10, y: 4, w: 2, h: 2 },
        book_open_blue: { x: 12, y: 1, w: 2, h: 1 },
        book_stack_tall_mixed: { x: 12, y: 3, w: 2, h: 1 },

        book_closed_red: { x: 15, y: 1, w: 1, h: 1 },
        book_closed_blue_1: { x: 15, y: 2, w: 1, h: 1 },
        book_closed_green: { x: 15, y: 3, w: 1, h: 1 },
        book_closed_blue_2: { x: 15, y: 4, w: 1, h: 1 },
        book_closed_blue_3: { x: 15, y: 5, w: 1, h: 1 },
        book_closed_yellow: { x: 15, y: 6, w: 1, h: 1 },

        paper_list_1: { x: 16, y: 1, w: 1, h: 1 },
        paper_list_2: { x: 16, y: 2, w: 1, h: 1 },
        paper_list_3: { x: 16, y: 3, w: 1, h: 1 },
        paper_envelope: { x: 16, y: 4, w: 1, h: 1 },
        scroll_rolled: { x: 16, y: 5, w: 1, h: 1 },
        scroll_open: { x: 16, y: 6, w: 1, h: 1 },

        pen_single: { x: 17, y: 1, w: 1, h: 1 },
        paper_stack_1: { x: 17, y: 2, w: 1, h: 1 },
        paper_stack_2: { x: 17, y: 3, w: 1, h: 1 },
        teacup: { x: 17, y: 4, w: 1, h: 1 },
        pen_holder: { x: 17, y: 5, w: 1, h: 1 },
        inkwell_feather: { x: 17, y: 6, w: 1, h: 1 },

        globe: { x: 6, y: 9, w: 4, h: 5 },
        bookshelf_side_short: { x: 11, y: 11, w: 1, h: 4 },
        bookshelf_side_tall: { x: 13, y: 9, w: 1, h: 6 },

        table_flat: { x: 15, y: 9, w: 7, h: 4 },
        table_reception: { x: 22, y: 9, w: 9, h: 5 },

        bookshelf_empty: { x: 1, y: 16, w: 4, h: 5 },
        bookshelf_filled_1: { x: 6, y: 15, w: 4, h: 6 },
        bookshelf_filled_2: { x: 11, y: 15, w: 4, h: 6 },
        bookshelf_filled_3: { x: 16, y: 15, w: 4, h: 6 },

        wall_stairs: { x: 40, y: 0, w: 3, h: 6 },
        wall_stairs_left: { x: 39, y: 0, w: 1, h: 7 },
        wall_stairs_right: { x: 41, y: 0, w: 1, h: 7 },
        wall_back: { x: 42, y: 0, w: 4, h: 6 },
        wall_turn_left: { x: 46, y: 0, w: 1, h: 7 },
        wall_turn_right: { x: 51, y: 0, w: 1, h: 7 },
        wall_front: { x: 47, y: 1, w: 3, h: 6 }
    }
};

export const BETA_TILESET = {
    image: `assets/beta/${BETA_FRAME_MANIFEST.meta.image}`,
    gridSize: BETA_FRAME_MANIFEST.meta.grid_size,
    sheet: {
        cols: 62,
        rows: 22
    }
};

export const BETA_MAP = {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    floorFrame: "floor_tile_large"
};

export const BETA_PLAYER = {
    spawn: { x: 356, y: 426 },
    moveSpeed: 240,
    sprintSpeed: 320,
    interactRange: 68,
    colliderRadius: 11,
    sprite: {
        sheet: "assets/showcase/sprites/capel-actor-sheet.png",
        frameWidth: 32,
        frameHeight: 48,
        sheetWidth: 352,
        sheetHeight: 5664,
        runRow: 102,
        runFrames: 4,
        frameMs: 78
    }
};

export const BETA_FRAMES = BETA_FRAME_MANIFEST.frames;

const place = (id, frame, x, y, footprint = null) => ({ id, frame, x, y, footprint });

const TOP_SMALL_TILE_STRIP = Array.from({ length: MAP_WIDTH / TILE }, (_, col) =>
    place(`top-small-floor-${col + 1}`, "floor_tile_small", col * TILE, 0)
);

const TOP_WALLS = [
    place("wall-stairs-left", "wall_stairs_left", 0, TILE, { x: 4, y: 96, w: 16, h: 48 }),
    place("wall-stairs", "wall_stairs", TILE, TILE, { x: 0, y: 96, w: 72, h: 48 }),
    place("wall-stairs-right", "wall_stairs_right", TILE * 4, TILE, { x: 4, y: 96, w: 16, h: 48 }),

    place("wall-back-1", "wall_back", TILE * 5, TILE, { x: 0, y: 96, w: 96, h: 48 }),
    place("wall-turn-left", "wall_turn_left", TILE * 9, TILE, { x: 4, y: 96, w: 16, h: 48 }),
    place("wall-front", "wall_front", TILE * 10, TILE * 2, { x: 0, y: 96, w: 72, h: 48 }),
    place("wall-turn-right", "wall_turn_right", TILE * 13, TILE, { x: 4, y: 96, w: 16, h: 48 }),

    place("wall-back-2", "wall_back", TILE * 14, TILE, { x: 0, y: 96, w: 96, h: 48 }),
    place("wall-back-3", "wall_back", TILE * 18, TILE, { x: 0, y: 96, w: 96, h: 48 }),
    place("wall-back-4", "wall_back", TILE * 22, TILE, { x: 0, y: 96, w: 96, h: 48 }),
    place("wall-back-5", "wall_back", TILE * 26, TILE, { x: 0, y: 96, w: 96, h: 48 })
];

const BACK_BOOKSHELVES = [
    place("bookshelf-back-left", "bookshelf_filled_2", TILE * 16, TILE * 2, { x: 8, y: 120, w: 80, h: 24 }),
    place("bookshelf-back-right", "bookshelf_filled_3", TILE * 20, TILE * 2, { x: 8, y: 120, w: 80, h: 24 })
];

const RECEPTION_BLOCK = [
    place("reception-table", "table_reception", TILE * 11, TILE * 9, { x: 0, y: 80, w: 216, h: 40 }),
    place("reception-chair", "armchair_blue_front", TILE * 14, TILE * 8, { x: 0, y: 40, w: 48, h: 30 }),
    place("reception-lamp", "floor_lamp", TILE * 10, TILE * 8, { x: 0, y: 20, w: 24, h: 24 })
];

const LOUNGE_BLOCK = [
    place("lower-right-table", "table_flat", TILE * 20, TILE * 13, { x: 0, y: 72, w: 168, h: 24 }),
    place("lounge-chair-back-left", "armchair_blue_back", TILE * 20, TILE * 12, { x: 2, y: 48, w: 44, h: 20 }),
    place("lounge-chair-back-right", "armchair_blue_back", TILE * 22, TILE * 12, { x: 2, y: 48, w: 44, h: 20 }),
    place("lounge-chair-front-left", "armchair_blue_front", TILE * 20, TILE * 15, { x: 2, y: 48, w: 44, h: 20 }),
    place("lounge-chair-front-right", "armchair_blue_front", TILE * 22, TILE * 15, { x: 2, y: 48, w: 44, h: 20 })
];

const LANDMARKS = [
    place("grand-clock", "standing_clock", TILE * 11, TILE * 3, { x: 18, y: 96, w: 36, h: 24 }),
    place("central-globe", "globe", TILE * 12, TILE * 14, { x: 8, y: 96, w: 80, h: 24 }),
    place("archive-chest", "chest", TILE * 21, TILE * 9, { x: 8, y: 24, w: 56, h: 24 })
];

const SCATTERED_BOXES = [
    place("box-left", "box_single", TILE * 7, TILE * 15, { x: 4, y: 24, w: 40, h: 16 }),
    place("box-center", "box_wide", TILE * 17, TILE * 12, { x: 4, y: 24, w: 40, h: 16 }),
    place("box-right", "box_stacked", TILE * 25, TILE * 11, { x: 4, y: 24, w: 40, h: 16 })
];

const FLOOR_LITTER = [
    place("book-litter-1", "book_stack_blue_red", TILE * 9, TILE * 12),
    place("book-litter-2", "book_stack_green_brown", TILE * 8, TILE * 13),
    place("book-litter-3", "book_open_blue", TILE * 18, TILE * 10),
    place("book-litter-4", "book_stack_tall_mixed", TILE * 23, TILE * 15),

    place("book-single-red", "book_closed_red", TILE * 6, TILE * 16),
    place("book-single-blue-1", "book_closed_blue_1", TILE * 7, TILE * 16),
    place("book-single-green", "book_closed_green", TILE * 8, TILE * 16),
    place("book-single-blue-2", "book_closed_blue_2", TILE * 9, TILE * 16),
    place("book-single-blue-3", "book_closed_blue_3", TILE * 10, TILE * 16),
    place("book-single-yellow", "book_closed_yellow", TILE * 11, TILE * 16),

    place("paper-list-1", "paper_list_1", TILE * 12, TILE * 10),
    place("paper-list-2", "paper_list_2", TILE * 13, TILE * 10),
    place("paper-list-3", "paper_list_3", TILE * 14, TILE * 10),
    place("paper-envelope", "paper_envelope", TILE * 15, TILE * 10),
    place("scroll-rolled", "scroll_rolled", TILE * 16, TILE * 10),
    place("scroll-open", "scroll_open", TILE * 17, TILE * 10),

    place("pen-single", "pen_single", TILE * 12, TILE * 11),
    place("paper-stack-1", "paper_stack_1", TILE * 13, TILE * 11),
    place("paper-stack-2", "paper_stack_2", TILE * 14, TILE * 11),
    place("teacup", "teacup", TILE * 15, TILE * 11),
    place("pen-holder", "pen_holder", TILE * 16, TILE * 11),
    place("inkwell-feather", "inkwell_feather", TILE * 17, TILE * 11),

    place("standing-book-pink", "standing_book_pink", TILE * 20, TILE * 10),
    place("standing-book-orange", "standing_book_orange", TILE * 21, TILE * 10),
    place("standing-book-yellow", "standing_book_yellow", TILE * 22, TILE * 10),
    place("standing-book-green", "standing_book_green", TILE * 23, TILE * 10),
    place("standing-book-blue", "standing_book_blue", TILE * 24, TILE * 10)
];

const STAIR_RUGS_AND_PLANTS = [
    place("stairs-rug-top", "rug_red_vertical_stairs", TILE, TILE * 2),
    place("stairs-rug-lower", "rug_red_vertical_flat", TILE, TILE * 9),
    place("stairs-rug-base", "rug_red_small_horizontal", TILE * 2, TILE * 15),

    place("stairs-plant-left-top", "plant5", TILE * 0, TILE * 6, { x: 6, y: 40, w: 36, h: 20 }),
    place("stairs-plant-right-top", "plant5", TILE * 4, TILE * 6, { x: 6, y: 40, w: 36, h: 20 }),
    place("stairs-plant-left-bottom", "plant3", TILE * 0, TILE * 15),
    place("stairs-plant-right-bottom", "plant2", TILE * 4, TILE * 15),
    place("stairs-plant-extra-a", "plant1", TILE * 0, TILE * 11),
    place("stairs-plant-extra-b", "plant4", TILE * 4, TILE * 11)
];

const SUPPORT_SHELVES = [
    place("shelf-side-short", "bookshelf_side_short", TILE * 15, TILE * 3),
    place("shelf-side-tall", "bookshelf_side_tall", TILE * 24, TILE * 3)
];

const FURNITURE = [
    ...TOP_WALLS,
    ...BACK_BOOKSHELVES,
    ...RECEPTION_BLOCK,
    ...LOUNGE_BLOCK,
    ...LANDMARKS,
    ...SCATTERED_BOXES,
    ...SUPPORT_SHELVES
];

const DECORATIONS = [
    ...FLOOR_LITTER,
    place("misc-rug-mid", "rug_red_large_horizontal", TILE * 9, TILE * 14),
    place("misc-plant-1", "plant1", TILE * 19, TILE * 17),
    place("misc-plant-2", "plant2", TILE * 26, TILE * 16),
    place("misc-plant-3", "plant3", TILE * 18, TILE * 9),
    place("misc-plant-4", "plant4", TILE * 27, TILE * 12)
];

export const BETA_SCENE = {
    rugs: [...TOP_SMALL_TILE_STRIP, ...STAIR_RUGS_AND_PLANTS],
    furniture: FURNITURE,
    decorations: DECORATIONS
};

export const BETA_INTERACTIVES = [
    {
        id: "about",
        panelId: "about",
        label: "Reception Desk",
        prompt: "Press E to read intro",
        x: TILE * 11,
        y: TILE * 9,
        w: 216,
        h: 120,
        approach: { x: TILE * 14 + 12, y: TILE * 15 }
    },
    {
        id: "experience",
        panelId: "experience",
        label: "Standing Clock",
        prompt: "Press E to open experience",
        x: TILE * 11,
        y: TILE * 3,
        w: 72,
        h: 120,
        approach: { x: TILE * 12 + 12, y: TILE * 9 }
    },
    {
        id: "education",
        panelId: "education",
        label: "Knowledge Globe",
        prompt: "Press E to open education",
        x: TILE * 12,
        y: TILE * 14,
        w: 96,
        h: 120,
        approach: { x: TILE * 14, y: TILE * 19 }
    },
    {
        id: "skills_frontend",
        panelId: "skills_frontend",
        label: "Frontend Stack",
        prompt: "Press E to inspect frontend stack",
        x: TILE * 12,
        y: TILE * 10,
        w: TILE * 2,
        h: TILE * 2,
        approach: { x: TILE * 11 + 8, y: TILE * 13 }
    },
    {
        id: "skills_backend",
        panelId: "skills_backend",
        label: "Backend Notes",
        prompt: "Press E to inspect backend stack",
        x: TILE * 15,
        y: TILE * 10,
        w: TILE * 2,
        h: TILE * 2,
        approach: { x: TILE * 15 + 8, y: TILE * 13 }
    },
    {
        id: "skills_tools",
        panelId: "skills_tools",
        label: "Design Tools",
        prompt: "Press E to inspect tools",
        x: TILE * 17,
        y: TILE * 11,
        w: TILE * 2,
        h: TILE * 2,
        approach: { x: TILE * 18 + 8, y: TILE * 13 }
    },
    {
        id: "projects_primary",
        panelId: "projects_primary",
        label: "Primary Shelf",
        prompt: "Press E for project showcase I",
        x: TILE * 16,
        y: TILE * 2,
        w: TILE * 4,
        h: TILE * 6,
        approach: { x: TILE * 17 + 12, y: TILE * 10 }
    },
    {
        id: "projects_secondary",
        panelId: "projects_secondary",
        label: "Secondary Shelf",
        prompt: "Press E for project showcase II",
        x: TILE * 20,
        y: TILE * 2,
        w: TILE * 4,
        h: TILE * 6,
        approach: { x: TILE * 22 + 12, y: TILE * 10 }
    },
    {
        id: "contact",
        panelId: "contact",
        label: "Archive Chest",
        prompt: "Press E for contact links",
        x: TILE * 21,
        y: TILE * 9,
        w: TILE * 3,
        h: TILE * 2,
        approach: { x: TILE * 22 + 12, y: TILE * 13 }
    }
];

const toCollider = (item) => {
    if (!item.footprint) {
        return null;
    }
    return {
        id: `col-${item.id}`,
        x: item.x + item.footprint.x,
        y: item.y + item.footprint.y,
        w: item.footprint.w,
        h: item.footprint.h
    };
};

export const BETA_COLLIDER_AREAS = FURNITURE
    .concat(STAIR_RUGS_AND_PLANTS)
    .map(toCollider)
    .filter(Boolean);

export const BETA_COLLIDERS = BETA_COLLIDER_AREAS.map(({ id, ...rect }) => rect);
