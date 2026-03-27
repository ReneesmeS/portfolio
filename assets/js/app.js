import { projects } from "./projects-data.js";
import {
    BETA_TILESET,
    BETA_MAP,
    BETA_PLAYER,
    BETA_FRAMES,
    BETA_SCENE,
    BETA_INTERACTIVES,
    BETA_COLLIDERS
} from "./beta-config.js";

const dom = {
    body: document.body,
    classicView: document.getElementById("classic-view"),
    betaView: document.getElementById("beta-view"),
    betaModeButton: document.getElementById("mode-beta"),
    projectGrid: document.getElementById("project-grid"),
    modeButtons: Array.from(document.querySelectorAll("[data-view-mode]")),
    classicFilterButtons: Array.from(document.querySelectorAll("[data-filter-target='classic']")),

    modal: document.getElementById("project-modal"),
    modalTitle: document.getElementById("modal-title"),
    modalContent: document.getElementById("modal-content"),
    modalClose: document.getElementById("modal-close"),

    betaMapShell: document.getElementById("beta-map-shell"),
    betaMap: document.getElementById("beta-map"),
    betaFloor: document.getElementById("beta-floor"),
    betaRugLayer: document.getElementById("beta-rug-layer"),
    betaFurnitureLayer: document.getElementById("beta-furniture-layer"),
    betaDecorationLayer: document.getElementById("beta-decoration-layer"),
    betaInteractionLayer: document.getElementById("beta-interaction-layer"),
    betaPlayer: document.getElementById("beta-player"),
    betaPlayerSprite: document.getElementById("beta-player-sprite"),
    betaCoords: document.getElementById("beta-coords"),
    betaMapHelp: document.getElementById("beta-map-help"),
    betaPanelTitle: document.getElementById("beta-panel-title"),
    betaPanelSub: document.getElementById("beta-panel-sub"),
    betaPanelContent: document.getElementById("beta-panel-content")
};

const state = {
    mode: "classic",
    filter: {
        classic: "all"
    },
    beta: {
        initialized: false,
        scale: 1,
        raf: null,
        lastTs: 0,
        keys: {
            up: false,
            down: false,
            left: false,
            right: false,
            sprint: false
        },
        player: {
            x: BETA_PLAYER.spawn.x,
            y: BETA_PLAYER.spawn.y,
            vx: 0,
            vy: 0,
            target: null,
            pendingPanel: null
        },
        animation: {
            running: false,
            frame: 0,
            accumulator: 0
        },
        activePanel: "about",
        nodes: {
            rugs: [],
            furniture: [],
            decorations: [],
            interactions: []
        }
    }
};

const showcaseConfig = {
    monsterFrames: [
        "assets/showcase/monsters/1.gif",
        "assets/showcase/monsters/2.gif",
        "assets/showcase/monsters/3.gif",
        "assets/showcase/monsters/4.gif"
    ],
    iconFrames: [
        "assets/showcase/symbols/icon-symbol-12.png",
        "assets/showcase/symbols/vector-editor-beta-1.png",
        "assets/showcase/symbols/vector-editor-beta-2.png"
    ],
    classicSpriteActors: [
        { id: "sprite-actor-1", sheet: "assets/showcase/sprites/ever-civilian-9.png", row: 1, frames: 4, speedMs: 135 },
        { id: "sprite-actor-2", sheet: "assets/showcase/sprites/ever-civilian-10.png", row: 0, frames: 4, speedMs: 160 },
        { id: "sprite-actor-3", sheet: "assets/showcase/sprites/capel-actor-sheet.png", row: 102, frames: 4, speedMs: 130 },
        { id: "sprite-actor-4", sheet: "assets/showcase/sprites/capel-ambassador-sheet.png", row: 92, frames: 4, speedMs: 150 },
        { id: "sprite-actor-5", sheet: "assets/showcase/sprites/capel-farmer-sheet.png", row: 69, frames: 9, speedMs: 100 }
    ]
};

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function magnitude(x, y) {
    return Math.hypot(x, y);
}

