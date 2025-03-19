const dialogue = document.getElementById('dialogue');
const choices = document.getElementById('choices');
const imageArea = document.getElementById('image-area');
const fileButtons = document.getElementById('file-buttons');
const imagePopup = document.getElementById('image-popup');
const popupImg = document.getElementById('popup-img');
const closePopup = document.getElementById('close-popup');
const terminalPrompt = document.getElementById('terminal-prompt');

let currentImage = null;
let sceneIndex = 0;


// =======================
// SCENES DATA STRUCTURE
// =======================
const scenes = [
    {
        id: "boot",
        text: 'Booting...\n\n*** SYSTEM ONLINE ***\n\n"Hello? Is someone there? Please... I need help."\n\nDo you type: hello or who?',
        choices: [
            { text: "hello", next: "hello_response" },
            { text: "who", next: "who_response" }
        ],
        image: "clues/clue1.jpeg"
    },
    {
        id: "hello_response",
        text: '"Oh thank goodness! I\'m... I\'m stuck. I don\'t know where I am. I think it’s some kind of bunker. Can you help me?"',
        choices: [
            { text: "just breathe", next: "calm_response" },
            { text: "where are you?", next: "where_response" }
        ],
        image: null
    },
    {
        id: "who_response",
        text: '"My name’s Alex. I was exploring this underground place with some friends... They locked me in as a prank... hours ago. Now, I’m really scared."',
        choices: [
            { text: "calm down", next: "calm_response" },
            { text: "where are you?", next: "where_response" }
        ],
        image: null
    },
    {
        id: "calm_response",
        text: '"I-I’m trying, but it’s dark. There’s only this old terminal here. Then you showed up. I think I heard something moving outside."',
        choices: [
            { text: "describe the room", next: "describe_room" },
            { text: "what sound?", next: "what_sound" }
        ],
        image: null
    },
    {
        id: "where_response",
        text: '"It looks like an old military bunker... metal walls, pipes, and this rusty computer I’m talking to you through."',
        choices: [
            { text: "describe the room", next: "describe_room" },
            { text: "what sound?", next: "what_sound" }
        ],
        image: null
    },
    {
        id: "describe_room",
        text: '"There’s a door with no handle, a vent up high, and some strange panel with wires on the wall."',
        choices: [
            { text: "inspect the panel", next: "inspect_panel" },
            { text: "try the vent", next: "try_vent" }
        ],
        image: null
    },
    {
        id: "what_sound",
        text: '"Scraping... like metal on concrete. It stopped now. Please, what should I do?"',
        choices: [
            { text: "inspect the panel", next: "inspect_panel" },
            { text: "try the vent", next: "try_vent" }
        ],
        image: null
    },
    {
        id: "try_vent",
        text: '"I can’t reach it. Too high up, and nothing to climb on. The panel might be my only way."',
        choices: [
            { text: "inspect the panel", next: "inspect_panel" }
        ],
        image: null
    },
    {
        id: "inspect_panel",
        text: '"The panel has colored wires and some old labels. It looks dangerous. What should I cut?"',
        choices: [
            { text: "red", next: "shock_red" },
            { text: "blue", next: "success_blue" },
            { text: "green", next: "fail_green" },
            { text: "yellow", next: "shock_red" }
        ],
        image: "images/schematic.png" // assuming schematic image here
    },
    {
        id: "success_blue",
        text: '"It worked! The door just clicked. It might be open now."',
        choices: [
            { text: "open the door", next: "open_door" },
            { text: "peek first", next: "peek_door" }
        ],
        image: null
    },
    {
        id: "shock_red",
        text: 'Sparks fly!\n\n"AH! Something shocked me! The computer screen is glitching—wait... are you still there?"',
        choices: [
            { text: "yes", next: "glitch_recovery" },
            { text: "hold on", next: "glitch_recovery" }
        ],
        image: null
    },
    {
        id: "fail_green",
        text: 'A loud bang!\n\n"The lights just died... I think I messed up. I can barely see anything."',
        choices: [
            { text: "stay put", next: "connection_lost" },
            { text: "feel around", next: "connection_lost" }
        ],
        image: null
    },
    {
        id: "glitch_recovery",
        text: 'STATIC...\n[CONNECTION LOST]\nWould you like to RECONNECT or ABANDON the system?',
        choices: [
            { text: "reconnect", next: "reconnect_scene" },
            { text: "abandon", next: "shutdown" }
        ],
        image: null
    },
    {
        id: "connection_lost",
        text: 'STATIC...\n[CONNECTION LOST]\nWould you like to RECONNECT or ABANDON the system?',
        choices: [
            { text: "reconnect", next: "reconnect_scene" },
            { text: "abandon", next: "shutdown" }
        ],
        image: null
    },
    {
        id: "reconnect_scene",
        text: '"I... I’m still here. But something feels... wrong. I don’t think I’m alone anymore."',
        choices: [
            { text: "what's wrong?", next: "wrong_response" },
            { text: "what do you mean?", next: "wrong_response" }
        ],
        image: null
    },
    {
        id: "wrong_response",
        text: '"I can hear voices... but they don’t sound human. Also... I think this terminal is older than I thought. The date says 1953. That can’t be right..."',
        choices: [
            { text: "check the logs", next: "logs" },
            { text: "ask Alex's age", next: "alex_age" }
        ],
        image: null
    },
    {
        id: "logs",
        text: "LOG FILE: 'PROJECT VESSEL'\n[TOP SECRET]\nSubject's consciousness successfully transferred into digital framework...",
        choices: [
            { text: "ask Alex’s age", next: "alex_age" },
            { text: "confront Alex", next: "alex_panic" }
        ],
        image: null
    },
    {
        id: "alex_age",
        text: '"Wait... No, no... What are you saying? I\'ve been here for... for HOURS, not decades!"',
        choices: [
            { text: "explain further", next: "system_error" },
            { text: "mention project info", next: "system_error" }
        ],
        image: null
    },
    {
        id: "alex_panic",
        text: '"Wait... No, no... What are you saying? I\'ve been here for... for HOURS, not decades!"',
        choices: [
            { text: "explain further", next: "system_error" },
            { text: "mention project info", next: "system_error" }
        ],
        image: null
    },
    {
        id: "system_error",
        text: 'SYSTEM ERROR\n"No! Get me out! Get me out of here!"\nWARNING: SYSTEM UNSTABLE',
        choices: [
            { text: "force quit", next: "shutdown" },
            { text: "ride it out", next: "deep_simulation" }
        ],
        image: null
    },
    {
        id: "deep_simulation",
        text: 'The screen flickers violently.\nSuddenly... you feel cold, like something is pulling you...\n\n[Loading deeper simulation...]\n\nDo you continue?',
        choices: [
            { text: "continue", next: "inside_terminal" }
        ],
        image: null
    },
    {
        id: "inside_terminal",
        text: '"Hey... can you hear me? Who are you? Why are YOU in the terminal?"\n\nYou look around, realizing you are inside the simulation now.\n\nTo be continued...',
        choices: [],
        image: null
    },
    {
        id: "open_door",
        text: 'You open the door and step into darkness...\nTo be continued...',
        choices: [],
        image: null
    },
    {
        id: "peek_door",
        text: 'You peek through the crack... shadows shift beyond.\nTo be continued...',
        choices: [],
        image: null
    },
    {
        id: "shutdown",
        text: 'SYSTEM SHUTDOWN\nConnection terminated.',
        choices: [],
        image: null
    }
];





