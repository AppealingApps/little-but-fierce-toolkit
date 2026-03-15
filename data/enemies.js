const ENEMIES = [
  // ─── DL 0 (2 XP) ───────────────────────────────────────────────────────────
  {
    id: "awakened-weed",
    name: "Awakened Weed",
    type: "Plant",
    dl: 0,
    xp: 2,
    hp: 6,
    str: -1, spd: 2, smt: 3, sml: 1,
    move: "4",
    awareness: 8,
    defence: 7,
    attacks: [
      { name: "Branches", range: "Close", roll: "+4", damage: "1d4+1" }
    ],
    abilities: ["Flammable (double fire damage)", "Blends In (looks like normal plant)"]
  },
  {
    id: "cat",
    name: "Cat",
    type: "Animal",
    dl: 0,
    xp: 2,
    hp: 1,
    str: -1, spd: 5, smt: 1, sml: 1,
    move: "8",
    awareness: 8,
    defence: 10,
    attacks: [
      { name: "Claws", range: "Close", roll: "+1", damage: "1" }
    ],
    abilities: ["Darkvision", "Good Nose (finding tests with good luck)"]
  },
  {
    id: "eagle",
    name: "Eagle",
    type: "Animal",
    dl: 0,
    xp: 2,
    hp: 4,
    str: 1, spd: 5, smt: 2, sml: 1,
    move: "2 (fly 12)",
    awareness: 9,
    defence: 10,
    attacks: [
      { name: "Talons", range: "Close", roll: "+7", damage: "1d4+5" }
    ],
    abilities: ["Good Eyes (finding tests with good luck)", "Flight"]
  },
  {
    id: "goat",
    name: "Goat",
    type: "Animal",
    dl: 0,
    xp: 2,
    hp: 8,
    str: 4, spd: 3, smt: 1, sml: 0,
    move: "8",
    awareness: 6,
    defence: 8,
    attacks: [
      { name: "Horns", range: "Close", roll: "+6", damage: "1d4+4" }
    ],
    abilities: ["Good Balance (speed resistance with good luck)", "Charge: +1d4 damage after 4+ units, STR DC 8 or fall down"]
  },
  {
    id: "octopus",
    name: "Octopus",
    type: "Animal",
    dl: 0,
    xp: 2,
    hp: 3,
    str: 0, spd: 5, smt: 1, sml: 0,
    move: "1 (swim 6)",
    awareness: 8,
    defence: 10,
    attacks: [
      { name: "Tentacles", range: "Close", roll: "+7", damage: "1" }
    ],
    abilities: ["Swim", "Camouflage (hiding underwater with good luck)", "Water Breathing (underwater only)", "Ink Cloud (once per rest — Dash as small action after)"]
  },
  {
    id: "rat",
    name: "Rat",
    type: "Animal",
    dl: 0,
    xp: 2,
    hp: 1,
    str: -1, spd: 3, smt: 5, sml: 0,
    move: "4",
    awareness: 10,
    defence: 8,
    attacks: [
      { name: "Bite", range: "Close", roll: "+3", damage: "1" }
    ],
    abilities: ["Darkvision", "Good Nose (finding with good luck)"]
  },
  {
    id: "villager",
    name: "Villager",
    type: "Person",
    dl: 0,
    xp: 2,
    hp: 7,
    str: 3, spd: 3, smt: 3, sml: 3,
    move: "6",
    awareness: 10,
    defence: 8,
    attacks: [
      { name: "Club", range: "Close", roll: "+5", damage: "1d4+3" }
    ],
    abilities: ["Languages: Common"]
  },

  // ─── DL 1 (3 XP) ───────────────────────────────────────────────────────────
  {
    id: "bandit",
    name: "Bandit",
    type: "Person",
    dl: 1,
    xp: 3,
    hp: 14,
    str: 3, spd: 4, smt: 3, sml: 3,
    move: "6",
    awareness: 8,
    defence: 10,
    attacks: [
      { name: "Shortsword", range: "Close", roll: "+6", damage: "1d6+4" },
      { name: "Light Crossbow", range: "Ranged 64", roll: "+6", damage: "1d6+4" }
    ],
    abilities: ["Equipment: Leather armour, shortsword, light crossbow", "Languages: Common"]
  },
  {
    id: "dog",
    name: "Dog",
    type: "Animal",
    dl: 1,
    xp: 3,
    hp: 8,
    str: 4, spd: 5, smt: 2, sml: 1,
    move: "8",
    awareness: 9,
    defence: 10,
    attacks: [
      { name: "Bite", range: "Close", roll: "+6", damage: "1d6+4" }
    ],
    abilities: ["Good Nose (finding with good luck)", "Bite: STR DC 9 or fall down on hit"]
  },
  {
    id: "giant-rat",
    name: "Giant Rat",
    type: "Animal",
    dl: 1,
    xp: 3,
    hp: 9,
    str: 1, spd: 5, smt: -1, sml: 0,
    move: "6",
    awareness: 4,
    defence: 10,
    attacks: [
      { name: "Bite", range: "Close", roll: "+7", damage: "1d4+5" }
    ],
    abilities: ["Darkvision", "Good Nose", "Pack Attack (attack with good luck when friend adjacent)"]
  },
  {
    id: "guard",
    name: "Guard",
    type: "Person",
    dl: 1,
    xp: 3,
    hp: 17,
    str: 4, spd: 4, smt: 3, sml: 3,
    move: "6",
    awareness: 10,
    defence: 16,
    attacks: [
      { name: "Spear", range: "Close or Thrown 12", roll: "+6", damage: "1d6+4" }
    ],
    abilities: ["Equipment: Chain mail, shield, spear", "Languages: Common"]
  },
  {
    id: "merfolk",
    name: "Merfolk",
    type: "Person",
    dl: 1,
    xp: 3,
    hp: 14,
    str: 3, spd: 4, smt: 3, sml: 4,
    move: "2 (swim 8)",
    awareness: 10,
    defence: 9,
    attacks: [
      { name: "Spear", range: "Close or Thrown 12", roll: "+5", damage: "1d8+5" }
    ],
    abilities: ["Swim", "Land and Sea (breathes air and water)", "Languages: Common, Seaspeak"]
  },

  // ─── DL 2 (5 XP) ───────────────────────────────────────────────────────────
  {
    id: "giant-centipede",
    name: "Giant Centipede",
    type: "Animal",
    dl: 2,
    xp: 5,
    hp: 3,
    str: 0, spd: 5, smt: 0, sml: -1,
    move: "6",
    awareness: 5,
    defence: 11,
    attacks: [
      { name: "Bite", range: "Close", roll: "+7", damage: "1d4+5" }
    ],
    abilities: ["Perfect Senses (uses senses other than sight)", "Natural Climber (full movement on walls/ceilings)", "Bite: STR DC 9 or take 3d6 poison damage"]
  },
  {
    id: "goblin-scout",
    name: "Goblin Scout",
    type: "Person",
    dl: 2,
    xp: 5,
    hp: 11,
    str: 2, spd: 5, smt: 2, sml: 2,
    move: "6",
    awareness: 7,
    defence: 14,
    attacks: [
      { name: "Shortsword", range: "Close", roll: "+7", damage: "1d6+5" },
      { name: "Shortbow", range: "Ranged 64", roll: "+7", damage: "1d6+5" }
    ],
    abilities: ["Darkvision", "Sneaky Escape (Hide as small action)", "Equipment: Leather + shield, shortsword, shortbow", "Languages: Common, Goblin"]
  },
  {
    id: "horse",
    name: "Horse",
    type: "Animal",
    dl: 2,
    xp: 5,
    hp: 21,
    str: 6, spd: 3, smt: 1, sml: 1,
    move: "12",
    awareness: 6,
    defence: 8,
    attacks: [
      { name: "Hooves", range: "Close", roll: "+5", damage: "2d4+6" }
    ],
    abilities: []
  },
  {
    id: "skeleton",
    name: "Skeleton",
    type: "Lost",
    dl: 2,
    xp: 5,
    hp: 19,
    str: 3, spd: 5, smt: 1, sml: 0,
    move: "6",
    awareness: 6,
    defence: 12,
    attacks: [
      { name: "Shortsword", range: "Close", roll: "+7", damage: "1d6+5" },
      { name: "Shortbow", range: "Ranged 64", roll: "+7", damage: "1d6+5" }
    ],
    abilities: ["Hardy (immune to poison damage)", "Equipment: Leather armour, shortsword, shortbow"]
  },
  {
    id: "sprite",
    name: "Sprite",
    type: "Marvel",
    dl: 2,
    xp: 5,
    hp: 1,
    str: -1, spd: 7, smt: 4, sml: 3,
    move: "2 (fly 8)",
    awareness: 11,
    defence: 13,
    attacks: [
      { name: "Longsword", range: "Close", roll: "+5", damage: "1" },
      { name: "Longbow", range: "Ranged 120", roll: "+9", damage: "1" }
    ],
    abilities: ["Flight", "Longbow hit: STR DC 3 or fall asleep for 1 minute", "Languages: Common, Elvish, Fey"]
  },
  {
    id: "wolf",
    name: "Wolf",
    type: "Animal",
    dl: 2,
    xp: 5,
    hp: 9,
    str: 4, spd: 5, smt: 1, sml: 1,
    move: "8",
    awareness: 8,
    defence: 11,
    attacks: [
      { name: "Bite", range: "Close", roll: "+7", damage: "2d4+5" }
    ],
    abilities: ["Good Nose", "Pack Attack", "Bite: STR DC 9 or fall down"]
  },
  {
    id: "zombie",
    name: "Zombie",
    type: "Lost",
    dl: 2,
    xp: 5,
    hp: 24,
    str: 4, spd: 1, smt: 0, sml: 0,
    move: "4",
    awareness: 5,
    defence: 6,
    attacks: [
      { name: "Nails", range: "Close", roll: "+6", damage: "1d6+4" }
    ],
    abilities: ["Just Keeps Coming (when dropping to 0 HP, STR resistance vs. damage taken; pass = drops to 1 HP instead)"]
  },

  // ─── DL 3 (8 XP) ───────────────────────────────────────────────────────────
  {
    id: "ape",
    name: "Ape",
    type: "Animal",
    dl: 3,
    xp: 8,
    hp: 30,
    str: 6, spd: 5, smt: 3, sml: 1,
    move: "6",
    awareness: 10,
    defence: 10,
    attacks: [
      { name: "Fists", range: "Close", roll: "+8", damage: "1d6+6" },
      { name: "Rock", range: "Thrown 10", roll: "+8", damage: "1d6+6" }
    ],
    abilities: ["Natural Climber (full movement on walls)", "Attacks twice per turn"]
  },
  {
    id: "bear",
    name: "Bear",
    type: "Animal",
    dl: 3,
    xp: 8,
    hp: 27,
    str: 5, spd: 3, smt: 2, sml: 1,
    move: "8",
    awareness: 9,
    defence: 9,
    attacks: [
      { name: "Bite", range: "Close", roll: "+7", damage: "1d6+5" },
      { name: "Claws", range: "Close", roll: "+7", damage: "2d4+5" }
    ],
    abilities: ["Good Nose", "Attacks once with bite AND once with claws each turn"]
  },
  {
    id: "giant-wasp",
    name: "Giant Wasp",
    type: "Animal",
    dl: 3,
    xp: 8,
    hp: 21,
    str: 0, spd: 5, smt: 1, sml: -1,
    move: "2 (fly 10)",
    awareness: 6,
    defence: 10,
    attacks: [
      { name: "Sting", range: "Close", roll: "+7", damage: "1d6+5" }
    ],
    abilities: ["Flight (5× movement)", "Sting: STR DC 9 or take 3d6 poison damage"]
  },
  {
    id: "orc-warrior",
    name: "Orc Warrior",
    type: "Person",
    dl: 3,
    xp: 8,
    hp: 21,
    str: 6, spd: 4, smt: 4, sml: 3,
    move: "6",
    awareness: 9,
    defence: 11,
    attacks: [
      { name: "Huge Axe", range: "Close", roll: "+8", damage: "1d12+6" },
      { name: "Spear", range: "Close or Thrown 12", roll: "+8", damage: "1d8+6" }
    ],
    abilities: ["Darkvision", "Charge (Dash as small action toward enemy)", "Equipment: Thick fur, huge axe, spear", "Languages: Common, Orc"]
  },
  {
    id: "shark",
    name: "Shark",
    type: "Animal",
    dl: 3,
    xp: 8,
    hp: 36,
    str: 5, spd: 4, smt: 1, sml: 0,
    move: "swim 8",
    awareness: 8,
    defence: 10,
    attacks: [
      { name: "Bite", range: "Close", roll: "+7", damage: "1d8+5" }
    ],
    abilities: ["Perfect Senses", "Pack Attack", "Water Breathing (underwater only)"]
  },
  {
    id: "thug",
    name: "Thug",
    type: "Person",
    dl: 3,
    xp: 8,
    hp: 55,
    str: 5, spd: 3, smt: 3, sml: 3,
    move: "6",
    awareness: 8,
    defence: 9,
    attacks: [
      { name: "Shortsword", range: "Close", roll: "+7", damage: "1d6+5" },
      { name: "Heavy Crossbow", range: "Ranged 80", roll: "+5", damage: "1d10+3" }
    ],
    abilities: ["Pack Attack", "Attacks twice per turn", "Equipment: Leather, shortsword, heavy crossbow", "Languages: Common"]
  },

  // ─── DL 4 (13 XP) ──────────────────────────────────────────────────────────
  {
    id: "dryad",
    name: "Dryad",
    type: "Marvel",
    dl: 4,
    xp: 13,
    hp: 35,
    str: 3, spd: 4, smt: 5, sml: 7,
    move: "6",
    awareness: 12,
    defence: 9,
    attacks: [
      { name: "Club", range: "Close", roll: "+5", damage: "1d4+3" }
    ],
    abilities: ["Darkvision", "Spell Resistance (resistance rolls vs. spells with good luck)", "Nature's Charm (SMT DC 12 or charmed)", "Travel by Tree (step into one tree, emerge from another up to 12 units away)", "Spellcaster", "Languages: Common, Elvish, Fey"]
  },
  {
    id: "fierce-barbarian",
    name: "Fierce Barbarian",
    type: "Person",
    dl: 4,
    xp: 13,
    hp: 108,
    str: 6, spd: 4, smt: 3, sml: 2,
    move: "6",
    awareness: 10,
    defence: 11,
    attacks: [
      { name: "Huge Axe", range: "Close", roll: "+8", damage: "1d12+6" }
    ],
    abilities: ["Going Wild (start of turn — all attacks this turn with good luck, BUT attacks against them also with good luck)", "Equipment: Thick furs, huge axe", "Languages: Common"]
  },
  {
    id: "ghoul",
    name: "Ghoul",
    type: "Lost",
    dl: 4,
    xp: 13,
    hp: 40,
    str: 4, spd: 5, smt: 2, sml: 1,
    move: "6",
    awareness: 7,
    defence: 10,
    attacks: [
      { name: "Bite", range: "Close", roll: "+5", damage: "2d6+5" },
      { name: "Claws", range: "Close", roll: "+8", damage: "2d4+5" }
    ],
    abilities: ["Darkvision", "Focused Mind (can't be charmed)", "Hardy (immune to poison)", "Claw hit: STR DC 7 or Stopped for 1 minute", "Languages: Common"]
  },
  {
    id: "giant-spider",
    name: "Giant Spider",
    type: "Animal",
    dl: 4,
    xp: 13,
    hp: 40,
    str: 5, spd: 6, smt: 1, sml: 0,
    move: "6",
    awareness: 6,
    defence: 12,
    attacks: [
      { name: "Bite", range: "Close", roll: "+8", damage: "1d4+6" },
      { name: "Web", range: "Ranged 12", roll: "+8", damage: "none" }
    ],
    abilities: ["Perfect Senses", "Natural Climber (walls and ceilings)", "Bite: STR DC 9 or 2d8 poison", "Web: STR DC 10 or stuck; escape with big action STR DC 10"]
  },
  {
    id: "spy",
    name: "Spy",
    type: "Person",
    dl: 4,
    xp: 13,
    hp: 42,
    str: 3, spd: 5, smt: 4, sml: 6,
    move: "6",
    awareness: 11,
    defence: 10,
    attacks: [
      { name: "Shortsword", range: "Close", roll: "+7", damage: "1d6+5" },
      { name: "Light Crossbow", range: "Ranged 64", roll: "+7", damage: "1d6+5" }
    ],
    abilities: ["Sneak Attack (extra 1d6 when hidden or adjacent ally present)", "Quick Thinking (Dash or Hide as small action)", "Invisibility (small action)", "Attacks twice per turn", "Languages: Common + one other"]
  },
  {
    id: "tiger",
    name: "Tiger",
    type: "Animal",
    dl: 4,
    xp: 13,
    hp: 55,
    str: 6, spd: 5, smt: 2, sml: 2,
    move: "8",
    awareness: 9,
    defence: 10,
    attacks: [
      { name: "Bite", range: "Close", roll: "+8", damage: "1d10+8" },
      { name: "Claws", range: "Close", roll: "+8", damage: "1d8+8" }
    ],
    abilities: ["Good Nose", "Claw hit after 4+ unit move: STR DC 11 or fall down, then free bite attack"]
  },

  // ─── DL 5 (22 XP) ──────────────────────────────────────────────────────────
  {
    id: "apprentice-mage",
    name: "Apprentice Mage",
    type: "Person",
    dl: 5,
    xp: 22,
    hp: 42,
    str: 3, spd: 5, smt: 4, sml: 5,
    move: "6",
    awareness: 9,
    defence: 10,
    attacks: [
      { name: "Dagger", range: "Close", roll: "+7", damage: "1d4+5" }
    ],
    abilities: ["Spell Resistance", "Spellcaster (Smarts; Atk +7; Force 10)", "Spells: Fire Bolt, Message, Party Tricks, Magic Missile, Charm, Magic Armour, Stop Person, Mirror Image", "Attacks twice per turn", "Languages: Common"]
  },
  {
    id: "awakened-tree",
    name: "Awakened Tree",
    type: "Plant",
    dl: 5,
    xp: 22,
    hp: 105,
    str: 7, spd: 1, smt: 3, sml: 1,
    move: "4",
    awareness: 8,
    defence: 11,
    attacks: [
      { name: "Branches", range: "Close", roll: "+9", damage: "3d6+7" }
    ],
    abilities: ["Flammable (double fire damage)", "Very Tough (halve non-magical normal damage)", "Blends In (looks like normal tree)"]
  },
  {
    id: "bandit-leader",
    name: "Bandit Leader",
    type: "Person",
    dl: 5,
    xp: 22,
    hp: 90,
    str: 5, spd: 6, smt: 4, sml: 5,
    move: "6",
    awareness: 9,
    defence: 12,
    attacks: [
      { name: "Shortsword", range: "Close", roll: "+8", damage: "1d6+6" },
      { name: "Dagger", range: "Close or Thrown 12", roll: "+8", damage: "1d4+6" }
    ],
    abilities: ["Parry (small action — +2 defence vs. next close attack)", "Attacks twice with shortsword + once with dagger; or twice with thrown daggers", "Equipment: Leather, shortsword, many daggers", "Languages: Common + one other"]
  },
  {
    id: "black-dragon-hatchling",
    name: "Black Dragon Hatchling",
    type: "Marvel",
    dl: 5,
    xp: 22,
    hp: 54,
    str: 5, spd: 5, smt: 3, sml: 4,
    move: "6 (fly 12, swim 6)",
    awareness: 10,
    defence: 15,
    attacks: [
      { name: "Bite", range: "Close", roll: "+7", damage: "2d8+5" },
      { name: "Acid Breath", range: "Line 3×1 units", roll: "—", damage: "3d20 acid (SPD DC 9, half on pass)" }
    ],
    abilities: ["Perfect Darkvision", "Flight", "Swim", "Acid Scales (immune to acid)", "Land and Sea", "Acid Breath recharges after 2 full rounds", "Languages: Draconic"]
  },
  {
    id: "gargoyle",
    name: "Gargoyle",
    type: "Construct",
    dl: 5,
    xp: 22,
    hp: 63,
    str: 5, spd: 3, smt: 2, sml: 1,
    move: "6 (fly 12)",
    awareness: 7,
    defence: 13,
    attacks: [
      { name: "Claws", range: "Close", roll: "+7", damage: "1d6+5" }
    ],
    abilities: ["Darkvision", "Flight", "Very Tough (halve non-magical normal damage)", "Blends In (looks like normal statue)", "Attacks twice per turn", "Languages: Ancient"]
  },
  {
    id: "ogre",
    name: "Ogre",
    type: "Marvel",
    dl: 5,
    xp: 22,
    hp: 84,
    str: 7, spd: 2, smt: 1, sml: 1,
    move: "8",
    awareness: 6,
    defence: 9,
    attacks: [
      { name: "Huge Club", range: "Close", roll: "+9", damage: "2d8+7" },
      { name: "Spear", range: "Close or Thrown 12", roll: "+9", damage: "2d6+7" }
    ],
    abilities: ["Darkvision", "Equipment: Thick fur, huge club, spear", "Languages: Common, Giant"]
  },
  {
    id: "wild-druid",
    name: "Wild Druid",
    type: "Person",
    dl: 5,
    xp: 22,
    hp: 35,
    str: 3, spd: 4, smt: 5, sml: 3,
    move: "6",
    awareness: 12,
    defence: 9,
    attacks: [
      { name: "Staff", range: "Close", roll: "+5", damage: "1d8+5" }
    ],
    abilities: ["Spellcaster (Smarts; Atk +7; Force 10)", "Spells: Barbed Branch, Flickering Flame, Plant Craft, Thick Vines, Thunder Blast, Talk to Animals, Animal Messenger, Barkskin", "Equipment: Staff", "Languages: Common, Druidic + one other"]
  },

  // ─── DL 6 (30 XP) ──────────────────────────────────────────────────────────
  {
    id: "brave-knight",
    name: "Brave Knight",
    type: "Person",
    dl: 6,
    xp: 30,
    hp: 80,
    str: 6, spd: 3, smt: 3, sml: 6,
    move: "6",
    awareness: 8,
    defence: 16,
    attacks: [
      { name: "Huge Sword", range: "Close", roll: "+8", damage: "2d6+6" },
      { name: "Heavy Crossbow", range: "Ranged 80", roll: "+5", damage: "1d10+3" }
    ],
    abilities: ["Brave (can't be scared by magic)", "Inspiring Order (small action — allies get 1d4 bonus to next attack; once per rest)", "Parry (small action — +2 defence vs. next close attack)", "Attacks twice with sword", "Equipment: Full plate, huge sword, heavy crossbow", "Languages: Common"]
  },
  {
    id: "giant-scorpion",
    name: "Giant Scorpion",
    type: "Animal",
    dl: 6,
    xp: 30,
    hp: 70,
    str: 5, spd: 4, smt: 0, sml: -1,
    move: "8",
    awareness: 5,
    defence: 13,
    attacks: [
      { name: "Claws", range: "Close", roll: "+7", damage: "1d8+5" },
      { name: "Sting", range: "Close", roll: "+7", damage: "1d10+5" }
    ],
    abilities: ["Perfect Senses", "Two claw attacks + one sting attack per turn", "Sting: STR DC 10 or take 4d10 poison damage"]
  },
  {
    id: "minotaur",
    name: "Minotaur",
    type: "Marvel",
    dl: 6,
    xp: 30,
    hp: 108,
    str: 7, spd: 3, smt: 3, sml: 2,
    move: "8",
    awareness: 11,
    defence: 12,
    attacks: [
      { name: "Huge Axe", range: "Close", roll: "+9", damage: "2d12+7" },
      { name: "Horns", range: "Close", roll: "+9", damage: "2d8+7" }
    ],
    abilities: ["Darkvision", "Going Wild (all attacks with good luck, but attacks against also with good luck)", "Horns after 2+ unit move: +2d8 damage + STR DC 12 or pushed 2 units and fall down", "Equipment: Huge axe"]
  },
  {
    id: "mummy",
    name: "Mummy",
    type: "Lost",
    dl: 6,
    xp: 30,
    hp: 108,
    str: 6, spd: 2, smt: 2, sml: 4,
    move: "4",
    awareness: 9,
    defence: 9,
    attacks: [
      { name: "Claws", range: "Close", roll: "+8", damage: "2d6+6" },
      { name: "Dread Stare", range: "Close", roll: "—", damage: "SMT DC 9 or scared; roll 4- = also Stopped" }
    ],
    abilities: ["Complete Focus (can't be charmed, scared, or stopped)", "Flammable (double fire damage)", "Hardy (immune to poison)", "Very Tough (halve non-magical normal damage)", "Claw hit: +3d6 rot damage + STR DC 10 or cursed (3d6 rot each turn until cured)"]
  },
  {
    id: "soldier",
    name: "Soldier",
    type: "Person",
    dl: 6,
    xp: 30,
    hp: 90,
    str: 6, spd: 4, smt: 3, sml: 3,
    move: "6",
    awareness: 10,
    defence: 15,
    attacks: [
      { name: "Longsword", range: "Close", roll: "+8", damage: "1d8+6" },
      { name: "Shortsword", range: "Close", roll: "+8", damage: "1d6+6" },
      { name: "Heavy Crossbow", range: "Ranged 80", roll: "+6", damage: "1d10+4" }
    ],
    abilities: ["Brave", "Two longsword + one shortsword OR two crossbow attacks per turn", "Equipment: Half plate, longsword, shortsword, heavy crossbow", "Languages: Common"]
  },

  // ─── DL 7 (40 XP) ──────────────────────────────────────────────────────────
  {
    id: "elephant",
    name: "Elephant",
    type: "Animal",
    dl: 7,
    xp: 40,
    hp: 120,
    str: 9, spd: 2, smt: 1, sml: 1,
    move: "8",
    awareness: 6,
    defence: 9,
    attacks: [
      { name: "Tusks", range: "Close", roll: "+11", damage: "3d8+9" },
      { name: "Trample", range: "Close", roll: "+11", damage: "3d10+9" }
    ],
    abilities: ["Tusks after 4+ unit move: STR DC 10 or fall down + free trample attack"]
  },
  {
    id: "ghost",
    name: "Ghost",
    type: "Lost",
    dl: 7,
    xp: 40,
    hp: 50,
    str: 1, spd: 4, smt: 3, sml: 6,
    move: "8",
    awareness: 8,
    defence: 9,
    attacks: [
      { name: "Ghost Touch", range: "Close", roll: "+8", damage: "4d6+6 rot" },
      { name: "Possession", range: "Close", roll: "—", damage: "SML DC 11 or ghost controls target" }
    ],
    abilities: ["Darkvision", "Walk Through Walls", "Complete Focus", "Hard to Hit (immune to cold/poison/rot; halve non-magical damage)", "Scary (first sight: SMT DC 11 or scared for 1 minute)", "Possession recharges after 5 full rounds"]
  },
  {
    id: "red-dragon-hatchling",
    name: "Red Dragon Hatchling",
    type: "Marvel",
    dl: 7,
    xp: 40,
    hp: 130,
    str: 7, spd: 3, smt: 3, sml: 5,
    move: "6 (fly 12)",
    awareness: 10,
    defence: 15,
    attacks: [
      { name: "Bite", range: "Close", roll: "+9", damage: "2d8+7" },
      { name: "Fire Breath", range: "Line 3×1 units", roll: "—", damage: "6d12 fire (SPD DC 11, half on pass)" }
    ],
    abilities: ["Perfect Darkvision", "Natural Climber", "Flight", "Fire Scales (immune to fire)", "Fire Breath recharges after 2 full rounds", "Languages: Draconic"]
  },

  // ─── DL 8 (55 XP) ──────────────────────────────────────────────────────────
  {
    id: "air-elemental",
    name: "Air Elemental",
    type: "Marvel",
    dl: 8,
    xp: 55,
    hp: 120,
    str: 5, spd: 8, smt: 2, sml: 1,
    move: "fly 8",
    awareness: 7,
    defence: 13,
    attacks: [
      { name: "Storm Strike", range: "Close", roll: "+11", damage: "2d8+8" },
      { name: "Whirlwind", range: "All adjacent", roll: "—", damage: "STR DC 11: 3d8+5 + pushed 4 + fall down (half on pass); recharges after 1 round" }
    ],
    abilities: ["Darkvision", "Flight", "Living Air (move through tiniest spaces)", "Complete Focus", "Very Tough (halve non-magical normal damage)", "Attacks twice per turn", "Languages: Elemental"]
  },
  {
    id: "earth-elemental",
    name: "Earth Elemental",
    type: "Marvel",
    dl: 8,
    xp: 55,
    hp: 192,
    str: 8, spd: 2, smt: 2, sml: 0,
    move: "6",
    awareness: 7,
    defence: 15,
    attacks: [
      { name: "Rock Punch", range: "Close", roll: "+11", damage: "2d8+8" }
    ],
    abilities: ["Darkvision", "Living Earth (move through solid earth)", "Complete Focus", "Very Tough (halve non-magical normal damage)", "Attacks twice per turn", "Languages: Elemental"]
  },
  {
    id: "fire-elemental",
    name: "Fire Elemental",
    type: "Marvel",
    dl: 8,
    xp: 55,
    hp: 120,
    str: 3, spd: 6, smt: 2, sml: 1,
    move: "10",
    awareness: 7,
    defence: 11,
    attacks: [
      { name: "Flame Touch", range: "Close", roll: "+9", damage: "2d6+6 fire" }
    ],
    abilities: ["Darkvision", "Complete Focus", "Very Tough (halve non-magical normal damage)", "Living Fire (creatures who touch or hit close attack take 3d12 fire)", "Flame Touch: target catches fire (1d10 fire/turn until extinguished)", "Attacks twice per turn", "Languages: Elemental"]
  },
  {
    id: "gladiator",
    name: "Gladiator",
    type: "Person",
    dl: 8,
    xp: 55,
    hp: 165,
    str: 7, spd: 8, smt: 3, sml: 5,
    move: "6",
    awareness: 8,
    defence: 16,
    attacks: [
      { name: "Spear", range: "Close or Thrown 12", roll: "+10", damage: "2d6+7" },
      { name: "Shield Bash", range: "Close", roll: "+10", damage: "2d4+7" }
    ],
    abilities: ["Brave", "Parry (small action — +3 defence vs. next close attack)", "Two spears + one shield bash per turn; or two thrown spears", "Shield bash: STR DC 13 or fall down", "Equipment: Leather + shield, many spears", "Languages: Common"]
  },
  {
    id: "triceratops",
    name: "Triceratops",
    type: "Animal",
    dl: 8,
    xp: 55,
    hp: 150,
    str: 9, spd: 2, smt: 1, sml: 0,
    move: "10",
    awareness: 6,
    defence: 12,
    attacks: [
      { name: "Horns", range: "Close", roll: "+12", damage: "4d8+9" },
      { name: "Trample", range: "Close", roll: "+12", damage: "3d10+9" }
    ],
    abilities: ["Horns after 4+ unit move: STR DC 11 or fall down + free trample attack"]
  },
  {
    id: "troll",
    name: "Troll",
    type: "Marvel",
    dl: 8,
    xp: 55,
    hp: 96,
    str: 7, spd: 4, smt: 2, sml: 1,
    move: "6",
    awareness: 9,
    defence: 13,
    attacks: [
      { name: "Bite", range: "Close", roll: "+10", damage: "1d6+7" },
      { name: "Claws", range: "Close", roll: "+10", damage: "2d6+7" }
    ],
    abilities: ["Darkvision", "Good Nose", "Constant Healing (heals 20 HP at start of turn unless took acid/fire; can only be knocked out if starts turn at 0)", "Attacks with bite AND two claws each turn", "Languages: Giant"]
  },
  {
    id: "water-elemental",
    name: "Water Elemental",
    type: "Marvel",
    dl: 8,
    xp: 55,
    hp: 180,
    str: 7, spd: 5, smt: 2, sml: 2,
    move: "6 (swim 18)",
    awareness: 7,
    defence: 12,
    attacks: [
      { name: "Tide Smash", range: "Close", roll: "+10", damage: "2d8+7" },
      { name: "Drown", range: "All adjacent", roll: "—", damage: "STR DC 13: 2d8+7 + can't move/breathe (recharges after 1 round)" }
    ],
    abilities: ["Darkvision", "Living Water", "Swim", "Very Tough (halve non-magical normal damage)", "Complete Focus", "Attacks twice per turn", "Languages: Elemental"]
  },

  // ─── DL 9 (65 XP) ──────────────────────────────────────────────────────────
  {
    id: "mammoth",
    name: "Mammoth",
    type: "Animal",
    dl: 9,
    xp: 65,
    hp: 209,
    str: 10, spd: 2, smt: 1, sml: 1,
    move: "8",
    awareness: 6,
    defence: 11,
    attacks: [
      { name: "Tusks", range: "Close", roll: "+13", damage: "4d8+10" },
      { name: "Trample", range: "Close", roll: "+13", damage: "4d10+10" }
    ],
    abilities: ["Tusks after 4+ unit move: STR DC 16 or fall down + free trample attack"]
  },
  {
    id: "medusa",
    name: "Medusa",
    type: "Marvel",
    dl: 9,
    xp: 65,
    hp: 119,
    str: 3, spd: 5, smt: 4, sml: 5,
    move: "8",
    awareness: 12,
    defence: 13,
    attacks: [
      { name: "Snake Hair", range: "Close", roll: "+8", damage: "5d6 poison" },
      { name: "Shortsword", range: "Close", roll: "+8", damage: "1d6+5" },
      { name: "Longbow", range: "Ranged 120", roll: "+8", damage: "1d8+5" }
    ],
    abilities: ["Darkvision", "Stone Gaze (start of turn within 6 units: hide eyes = bad luck on attacks; or STR DC 12 or Stopped; fail again = turned to stone permanently)", "Two shortsword OR two longbow attacks per turn", "Languages: Common, Ancient"]
  },
  {
    id: "wyvern",
    name: "Wyvern",
    type: "Marvel",
    dl: 9,
    xp: 65,
    hp: 156,
    str: 7, spd: 3, smt: 2, sml: 1,
    move: "4 (fly 16)",
    awareness: 9,
    defence: 11,
    attacks: [
      { name: "Bite", range: "Close", roll: "+10", damage: "2d6+7" },
      { name: "Claws", range: "Close", roll: "+10", damage: "2d8+7" },
      { name: "Sting", range: "Close", roll: "+10", damage: "2d6+7" }
    ],
    abilities: ["Darkvision", "Flight (4× movement)", "While flying: may replace bite with Sting; sting: STR DC 13 or 7d6 poison (half on pass)"]
  },

  // ─── DL 10 (75 XP) ─────────────────────────────────────────────────────────
  {
    id: "giant-ape",
    name: "Giant Ape",
    type: "Animal",
    dl: 10,
    xp: 75,
    hp: 270,
    str: 9, spd: 5, smt: 3, sml: 1,
    move: "8",
    awareness: 11,
    defence: 10,
    attacks: [
      { name: "Fists", range: "Close", roll: "+12", damage: "3d10+9" },
      { name: "Rock", range: "Thrown 20", roll: "+12", damage: "7d6+9" }
    ],
    abilities: ["Natural Climber (8 units on walls)", "Rock hit: STR DC 15 or fall down", "Attacks twice per turn"]
  },
  {
    id: "young-black-dragon",
    name: "Young Black Dragon",
    type: "Marvel",
    dl: 10,
    xp: 75,
    hp: 180,
    str: 7, spd: 5, smt: 3, sml: 5,
    move: "8 (fly 16, swim 8)",
    awareness: 11,
    defence: 16,
    attacks: [
      { name: "Bite", range: "Close", roll: "+10", damage: "3d10+7" },
      { name: "Claws", range: "Close", roll: "+10", damage: "2d6+7" },
      { name: "Acid Breath", range: "Line 6×2 units", roll: "—", damage: "7d20 acid (SPD DC 12, half on pass)" }
    ],
    abilities: ["Perfect Darkvision", "Flight", "Swim", "Acid Scales (immune to acid)", "Land and Sea", "Bite + two claws OR acid breath per turn", "Acid Breath recharges after 2 full rounds", "Languages: Common, Draconic"]
  },

  // ─── DL 11 (95 XP) ─────────────────────────────────────────────────────────
  {
    id: "frost-giant",
    name: "Frost Giant",
    type: "Marvel",
    dl: 11,
    xp: 95,
    hp: 216,
    str: 9, spd: 2, smt: 3, sml: 4,
    move: "8",
    awareness: 11,
    defence: 12,
    attacks: [
      { name: "Huge Axe", range: "Close", roll: "+12", damage: "3d12+9" },
      { name: "Rock", range: "Thrown 48", roll: "+12", damage: "4d10+9" }
    ],
    abilities: ["Child of Ice (immune to cold)", "Attacks twice per turn", "Equipment: Thick fur, huge axe, many heavy rocks", "Languages: Giant"]
  },
  {
    id: "hydra",
    name: "Hydra",
    type: "Marvel",
    dl: 11,
    xp: 95,
    hp: 255,
    str: 8, spd: 4, smt: 1, sml: 1,
    move: "6 (swim 6)",
    awareness: 9,
    defence: 13,
    attacks: [
      { name: "Bite (per head)", range: "Close", roll: "+11", damage: "1d10+8" }
    ],
    abilities: ["Darkvision", "Swim", "Many Heads (starts with 5 heads; loses head if takes 40+ damage in a round; grows 2 heads at start of turn for each lost — unless took fire last turn)", "One bite attack per head", "Languages: (none)"]
  },
  {
    id: "tyrannosaurus-rex",
    name: "Tyrannosaurus Rex",
    type: "Animal",
    dl: 11,
    xp: 95,
    hp: 208,
    str: 10, spd: 3, smt: 2, sml: 2,
    move: "10",
    awareness: 5,
    defence: 11,
    attacks: [
      { name: "Bite", range: "Close", roll: "+13", damage: "4d12+10" },
      { name: "Tail", range: "Close", roll: "+13", damage: "3d8+10" }
    ],
    abilities: ["Bite + tail attack per turn (must target different creatures)", "Bite: STR DC 15 or held in mouth (can't move; escape with big action STR DC 15)"]
  },

  // ─── DL 12 (110 XP) ────────────────────────────────────────────────────────
  {
    id: "clay-golem",
    name: "Clay Golem",
    type: "Construct",
    dl: 12,
    xp: 110,
    hp: 224,
    str: 8, spd: 2, smt: 1, sml: -2,
    move: "4",
    awareness: 6,
    defence: 12,
    attacks: [
      { name: "Fists", range: "Close", roll: "+10", damage: "2d10+8" }
    ],
    abilities: ["Darkvision", "Focused and Fixed (immune to charmed, scared, stopped, shape-changed)", "Spell Resistance", "Acid Healing (immune to acid; healed by acid)", "Hard to Hit (immune to mind/poison; halve non-magical normal damage)", "Speed Up (small action — +2 defence, 3 fist attacks this turn; recharges after 2 rounds)", "Attacks twice (or three times with Speed Up)"]
  },
  {
    id: "fire-giant",
    name: "Fire Giant",
    type: "Marvel",
    dl: 12,
    xp: 110,
    hp: 260,
    str: 10, spd: 2, smt: 4, sml: 4,
    move: "6",
    awareness: 13,
    defence: 16,
    attacks: [
      { name: "Huge Sword", range: "Close", roll: "+14", damage: "6d6+10" },
      { name: "Rock", range: "Thrown 48", roll: "+14", damage: "4d10+10" }
    ],
    abilities: ["Child of Fire (immune to fire)", "Attacks twice per turn", "Equipment: Full plate, huge sword, many heavy rocks", "Languages: Giant"]
  },
  {
    id: "treefolk-guardian",
    name: "Treefolk Guardian",
    type: "Plant",
    dl: 12,
    xp: 110,
    hp: 228,
    str: 9, spd: 2, smt: 5, sml: 4,
    move: "6",
    awareness: 10,
    defence: 14,
    attacks: [
      { name: "Branches", range: "Close", roll: "+13", damage: "3d6+9" },
      { name: "Rock", range: "Thrown 10", roll: "+13", damage: "4d10+9" }
    ],
    abilities: ["Flammable (double fire damage)", "Very Tough (halve normal damage)", "Blends In", "Animate Trees (small action — animate two trees for 1 day; once per day)", "Attacks twice per turn", "Languages: Common, Druidic, Elvish, Fey"]
  },

  // ─── DL 13 (120 XP) ────────────────────────────────────────────────────────
  {
    id: "stone-golem",
    name: "Stone Golem",
    type: "Construct",
    dl: 13,
    xp: 120,
    hp: 306,
    str: 9, spd: 2, smt: 1, sml: -2,
    move: "6",
    awareness: 6,
    defence: 15,
    attacks: [
      { name: "Fists", range: "Close", roll: "+12", damage: "3d8+9" },
      { name: "Slow Down", range: "Up to 2 units", roll: "—", damage: "SMT DC 15 or Slowed 1 min (half actions, half move, -2 defence); recharges after 2 rounds" }
    ],
    abilities: ["Darkvision", "Focused and Fixed", "Spell Resistance", "Hard to Hit (immune to mind/poison; halve non-magical normal damage)", "Attacks twice per turn"]
  },
  {
    id: "young-red-dragon",
    name: "Young Red Dragon",
    type: "Marvel",
    dl: 13,
    xp: 120,
    hp: 306,
    str: 9, spd: 3, smt: 4, sml: 7,
    move: "8 (fly 16)",
    awareness: 13,
    defence: 16,
    attacks: [
      { name: "Bite", range: "Close", roll: "+13", damage: "3d10+9" },
      { name: "Claws", range: "Close", roll: "+13", damage: "2d6+9" },
      { name: "Fire Breath", range: "Line 6×2 units", roll: "—", damage: "8d20 fire (SPD DC 15, half on pass)" }
    ],
    abilities: ["Perfect Darkvision", "Natural Climber", "Flight", "Fire Scales (immune to fire)", "Bite + two claws OR fire breath per turn", "Fire Breath recharges after 2 full rounds", "Languages: Common, Draconic"]
  },

  // ─── DL 14 (140 XP) ────────────────────────────────────────────────────────
  {
    id: "genie",
    name: "Genie",
    type: "Marvel",
    dl: 14,
    xp: 140,
    hp: 108,
    str: 8, spd: 5, smt: 5, sml: 8,
    move: "6 (fly 18)",
    awareness: 10,
    defence: 15,
    attacks: [
      { name: "Shortsword", range: "Close", roll: "+12", damage: "2d6+8 (+1d3 lightning +1d3 thunder)" }
    ],
    abilities: ["Darkvision", "Flight", "Child of Storms (immune to lightning and thunder)", "Cyclone (choose point up to 24 units; STR DC 16 or can't move; move cyclone as small action)", "Attacks three times per turn", "Spellcaster (Smiles; Atk +12; Force 15)", "Spells: Shock, Simple Illusion, Thunder Blast, See Magic, Invisibility, See Invisibility, Grand Illusion, Turn to Smoke, Wall of Air, Banish, Land of Illusion, Summon Elemental (air only)", "Languages: Common, Ancient, Elemental"]
  },

  // ─── DL 17 (190 XP) ────────────────────────────────────────────────────────
  {
    id: "adult-black-dragon",
    name: "Adult Black Dragon",
    type: "Marvel",
    dl: 17,
    xp: 190,
    hp: 255,
    str: 9, spd: 5, smt: 4, sml: 6,
    move: "8 (fly 16, swim 8)",
    awareness: 14,
    defence: 17,
    attacks: [
      { name: "Bite", range: "Close", roll: "+14", damage: "3d10+9" },
      { name: "Claws", range: "Close", roll: "+14", damage: "2d6+9" },
      { name: "Beating Wings", range: "All within 2 units", roll: "—", damage: "SPD DC 17: 2d6+9 + fall down; dragon flies 4 units free" },
      { name: "Tail Whip", range: "Ranged 3 units", roll: "+14", damage: "2d8+9" },
      { name: "Acid Breath", range: "Line 12×4 units", roll: "—", damage: "9d20 acid (SPD DC 16, half on pass)" }
    ],
    abilities: ["Perfect Darkvision", "Flight", "Swim", "Acid Scales (immune to acid)", "Ultimate Resistance (always roll resistance with good luck)", "Land and Sea", "Legendary Creature (two turns per round)", "Terrifying Appearance (all who can see: SMT DC 14 or scared 1 minute)", "Acid Breath recharges after 2 full rounds", "Languages: Common, Draconic"]
  },

  // ─── DL 19 (225 XP) ────────────────────────────────────────────────────────
  {
    id: "iron-golem",
    name: "Iron Golem",
    type: "Construct",
    dl: 19,
    xp: 225,
    hp: 306,
    str: 9, spd: 2, smt: 1, sml: -2,
    move: "6",
    awareness: 6,
    defence: 18,
    attacks: [
      { name: "Sword", range: "Close", roll: "+13", damage: "3d10+9" },
      { name: "Poison Breath", range: "Line 3×1 units", roll: "—", damage: "STR DC 17: 9d20 poison (half on pass); recharges after 5 rounds" }
    ],
    abilities: ["Darkvision", "Focused and Fixed", "Spell Resistance", "Fire Healing (immune to fire; healed by fire)", "Hard to Hit (immune to mind/poison; halve non-magical normal damage)", "Attacks twice per turn"]
  },

  // ─── DL 20 (250 XP) ────────────────────────────────────────────────────────
  {
    id: "adult-red-dragon",
    name: "Adult Red Dragon",
    type: "Marvel",
    dl: 20,
    xp: 250,
    hp: 306,
    str: 11, spd: 3, smt: 5, sml: 8,
    move: "8 (fly 16)",
    awareness: 16,
    defence: 17,
    attacks: [
      { name: "Bite", range: "Close", roll: "+17", damage: "3d10+11" },
      { name: "Claws", range: "Close", roll: "+17", damage: "2d6+11" },
      { name: "Beating Wings", range: "All within 2 units", roll: "—", damage: "SPD DC 20: 2d6+11 + fall down; dragon flies 4 units free" },
      { name: "Tail Whip", range: "Ranged 3 units", roll: "+17", damage: "2d8+11" },
      { name: "Fire Breath", range: "Line 12×4 units", roll: "—", damage: "11d20 fire (SPD DC 19, half on pass)" }
    ],
    abilities: ["Perfect Darkvision", "Natural Climber", "Flight", "Fire Scales (immune to fire)", "Ultimate Resistance (always roll resistance with good luck)", "Legendary Creature (two turns per round)", "Terrifying Appearance (all who can see: SMT DC 17 or scared 1 minute)", "Fire Breath recharges after 2 full rounds", "Languages: Common, Draconic"]
  }
];