function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function getProjectMetrics() {
    const research = projects.filter((project) => project.category.includes("research")).length;
    const itch = projects.filter((project) => project.links.some((link) => link.url && link.url.includes("itch.io"))).length;
    return { research, itch };
}

function setGlobalStats() {
    const metrics = getProjectMetrics();
    const projectsNode = document.getElementById("stat-projects");
    const itchNode = document.getElementById("stat-itch");
    const researchNode = document.getElementById("stat-research");
    const yearNode = document.getElementById("year");

    if (projectsNode) {
        projectsNode.textContent = `${projects.length}+`;
    }
    if (itchNode) {
        itchNode.textContent = String(metrics.itch);
    }
    if (researchNode) {
        researchNode.textContent = String(metrics.research);
    }
    if (yearNode) {
        yearNode.textContent = String(new Date().getFullYear());
    }
}

function buildClassicProjectCard(project) {
    const links = project.links
        .map((link) => {
            if (link.action === "modal") {
                return `<button class="mini-btn" type="button" data-open="${project.id}">${link.label}</button>`;
            }
            const primaryClass = link.primary ? " primary" : "";
            return `<a class="mini-btn${primaryClass}" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`;
        })
        .join("");

    const stackTags = project.stack.map((item) => `<span>${item}</span>`).join("");

    return `
        <article class="project-card">
            <div class="project-top">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-kind">${project.label}</span>
            </div>
            <p class="summary">${project.summary}</p>
            <div class="stack">${stackTags}</div>
            <div class="project-actions">${links}</div>
        </article>
    `;
}

function renderClassicProjects() {
    if (!dom.projectGrid) {
        return;
    }
    const filter = state.filter.classic;
    const filteredProjects = projects.filter((project) => (filter === "all" ? true : project.category.includes(filter)));
    dom.projectGrid.innerHTML = filteredProjects.map(buildClassicProjectCard).join("");
}

