# 🔥 Match‑3 Survival

A hybrid **Match‑3 puzzle + Survival game** built with **Phaser 3 and
JavaScript**, inspired by games like *Don't Starve* and *Farm Heroes
Saga*.

Match resources, survive the night, keep the campfire alive, and control
your fear while wild creatures watch from the darkness.

------------------------------------------------------------------------

# 🎮 Gameplay Overview

This is not just a Match‑3 game. Every match directly affects your
survival.

You must manage:

-   🔥 Campfire (keeps darkness away)
-   🍖 Hunger (eat to survive)
-   💧 Thirst (drink to survive)
-   😱 Fear (increases from creatures in darkness)

If any survival stat reaches critical levels --- **you die**.

------------------------------------------------------------------------

# 🧩 Match‑3 Mechanics

Features:

-   Adjacent swap only
-   Invalid swap prevention
-   Infinite cascade system
-   Gravity simulation
-   Smooth animations
-   Combo chains
-   Automatic refill
-   No starting matches

Resources from matches:

  Tile   Resource
  ------ ----------------------
  🔥     Fire
  🪵     Wood
  🪨     Stone
  🍖     Food
  💧     Water
  ⚔️     Sword (reduces Fear)

Sword tiles do NOT go to inventory. They reduce fear instantly.

------------------------------------------------------------------------

# 🏕️ Survival Systems

## Campfire System

The campfire:

-   Consumes fire over time
-   Provides light and safety
-   Has animated flame with intensity levels
-   Extinguishing the fire results in death

Upgrade increases efficiency.

------------------------------------------------------------------------

## Fear System

Wild creatures appear as glowing red eyes in darkness.

They:

-   Spawn randomly around campfire
-   Increase fear randomly (10--100)
-   Cause death if fear reaches 100

Sword matches reduce fear.

------------------------------------------------------------------------

## Hunger and Thirst

Decrease automatically over time.

Must consume:

-   Food → restores hunger
-   Water → restores thirst

------------------------------------------------------------------------

# 🎨 Visual Systems

-   Particle‑based fire animation
-   Dynamic light glow
-   Resource collection animations
-   Cascading gravity animation
-   Clean UI layout

------------------------------------------------------------------------

# 🧱 Architecture

Clean architecture structure:

    src/
    │
    ├── config/
    │   Match3Config.js
    │
    ├── objects/
    │   Tile.js
    │   Campfire.js
    │
    ├── systems/
    │   GridSystem.js
    │   InventorySystem.js
    │   SurvivalSystem.js
    │   CampfireSystem.js
    │   FearSystem.js
    │   WildAnimalSystem.js
    │
    ├── ui/
    │   InventoryUI.js
    │   ActionBarUI.js
    │   BottomPanelUI.js
    │   MessageUI.js
    │
    └── scenes/
        Match3Scene.js

Fully modular and extensible.

------------------------------------------------------------------------

# 🖥️ Controls

Mouse:

-   Click and drag tiles to swap
-   Click action buttons to consume resources
-   Upgrade campfire

------------------------------------------------------------------------

# 🚀 Running the Game

Option 1 (Recommended):

    npx live-server

Option 2:

Open:

    index.html

------------------------------------------------------------------------

# ⚙️ Technologies

-   Phaser 3
-   JavaScript ES Modules
-   HTML5 Canvas
-   Particle Systems
-   Tween Animations

------------------------------------------------------------------------

# 🧠 Game Loop

Core loop:

1.  Match resources
2.  Gain survival materials
3.  Maintain campfire
4.  Control hunger/thirst
5.  Reduce fear
6.  Survive longer

------------------------------------------------------------------------

# 📈 Future Improvements

Possible expansions:

-   Enemies
-   Combat system
-   Crafting
-   Day/Night cycle
-   Sound effects
-   Save system

------------------------------------------------------------------------

# 👤 Author

Developed using Phaser and modern JavaScript.

------------------------------------------------------------------------

# 📄 License

Free for learning and modification.
