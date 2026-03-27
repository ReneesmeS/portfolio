export const projects = [
            {
                id: "symbol-generator",
                category: ["games", "tools"],
                label: "Game + Tool",
                title: "Procedural Symbol Generator (web + desktop)",
                summary: "A deterministic symbol/logo generation platform with interactive evolution, topology-aware icon rendering, and a vector editor beta on top of a shared TypeScript core.",
                stack: ["TypeScript", "React", "Tauri", "SVG", "Evolutionary Algorithms"],
                links: [
                    { label: "Download on itch.io", url: "https://khaki-khameleon.itch.io/procedural-symbol-generator", primary: true },
                    { label: "Read Details", action: "modal" }
                ],
                details: `
                    <p>Symbol Generator is built as a reusable architecture: one deterministic core engine, multiple runtime surfaces (web and desktop), and optional API boundaries.</p>
                    <h4>Highlights</h4>
                    <ul>
                        <li>Implemented seeded graph generation with symmetry controls, constraint handling, and iterative evolution workflows.</li>
                        <li>Built icon pipeline with half-edge topology, face extraction, deterministic palette assignment, and SVG rendering.</li>
                        <li>Developed a Vector Editor beta for direct topology edits, style controls, undo/redo, and export/import workflows.</li>
                    </ul>
                `
            },
            {
                id: "toolbox",
                category: ["tools"],
                label: "Tool",
                title: "Toolbox (ebook conversion + TTS + math OCR)",
                summary: "A Flask web service that handles ebook conversion, chapter-aware text-to-speech, and image-to-LaTeX math OCR with deployment-safe controls.",
                stack: ["Python", "Flask", "OCR", "LaTeX", "Deployment"],
                links: [
                    { label: "Open Service", url: "http://fandasoft.com/", primary: true },
                    { label: "Read Details", action: "modal" }
                ],
                details: `
                    <p>Toolbox is practical software by design: upload, process, download. I focused on reliability and clear UX across several heavy pipelines.</p>
                    <h4>Highlights</h4>
                    <ul>
                        <li>Built conversion pipeline supporting TXT, EPUB, HTML, and PDF with chapter parsing and metadata generation.</li>
                        <li>Implemented chapter-aware TTS batching and archive packaging for long-form audio output.</li>
                        <li>Integrated pix2tex-based math OCR with preprocessing and memory-aware runtime flags for constrained hosting.</li>
                    </ul>
                `
            },
            {
                id: "capel-captain",
                category: ["games"],
                label: "Game",
                title: "Capel Captain (tactical card battler)",
                summary: "A tactical card battler designed and developed end-to-end with real-time AP simulation, Forge crafting/upgrading economy, and an Electron desktop path with Steam P2P diagnostics.",
                stack: ["JavaScript", "HTML/CSS", "Electron", "Steamworks", "Game Systems"],
                links: [
                    { label: "Play Game", url: "https://reneesmes.github.io/Capel-Captain/", primary: true },
                    { label: "Read Details", action: "modal" }
                ],
                details: `
                    <p>Capel Captain is an original game project built from system design through implementation, balancing, and shipping.</p>
                    <h4>Highlights</h4>
                    <ul>
                        <li>Implemented real-time AP loop with continuous regen and immediate AP spend for movement, attacks, and card play.</li>
                        <li>Added Forge systems for card crafting (fragments + gold) and per-card upgrading (chips + gold + success chance).</li>
                        <li>Reworked survival balancing with centralized drop policy, level/turn-band enemy scaling, and nonlinear reward curves.</li>
                        <li>Shipped shared codebase to browser + Electron desktop, with desktop Steam P2P lobby and transport diagnostics.</li>
                    </ul>
                `
            },
            {
                id: "ultra-ordem",
                category: ["games", "tools"],
                label: "Game + Tool",
                title: "Ultra Ordem (real-time multiplayer card platform)",
                summary: "A browser-based multiplayer card platform with server-authoritative adjudication, low-latency room sync, and robust game-state handling.",
                stack: ["Node.js", "Express", "Socket.IO", "JavaScript"],
                links: [
                    { label: "Play Online", url: "https://ultraordem.onrender.com/", primary: true },
                    { label: "Read Details", action: "modal" }
                ],
                details: `
                    <p>Ultra Ordem began as a family use-case and evolved into a stable browser platform for real-time multiplayer card games.</p>
                    <h4>Highlights</h4>
                    <ul>
                        <li>Implemented deterministic server-side rules for Texas Holdem and Zheng Shang You.</li>
                        <li>Designed session and room state management to support concurrent games with predictable updates.</li>
                        <li>Maintained deployed production runtime with health checks and practical ops support.</li>
                    </ul>
                `
            },
            {
                id: "ever-evil",
                category: ["games"],
                label: "Game",
                title: "Ever Evil (Rust + WASM stealth-action simulation)",
                summary: "A systemic top-down stealth/action game with configurable fear, awareness, infamy, and law-enforcement simulation. Built in Rust with macroquad and shipped as both native and web builds.",
                stack: ["Rust", "macroquad", "WASM", "Game AI", "Systems Design"],
                links: [
                    { label: "Play / Download on itch.io", url: "https://khaki-khameleon.itch.io/ever-evil", primary: true },
                    { label: "Read Details", action: "modal" }
                ],
                details: `
                    <p>Ever Evil is my most systems-heavy game build so far. The runtime models social escalation as interacting variables: spotted score, known probability, civilian fear states, awareness thresholds, and dynamic law dispatch.</p>
                    <h4>Highlights</h4>
                    <ul>
                        <li>Implemented deterministic formulas for infamy and identification, including weighted witness contributions and configurable scaling.</li>
                        <li>Designed civilian behavior overrides (react, identify, track, dial 911, bravery) with timed transitions and cooldown logic.</li>
                        <li>Built multi-state law-enforcement AI (patrol, pursue, attack) with quota management tied to awareness and emergency calls.</li>
                        <li>Integrated sprite-sheet actor rendering (idle/run/die frame conventions) and retained color-coded threat readability.</li>
                        <li>Shipped native packaging plus browser WASM build, with runtime config and records persistence.</li>
                    </ul>
                `
            },
            {
                id: "pixel-monster-maker",
                category: ["tools"],
                label: "Tool",
                title: "Pixel Monster Maker (procedural sprite generator)",
                summary: "A browser-native TypeScript app that procedurally generates pixel monsters via seeded map synthesis, cellular automata, palette generation, and deterministic flood-fill coloring.",
                stack: ["TypeScript", "Vite", "Canvas", "Procedural Generation"],
                links: [
                    { label: "Play on itch.io", url: "https://khaki-khameleon.itch.io/pixel-monster-generator", primary: true },
                    { label: "Read Details", action: "modal" }
                ],
                details: `
                    <p>This project focuses on reproducible procedural art. I split the generation pipeline into modular stages so each stage is testable and tunable.</p>
                    <h4>Highlights</h4>
                    <ul>
                        <li>Built end-to-end generation flow: symmetry-aware map generation, smoothing, palette synthesis, and grouped color assignment.</li>
                        <li>Used deterministic seeds for map and fill operations to keep outputs reproducible across runs.</li>
                        <li>Added export helpers for PNG and sprite sheets, and designed the UI for quick iterative experimentation.</li>
                    </ul>
                `
            },
            {
                id: "pixel-sprite-maker",
                category: ["games", "tools"],
                label: "Game + Tool",
                title: "Pixel Sprite Maker (beta generation experiments)",
                summary: "A sprite-creation tool where I focused on original beta generators: a Markov head model with structure controls and a deterministic shape-grammar head generator.",
                stack: ["JavaScript", "Canvas", "Markov Models", "Procedural Geometry"],
                links: [
                    { label: "Read Details", action: "modal" }
                ],
                details: `
                    <p>For this repo, my focus is the beta generation research I implemented, not the inherited base sprite style pipeline.</p>
                    <h4>Highlights</h4>
                    <ul>
                        <li>Built Markov beta head generator with layered 2D contexts, patch consensus boosts, entropy controls, and post-generation structure repair.</li>
                        <li>Implemented Shape Grammar beta head generator with deterministic composable geometry blocks (hat/mask/replacement/floating items).</li>
                        <li>Added deterministic merge workflows, outline policies, and metadata export/import for reproducible generation state.</li>
                        <li>Kept attribution boundaries explicit by documenting that core original sprite style assets are derivative work.</li>
                    </ul>
                `
            },
            {
                id: "gemini-export",
                category: ["tools"],
                label: "Tool",
                title: "Gemini Chat Exporter (Chrome extension)",
                summary: "A Manifest V3 extension that exports Gemini conversations to Markdown and Word while preserving structure, code blocks, tables, and math expressions.",
                stack: ["JavaScript", "Chrome Extension", "docx", "LaTeX Processing"],
                links: [
                    { label: "View Code", url: "https://github.com/ReneesmeS/gemini-chat-exporter-math", primary: true },
                    { label: "Read Details", action: "modal" }
                ],
                details: `
                    <p>I built this extension to solve a real workflow problem: preserving rich technical chat content in shareable document formats.</p>
                    <h4>Highlights</h4>
                    <ul>
                        <li>Implemented resilient DOM extraction across conversation structures (lists, tables, headings, code, quotes).</li>
                        <li>Built modular exporter architecture with format-specific rendering for Markdown and DOCX.</li>
                        <li>Added LaTeX normalization logic for improved compatibility with Word math rendering.</li>
                    </ul>
                `
            },
            {
                id: "level-up-j",
                category: ["tools"],
                label: "Tool",
                title: "Level Up J (offline-first study PWA)",
                summary: "A local-first PWA that gamifies focus sessions with XP, rewards, and loot mechanics, with service-worker offline support and anti-cheat behavior.",
                stack: ["JavaScript", "PWA", "Local Storage", "UX"],
                links: [
                    { label: "Open App", url: "http://fandasoft.com/levelupj", primary: true },
                    { label: "Read Details", action: "modal" }
                ],
                details: `
                    <p>Level Up J began as a motivation project and grew into a polished local-first product with clear progression loops and persistence.</p>
                    <h4>Highlights</h4>
                    <ul>
                        <li>Implemented focus-session reward economy with configurable progression and rarity-driven loot probabilities.</li>
                        <li>Added service worker + manifest architecture for offline app-shell behavior.</li>
                        <li>Designed anti-cheat focus mode that pauses active sessions when the app is backgrounded.</li>
                    </ul>
                `
            },
            {
                id: "bin-packing",
                category: ["research"],
                label: "Research",
                title: "3D Bin Packing Optimization Research",
                summary: "Research project on logistics optimization using Satisfiability Modulo Theories (SMT), achieving about 5% better packing efficiency than baseline heuristics.",
                stack: ["Optimization", "SMT", "Algorithms", "Research"],
                links: [{ label: "Read Details", action: "modal", primary: false }],
                details: `
                    <p>In this research project, I modeled the 3D bin packing problem as a constrained optimization task and benchmarked solver-based methods against heuristics.</p>
                    <h4>Highlights</h4>
                    <ul>
                        <li>Formulated non-overlap and placement constraints for solver-compatible optimization.</li>
                        <li>Compared SMT-based search to common heuristic baselines for utilization quality.</li>
                        <li>Reported measurable improvement in packing efficiency with practical logistics relevance.</li>
                    </ul>
                `
            },
            {
                id: "book-rec",
                category: ["research"],
                label: "Research",
                title: "Book Recommendation System (Naive Bayes)",
                summary: "Independent research implementing a Naive Bayes recommendation model and comparing content-based and collaborative filtering trade-offs.",
                stack: ["Python", "Machine Learning", "Statistics", "Data Analysis"],
                links: [{ label: "Read Details", action: "modal", primary: false }],
                details: `
                    <p>This work focused on statistical learning for recommendation under sparse preference signals.</p>
                    <h4>Highlights</h4>
                    <ul>
                        <li>Implemented Naive Bayes classifier pipeline from preprocessing through evaluation.</li>
                        <li>Compared recommendation strategies for precision, coverage, and practical behavior.</li>
                        <li>Documented strengths and limitations to guide model selection under different constraints.</li>
                    </ul>
                `
            },
            {
                id: "route-opt",
                category: ["research"],
                label: "Research",
                title: "Route Optimization for Local Logistics",
                summary: "Applied graph algorithms to optimize delivery routes during lockdown conditions, moving from DFS baselines to branch-and-bound with greedy bounds.",
                stack: ["Graph Theory", "Branch and Bound", "Python", "Applied Algorithms"],
                links: [{ label: "Read Details", action: "modal", primary: false }],
                details: `
                    <p>I built this during COVID to help a local bakery improve route planning under time pressure and limited resources.</p>
                    <h4>Highlights</h4>
                    <ul>
                        <li>Modeled locations and travel costs as weighted graph search problems.</li>
                        <li>Used nearest-neighbor heuristics to tighten branch-and-bound upper bounds.</li>
                        <li>Iteratively improved solution quality and runtime compared with straightforward search.</li>
                    </ul>
                `
            }
        ];