function openProjectModal(projectId) {
    const project = projects.find((entry) => entry.id === projectId);
    if (!project) {
        return;
    }
    dom.modalTitle.textContent = project.title;
    dom.modalContent.innerHTML = project.details;
    dom.modal.classList.add("open");
    dom.modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    dom.modal.classList.remove("open");
    dom.modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function runSpriteSheetAnimation(actorDefs) {
    const frameWidth = 32;
    const frameHeight = 48;

    actorDefs.forEach((actor) => {
        const actorEl = document.getElementById(actor.id);
        if (!actorEl) {
            return;
        }

        actorEl.style.backgroundImage = `url(${actor.sheet})`;
        let frame = 0;

        const drawFrame = () => {
            const x = -frame * frameWidth;
            const y = -actor.row * frameHeight;
            actorEl.style.backgroundPosition = `${x}px ${y}px`;
            frame = (frame + 1) % actor.frames;
        };

        drawFrame();
        window.setInterval(drawFrame, actor.speedMs);
    });
}

function initClassicShowcase() {
    const monsterRotator = document.getElementById("monster-rotator");
    if (monsterRotator) {
        let index = 0;
        window.setInterval(() => {
            index = (index + 1) % showcaseConfig.monsterFrames.length;
            monsterRotator.src = showcaseConfig.monsterFrames[index];
        }, 2200);
    }

    const iconRotator = document.getElementById("icon-rotator");
    if (iconRotator) {
        let index = 0;
        window.setInterval(() => {
            index = (index + 1) % showcaseConfig.iconFrames.length;
            iconRotator.src = showcaseConfig.iconFrames[index];
        }, 1700);
    }

    const symbolCanvas = document.getElementById("symbol-crop-canvas");
    if (symbolCanvas) {
        const context = symbolCanvas.getContext("2d");
        if (context) {
            const symbolSheet = new Image();
            symbolSheet.src = "assets/showcase/symbols/symbol-sheet-24.png";
            symbolSheet.addEventListener("load", () => {
                const cols = 6;
                const rows = 4;
                const cellW = Math.floor(symbolSheet.width / cols);
                const cellH = Math.floor(symbolSheet.height / rows);

                const drawRandomCell = () => {
                    const col = Math.floor(Math.random() * cols);
                    const row = Math.floor(Math.random() * rows);
                    context.clearRect(0, 0, symbolCanvas.width, symbolCanvas.height);
                    context.fillStyle = "#07111d";
                    context.fillRect(0, 0, symbolCanvas.width, symbolCanvas.height);
                    context.drawImage(
                        symbolSheet,
                        col * cellW,
                        row * cellH,
                        cellW,
                        cellH,
                        0,
                        0,
                        symbolCanvas.width,
                        symbolCanvas.height
                    );
                };

                drawRandomCell();
                window.setInterval(drawRandomCell, 1800);
            });
        }
    }

    runSpriteSheetAnimation(showcaseConfig.classicSpriteActors);
}

function getFrame(frameName) {
    return BETA_FRAMES[frameName] || null;
}

function getScale() {
    return state.beta.scale;
}

function worldToScreen(value) {
    return value * getScale();
}

function mapPointFromEvent(event) {
    const rect = dom.betaMap.getBoundingClientRect();
    const scale = getScale();
    const x = clamp((event.clientX - rect.left) / scale, 0, BETA_MAP.width);
    const y = clamp((event.clientY - rect.top) / scale, 0, BETA_MAP.height);
    return { x, y };
}

function ensureBetaMapScale() {
    if (!dom.betaMapShell || !dom.betaMap) {
        return;
    }

    const shellRect = dom.betaMapShell.getBoundingClientRect();
    const helpHeight = dom.betaMapHelp ? dom.betaMapHelp.offsetHeight + 8 : 0;
    const availableWidth = Math.max(240, shellRect.width - 10);
    const availableHeight = Math.max(180, shellRect.height - helpHeight - 10);

    const scale = Math.max(0.45, Math.min(1.45, Math.min(availableWidth / BETA_MAP.width, availableHeight / BETA_MAP.height)));
    state.beta.scale = scale;

    dom.betaMap.style.width = `${BETA_MAP.width * scale}px`;
    dom.betaMap.style.height = `${BETA_MAP.height * scale}px`;
}

function styleSpriteNode(node, frame, x, y) {
    const scale = getScale();
    const grid = BETA_TILESET.gridSize;
    const sheetWidth = BETA_TILESET.sheet.cols * grid * scale;
    const sheetHeight = BETA_TILESET.sheet.rows * grid * scale;

    node.style.left = `${x * scale}px`;
    node.style.top = `${y * scale}px`;
    node.style.width = `${frame.w * grid * scale}px`;
    node.style.height = `${frame.h * grid * scale}px`;
    node.style.backgroundImage = `url(${BETA_TILESET.image})`;
    node.style.backgroundSize = `${sheetWidth}px ${sheetHeight}px`;
    node.style.backgroundPosition = `-${frame.x * grid * scale}px -${frame.y * grid * scale}px`;
}

function createLayerSpriteNodes(layer, items) {
    layer.innerHTML = "";
    return items
        .map((item) => {
            const frame = getFrame(item.frame);
            if (!frame) {
                return null;
            }
            const node = document.createElement("div");
            node.className = "beta-sprite";
            node.dataset.spriteId = item.id;
            layer.appendChild(node);
            return { item, frame, node };
        })
        .filter(Boolean);
}

function renderFloorLayer() {
    const floorFrame = getFrame(BETA_MAP.floorFrame);
    if (!floorFrame || !dom.betaFloor) {
        return;
    }

    const scale = getScale();
    const grid = BETA_TILESET.gridSize;
    const sheetWidth = BETA_TILESET.sheet.cols * grid * scale;
    const sheetHeight = BETA_TILESET.sheet.rows * grid * scale;
    const tileW = floorFrame.w * grid * scale;
    const tileH = floorFrame.h * grid * scale;

    dom.betaFloor.style.backgroundImage = `url(${BETA_TILESET.image})`;
    dom.betaFloor.style.backgroundRepeat = "repeat";
    dom.betaFloor.style.backgroundSize = `${sheetWidth}px ${sheetHeight}px`;
    dom.betaFloor.style.backgroundPosition = `-${floorFrame.x * grid * scale}px -${floorFrame.y * grid * scale}px`;
    dom.betaFloor.style.imageRendering = "pixelated";
    dom.betaFloor.style.opacity = "0.96";

    if (tileW > 0 && tileH > 0) {
        dom.betaFloor.style.backgroundSize = `${sheetWidth}px ${sheetHeight}px`;
        dom.betaFloor.style.backgroundPosition = `-${floorFrame.x * grid * scale}px -${floorFrame.y * grid * scale}px`;
    }
}

function renderSceneLayers() {
    state.beta.nodes.rugs.forEach((record) => {
        styleSpriteNode(record.node, record.frame, record.item.x, record.item.y);
        record.node.style.zIndex = String(Math.round(record.item.y + record.frame.h * BETA_TILESET.gridSize));
    });

    state.beta.nodes.furniture.forEach((record) => {
        styleSpriteNode(record.node, record.frame, record.item.x, record.item.y);
        record.node.style.zIndex = String(Math.round(record.item.y + record.frame.h * BETA_TILESET.gridSize));
    });

    state.beta.nodes.decorations.forEach((record) => {
        styleSpriteNode(record.node, record.frame, record.item.x, record.item.y);
        record.node.style.zIndex = String(Math.round(record.item.y + record.frame.h * BETA_TILESET.gridSize));
    });
}

function renderInteractionNodes() {
    const scale = getScale();

    state.beta.nodes.interactions.forEach(({ node, item }) => {
        node.style.left = `${item.x * scale}px`;
        node.style.top = `${item.y * scale}px`;
        node.style.width = `${item.w * scale}px`;
        node.style.height = `${item.h * scale}px`;
    });
}

function updatePlayerVisual() {
    const scale = getScale();
    const sprite = BETA_PLAYER.sprite;
    const { player, animation } = state.beta;

    dom.betaPlayer.style.left = `${player.x * scale}px`;
    dom.betaPlayer.style.top = `${player.y * scale}px`;
    dom.betaPlayer.style.width = `${sprite.frameWidth * scale}px`;
    dom.betaPlayer.style.height = `${sprite.frameHeight * scale}px`;
    dom.betaPlayer.style.zIndex = String(1000 + Math.round(player.y));

    dom.betaPlayer.classList.toggle("running", animation.running);
    dom.betaPlayerSprite.style.backgroundImage = `url(${sprite.sheet})`;
    dom.betaPlayerSprite.style.backgroundSize = `${sprite.sheetWidth * scale}px ${sprite.sheetHeight * scale}px`;
    dom.betaPlayerSprite.style.backgroundPosition = `${-animation.frame * sprite.frameWidth * scale}px ${-sprite.runRow * sprite.frameHeight * scale}px`;

    dom.betaCoords.textContent = `X:${Math.round(player.x)} Y:${Math.round(player.y)}`;
}

function intersectsCircleRect(x, y, radius, rect) {
    const nearestX = clamp(x, rect.x, rect.x + rect.w);
    const nearestY = clamp(y, rect.y, rect.y + rect.h);
    const dx = x - nearestX;
    const dy = y - nearestY;
    return dx * dx + dy * dy < radius * radius;
}

function isBlockedAt(x, y) {
    const radius = BETA_PLAYER.colliderRadius;
    return BETA_COLLIDERS.some((rect) => intersectsCircleRect(x, y, radius, rect));
}

function movePlayerWithCollision(dx, dy) {
    const player = state.beta.player;
    const radius = BETA_PLAYER.colliderRadius;

    const nextX = clamp(player.x + dx, radius, BETA_MAP.width - radius);
    if (!isBlockedAt(nextX, player.y)) {
        player.x = nextX;
    }

    const nextY = clamp(player.y + dy, radius, BETA_MAP.height - radius);
    if (!isBlockedAt(player.x, nextY)) {
        player.y = nextY;
    }
}

function setPlayerTarget(target, pendingPanel = null) {
    state.beta.player.target = {
        x: clamp(target.x, BETA_PLAYER.colliderRadius, BETA_MAP.width - BETA_PLAYER.colliderRadius),
        y: clamp(target.y, BETA_PLAYER.colliderRadius, BETA_MAP.height - BETA_PLAYER.colliderRadius)
    };
    state.beta.player.pendingPanel = pendingPanel;
}

function clearPlayerTarget() {
    state.beta.player.target = null;
    state.beta.player.pendingPanel = null;
}

function getDirectionalInput() {
    const { keys } = state.beta;
    let x = 0;
    let y = 0;

    if (keys.left) {
        x -= 1;
    }
    if (keys.right) {
        x += 1;
    }
    if (keys.up) {
        y -= 1;
    }
    if (keys.down) {
        y += 1;
    }

    return { x, y };
}

function getNearestInteractive() {
    const p = state.beta.player;
    let nearest = null;
    let minDistance = Number.POSITIVE_INFINITY;

    BETA_INTERACTIVES.forEach((item) => {
        const center = { x: item.x + item.w / 2, y: item.y + item.h / 2 };
        const d = distance(p, center);
        if (d < minDistance) {
            minDistance = d;
            nearest = { item, center, distance: d };
        }
    });

    return nearest;
}

function setMapHint(text) {
    dom.betaMapHelp.textContent = text;
}

function refreshInteractionHighlights() {
    const nearest = getNearestInteractive();
    const threshold = BETA_PLAYER.interactRange;

    state.beta.nodes.interactions.forEach(({ item, node }) => {
        const center = { x: item.x + item.w / 2, y: item.y + item.h / 2 };
        const isActive = distance(state.beta.player, center) <= threshold;
        node.classList.toggle("active", isActive);
    });

    if (nearest && nearest.distance <= threshold) {
        setMapHint(`${nearest.item.prompt} (${nearest.item.label})`);
    } else {
        setMapHint("Click anywhere to move. Use WASD or arrow keys for smooth movement. Press E or Enter near highlighted objects.");
    }
}

function updatePlayerAnimation(dtMs) {
    const animation = state.beta.animation;
    const sprite = BETA_PLAYER.sprite;

    if (!animation.running) {
        animation.frame = 0;
        animation.accumulator = 0;
        return;
    }

    animation.accumulator += dtMs;
    while (animation.accumulator >= sprite.frameMs) {
        animation.accumulator -= sprite.frameMs;
        animation.frame = (animation.frame + 1) % sprite.runFrames;
    }
}

function tickBetaMovement(dtSec) {
    const input = getDirectionalInput();
    const inputMagnitude = magnitude(input.x, input.y);

    let moveX = 0;
    let moveY = 0;
    let moving = false;

    if (inputMagnitude > 0) {
        clearPlayerTarget();
        const speed = state.beta.keys.sprint ? BETA_PLAYER.sprintSpeed : BETA_PLAYER.moveSpeed;
        const nx = input.x / inputMagnitude;
        const ny = input.y / inputMagnitude;
        moveX = nx * speed * dtSec;
        moveY = ny * speed * dtSec;
        moving = true;
    } else if (state.beta.player.target) {
        const toTargetX = state.beta.player.target.x - state.beta.player.x;
        const toTargetY = state.beta.player.target.y - state.beta.player.y;
        const d = magnitude(toTargetX, toTargetY);

        if (d <= 2.5) {
            const pendingPanel = state.beta.player.pendingPanel;
            clearPlayerTarget();
            if (pendingPanel) {
                activatePanel(pendingPanel);
            }
        } else {
            const nx = toTargetX / d;
            const ny = toTargetY / d;
            const step = Math.min(BETA_PLAYER.moveSpeed * dtSec, d);
            moveX = nx * step;
            moveY = ny * step;
            moving = true;
        }
    }

    state.beta.animation.running = moving;

    if (moving) {
        movePlayerWithCollision(moveX, moveY);
    }

    const nearest = getNearestInteractive();
    if (nearest && state.beta.player.pendingPanel && nearest.item.panelId === state.beta.player.pendingPanel && nearest.distance <= BETA_PLAYER.interactRange) {
        const panelId = state.beta.player.pendingPanel;
        clearPlayerTarget();
        activatePanel(panelId);
    }
}

function betaLoop(ts) {
    if (!state.beta.lastTs) {
        state.beta.lastTs = ts;
    }

    const dtMs = Math.min(40, ts - state.beta.lastTs);
    const dtSec = dtMs / 1000;
    state.beta.lastTs = ts;

    tickBetaMovement(dtSec);
    updatePlayerAnimation(dtMs);
    updatePlayerVisual();
    refreshInteractionHighlights();

    state.beta.raf = window.requestAnimationFrame(betaLoop);
}

function startBetaLoop() {
    if (state.beta.raf) {
        return;
    }
    state.beta.lastTs = 0;
    state.beta.raf = window.requestAnimationFrame(betaLoop);
}

function stopBetaLoop() {
    if (!state.beta.raf) {
        return;
    }
    window.cancelAnimationFrame(state.beta.raf);
    state.beta.raf = null;
    state.beta.animation.running = false;
}

function buildProjectShelfHtml(title, subset) {
    return `
        <p>${title}</p>
        <div class="beta-project-list">
            ${subset
                .map((project) => {
                    const actions = project.links
                        .map((link) => {
                            if (link.action === "modal") {
                                return `<button class="beta-btn" type="button" data-open="${project.id}">${link.label}</button>`;
                            }
                            const primaryClass = link.primary ? " primary" : "";
                            return `<a class="beta-btn${primaryClass}" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`;
                        })
                        .join("");

                    return `
                        <article class="beta-project-card">
                            <h4>${project.title}</h4>
                            <p class="beta-project-summary">${project.summary}</p>
                            <div class="beta-actions">${actions}</div>
                        </article>
                    `;
                })
                .join("")}
        </div>
    `;
}

function getBetaPanels() {
    const firstProjects = projects.slice(0, Math.min(4, projects.length));
    const secondProjects = projects.slice(Math.min(4, projects.length), Math.min(8, projects.length));

    return {
        about: {
            title: "About Me",
            subtitle: "Reception desk terminal",
            content: `
                <p>Hi, I'm Reneesme. I'm a software engineer focused on game systems, algorithmic thinking, and shipping practical products with clean architecture.</p>
                <ul class="beta-list">
                    <li>Engineering Mathematics + Statistics at UC Berkeley.</li>
                    <li>I build web, game, and research systems end to end.</li>
                    <li>Use the room objects to explore my portfolio quickly.</li>
                </ul>
            `
        },
        experience: {
            title: "Experience Timeline",
            subtitle: "Standing clock archive",
            content: `
                <p>Time-oriented projects where architecture and iteration speed mattered most.</p>
                <ul class="beta-list">
                    <li>Production-focused game loops and balancing systems.</li>
                    <li>Modular UI/runtime architecture for rapid feature growth.</li>
                    <li>Practical deployment and maintenance discipline.</li>
                </ul>
            `
        },
        education: {
            title: "Education & Reach",
            subtitle: "Globe knowledge node",
            content: `
                <p>Quantitative training informs design, optimization, and decision quality across all builds.</p>
                <ul class="beta-list">
                    <li>Engineering mathematics and statistical modeling.</li>
                    <li>Algorithm design and constraints-driven problem solving.</li>
                    <li>Cross-disciplinary projects spanning games and tooling.</li>
                </ul>
            `
        },
        skills_frontend: {
            title: "Frontend Skills",
            subtitle: "Blue-red stack",
            content: `
                <ul class="beta-list">
                    <li>React, TypeScript, modern CSS architecture.</li>
                    <li>Canvas-driven interfaces and animation pipelines.</li>
                    <li>Responsive UI design and UX iteration loops.</li>
                </ul>
            `
        },
        skills_backend: {
            title: "Backend Skills",
            subtitle: "Open blue book",
            content: `
                <ul class="beta-list">
                    <li>Python, Flask, and service-oriented architecture.</li>
                    <li>Node.js, Express, Socket.IO real-time systems.</li>
                    <li>Data pipelines, reliability, and deployability.</li>
                </ul>
            `
        },
        skills_tools: {
            title: "Design & Tooling",
            subtitle: "Inkwell and feather",
            content: `
                <ul class="beta-list">
                    <li>Git-centric workflows and modular repo structure.</li>
                    <li>Figma and design-system translation to production CSS.</li>
                    <li>Debugging, profiling, and iterative refinement.</li>
                </ul>
            `
        },
        projects_primary: {
            title: "Project Showcase I",
            subtitle: "Left project shelf",
            content: buildProjectShelfHtml("Major builds and shipped systems:", firstProjects)
        },
        projects_secondary: {
            title: "Project Showcase II",
            subtitle: "Right project shelf",
            content: buildProjectShelfHtml("Additional projects and experiments:", secondProjects)
        },
        contact: {
            title: "Contact & Links",
            subtitle: "Treasure chest",
            content: `
                <p>Use these channels for internships, collaboration, and technical discussions.</p>
                <div class="beta-actions">
                    <a class="beta-btn" href="https://github.com/ReneesmeS" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a class="beta-btn" href="https://linkedin.com/in/lily-yang-625356384" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a class="beta-btn" href="mailto:lily.m.yang@berkeley.edu">Email</a>
                    <a class="beta-btn" href="resume_lily.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                </div>
            `
        }
    };
}

function activatePanel(panelId) {
    const panels = getBetaPanels();
    const panel = panels[panelId] || panels.about;
    state.beta.activePanel = panelId;

    dom.betaPanelTitle.textContent = panel.title;
    dom.betaPanelSub.textContent = panel.subtitle;
    dom.betaPanelContent.innerHTML = panel.content;
}

function moveToInteractive(item) {
    const center = { x: item.x + item.w / 2, y: item.y + item.h / 2 };
    if (distance(state.beta.player, center) <= BETA_PLAYER.interactRange) {
        activatePanel(item.panelId);
        return;
    }
    setPlayerTarget(item.approach || center, item.panelId);
}

function handleInteractionKey() {
    const nearest = getNearestInteractive();
    if (!nearest) {
        return;
    }
    moveToInteractive(nearest.item);
}

function createInteractionNodes() {
    dom.betaInteractionLayer.innerHTML = "";
    state.beta.nodes.interactions = BETA_INTERACTIVES.map((item) => {
        const node = document.createElement("button");
        node.type = "button";
        node.className = "beta-item";
        node.dataset.interactive = item.id;

        const label = document.createElement("span");
        label.className = "beta-item-label";
        label.textContent = item.label;
        node.appendChild(label);

        node.addEventListener("mouseenter", () => setMapHint(item.prompt));
        node.addEventListener("mouseleave", refreshInteractionHighlights);
        node.addEventListener("click", (event) => {
            event.stopPropagation();
            moveToInteractive(item);
        });

        dom.betaInteractionLayer.appendChild(node);
        return { item, node };
    });
}

function rebuildBetaScene() {
    ensureBetaMapScale();
    renderFloorLayer();

    state.beta.nodes.rugs = createLayerSpriteNodes(dom.betaRugLayer, BETA_SCENE.rugs);
    state.beta.nodes.furniture = createLayerSpriteNodes(dom.betaFurnitureLayer, BETA_SCENE.furniture);
    state.beta.nodes.decorations = createLayerSpriteNodes(dom.betaDecorationLayer, BETA_SCENE.decorations);
    createInteractionNodes();

    renderSceneLayers();
    renderInteractionNodes();
    updatePlayerVisual();
    refreshInteractionHighlights();
}

function handleBetaMapClick(event) {
    const clickPoint = mapPointFromEvent(event);
    setPlayerTarget(clickPoint);
}

function initializeBetaScene() {
    if (state.beta.initialized) {
        return;
    }

    // Keep player in its dedicated layer. Rebuilding furniture clears that layer.
    // Re-parenting the player there would remove the sprite from the DOM.

    dom.betaMap.addEventListener("click", handleBetaMapClick);

    state.beta.initialized = true;
    rebuildBetaScene();
    activatePanel(state.beta.activePanel);
}

function setMode(mode) {
    const nextMode = mode === "beta" ? "beta" : "classic";
    state.mode = nextMode;

    dom.classicView.hidden = nextMode !== "classic";
    dom.betaView.hidden = nextMode !== "beta";

    dom.body.classList.toggle("mode-classic", nextMode === "classic");
    dom.body.classList.toggle("mode-beta", nextMode === "beta");

    dom.modeButtons.forEach((button) => {
        const isActive = button.dataset.viewMode === nextMode;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", String(isActive));
    });

    if (nextMode === "beta") {
        initializeBetaScene();
        rebuildBetaScene();
        startBetaLoop();
        window.setTimeout(() => dom.betaMap.focus(), 0);
    } else {
        stopBetaLoop();
        clearPlayerTarget();
    }
}

function setBetaButtonVisibility(isVisible) {
    if (!dom.betaModeButton) {
        return;
    }

    dom.betaModeButton.hidden = !isVisible;
    dom.betaModeButton.setAttribute("aria-hidden", String(!isVisible));
}

function registerBetaConsoleControls() {
    const betaApi = {
        showButton() {
            setBetaButtonVisibility(true);
            return "Beta button is now visible.";
        },
        hideButton() {
            setBetaButtonVisibility(false);
            if (state.mode === "beta") {
                setMode("classic");
            }
            return "Beta button hidden.";
        },
        enter() {
            setBetaButtonVisibility(true);
            setMode("beta");
            return "Entered beta mode.";
        },
        status() {
            return {
                buttonVisible: Boolean(dom.betaModeButton && !dom.betaModeButton.hidden),
                currentMode: state.mode
            };
        }
    };

    window.portfolioBeta = betaApi;
    window.showBetaButton = betaApi.showButton;
    window.hideBetaButton = betaApi.hideButton;
}

function handleGlobalClick(event) {
    const modeButton = event.target.closest("[data-view-mode]");
    if (modeButton) {
        setMode(modeButton.dataset.viewMode);
        return;
    }

    const detailsButton = event.target.closest("[data-open]");
    if (detailsButton) {
        openProjectModal(detailsButton.getAttribute("data-open"));
        return;
    }

    const filterButton = event.target.closest("[data-filter-target='classic']");
    if (!filterButton) {
        return;
    }

    const filter = filterButton.dataset.filter;
    if (!filter) {
        return;
    }

    state.filter.classic = filter;
    dom.classicFilterButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === filter);
    });
    renderClassicProjects();
}