// =======================
// Remove blinking cursors inside dialogue area (except the prompt)
// =======================
function removeAllCursors() {
    document.querySelectorAll('#dialogue .cursor').forEach(c => c.remove());
}

// =======================
// Type out text with typing effect
// =======================
function typeText(text, callback) {
    removeAllCursors();
    let i = 0;
    const line = document.createElement('div');
    line.classList.add('line');
    dialogue.prepend(line);

    const typing = setInterval(() => {
        if (i < text.length) {
            if (text[i] === '\n') {
                line.innerHTML += '<br>';
            } else {
                // escape HTML special chars to prevent breaking tags
                const safeChar = text[i]
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");
                line.innerHTML += safeChar;
            }
            i++;
        } else {
            clearInterval(typing);
            terminalPrompt.style.display = 'block'; // show prompt after typing
            if (callback) callback();
        }
    }, 50);
}


// =======================
// Echo the player's input into terminal
// =======================
function echoUserInput(choiceText) {
    const line = document.createElement('div');
    line.classList.add('line', 'user-input');
    line.innerHTML = `> ${choiceText}`;
    dialogue.prepend(line);
}

// =======================
// Display choice buttons dynamically for the scene
// =======================
function showChoices(scene) {
    choices.innerHTML = ''; // clear buttons at start
    scene.choices.forEach((choice) => {
        const btn = document.createElement('button');
        btn.textContent = choice.text;
        btn.onclick = () => {
            echoUserInput(choice.text);
            choices.innerHTML = '';
            terminalPrompt.style.display = 'none';
            nextScene(choice.next);
        };
        choices.appendChild(btn);
    });
}

// =======================
// Find a scene object by its ID
// =======================
function getSceneById(id) {
    return scenes.find(scene => scene.id === id);
}

// =======================
// Handle scene progression based on "next" id
// =======================
function nextScene(nextId) {
    if (currentImage) {
        addFileButton(currentImage);
        currentImage = null;
    }
    const scene = getSceneById(nextId);
    if (!scene) {
        console.error(`Scene with id "${nextId}" not found.`);
        return;
    }
    sceneIndex = nextId; // no longer needed, but you can still track this if you want
    typeText(scene.text, () => showChoices(scene));
    showImage(scene.image);
}

// =======================
// Show clue/image related to scene (in image area)
// =======================
function showImage(image) {
    imageArea.innerHTML = '';
    if (image) {
        const img = document.createElement('img');
        img.src = image;
        img.alt = 'clue';
        img.style.maxWidth = '100%';
        imageArea.appendChild(img);
        currentImage = image;
    } else {
        imageArea.innerHTML = '<p>Image Area</p>';
    }
}

// =======================
// Add collected file as button below terminal
// =======================
function addFileButton(image) {
    const btn = document.createElement('button');
    btn.textContent = `File: ${image}`;
    btn.onclick = () => openPopup(image);
    fileButtons.appendChild(btn);
}

// =======================
// Open image popup for collected files/clues
// =======================
function openPopup(image) {
    popupImg.src = image;
    imagePopup.classList.remove('hidden');
}

// =======================
// Close pop-up handler
// =======================
closePopup.onclick = () => {
    imagePopup.classList.add('hidden');
};

// =======================
// INIT: Start the first scene
// =======================
const startScene = getSceneById("boot");
typeText(startScene.text, () => showChoices(startScene));