function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    if (state.mode !== "beta") {
        return;
    }

    if (key === "e" || event.key === "Enter") {
        event.preventDefault();
        handleInteractionKey();
        return;
    }

    if (key === "w" || key === "arrowup") {
        state.beta.keys.up = true;
        event.preventDefault();
    } else if (key === "s" || key === "arrowdown") {
        state.beta.keys.down = true;
        event.preventDefault();
    } else if (key === "a" || key === "arrowleft") {
        state.beta.keys.left = true;
        event.preventDefault();
    } else if (key === "d" || key === "arrowright") {
        state.beta.keys.right = true;
        event.preventDefault();
    } else if (key === "shift") {
        state.beta.keys.sprint = true;
    }
}

function handleKeyUp(event) {
    const key = event.key.toLowerCase();

    if (key === "w" || key === "arrowup") {
        state.beta.keys.up = false;
    } else if (key === "s" || key === "arrowdown") {
        state.beta.keys.down = false;
    } else if (key === "a" || key === "arrowleft") {
        state.beta.keys.left = false;
    } else if (key === "d" || key === "arrowright") {
        state.beta.keys.right = false;
    } else if (key === "shift") {
        state.beta.keys.sprint = false;
    }
}

function initListeners() {
    document.addEventListener("click", handleGlobalClick);

    dom.modalClose.addEventListener("click", closeModal);
    dom.modal.addEventListener("click", (event) => {
        if (event.target === dom.modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    window.addEventListener("resize", () => {
        if (state.mode === "beta") {
            rebuildBetaScene();
        }
    });
}

function init() {
    setGlobalStats();
    renderClassicProjects();
    initClassicShowcase();
    initListeners();
    registerBetaConsoleControls();
    setBetaButtonVisibility(false);
    setMode("classic");
}

init();
