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
        text: "------------------------\n*** SYSTEM ONLINE ***\n------------------------\n\nHello?\nIs someone there? Please... I need help.\n",
        choices: [
            { text: "Yeah, I’m here. Who are you?", next: "who_response" },
            { text: "Uh... Who is this?", next: "who_response" },
            { text: ". . .", next: "silent_1" }

        ],
        image: null
    },
    {
        id: "who_response",
        text: "\nOh, thank heavens! My name is… uh, Atlas. I don’t know what’s going on. \nI was with my friends, and—look, I just need help. I’m trapped.\n",
        choices: [
            { text: "Just breathe", next: "calm_response" },
            { text: "Where are you?", next: "where_response" }
        ],
        image: "file/blueprint.png"

    },
    {
        id: "silent_1",
        text: "\nHello?! Please! If someone is there, say something. I don’t know what to do.\n",
        choices: [
            { text: "I’m here. Who are you?", next: "who_response" },
            { text: ". . .", next: "silent_2" }
        ],
        image: null
    },
    {
        id: "silent_2",
        text: "\nPLEASE!\n Jake if this is you messing with me - the joke has gone way to far!\nLET ME OUT!!!\n",
        choices: [
            { text: "Hello..? sorry I'm here,\nwho are you?", next: "who_response" },
            { text: "Out? Where are you?", next: "where_1" }
        ],
        image: null
    },






    {
        id: "calm_response",
        text: '\nI-I’m trying, but it’s dark. There’s only this old terminal here. Then you showed up. I think I heard something moving outside.\n',
        choices: [
            { text: "describe the room", next: "describe_room" },
            { text: "what sound?", next: "what_sound" }
        ],
        image: null
    },
    {
        id: "where_response",
        text: '\nIt looks like an old military bunker... metal walls, pipes, and this rusty computer I’m talking to you through.\n',
        choices: [
            { text: "describe the room", next: "describe_room" },
            { text: "what sound?", next: "what_sound" }
        ],
        image: null
    },
    {
        id: "describe_room",
        text: '\nThere’s a door with no handle, a vent up high, and some strange panel with wires on the wall.\n',
        choices: [
            { text: "inspect the panel", next: "inspect_panel" },
            { text: "try the vent", next: "try_vent" }
        ],
        image: null
    },
    {
        id: "what_sound",
        text: '\nScraping... like metal on concrete. It stopped now. Please, what should I do?\n',
        choices: [
            { text: "inspect the panel", next: "inspect_panel" },
            { text: "try the vent", next: "try_vent" }
        ],
        image: null
    },
    {
        id: "try_vent",
        text: '\nI can’t reach it. Too high up, and nothing to climb on. The panel might be my only way.\n',
        choices: [
            { text: "inspect the panel", next: "inspect_panel" }
        ],
        image: null
    },
    {
        id: "inspect_panel",
        text: '\nThe panel has colored wires and some old labels. It looks dangerous. What should I cut?\n',
        choices: [
            { text: "red", next: "shock_red" },
            { text: "blue", next: "success_blue" },
            { text: "green", next: "fail_green" },
            { text: "yellow", next: "shock_red" }
        ],
        image: "images/schematic.png"
    },
    {
        id: "success_blue",
        text: '\nIt worked! The door just clicked. It might be open now.\n',
        choices: [
            { text: "open the door", next: "open_door" },
            { text: "peek first", next: "peek_door" }
        ],
        image: null
    },
    {
        id: "shock_red",
        text: '\nSparks fly!\n\nAH! Something shocked me! The computer screen is glitching—wait... are you still there?\n',
        choices: [
            { text: "yes", next: "glitch_recovery" },
            { text: "hold on", next: "glitch_recovery" }
        ],
        image: null
    },
    {
        id: "fail_green",
        text: '\nA loud bang!\n\nThe lights just died... I think I messed up. I can barely see anything.\n',
        choices: [
            { text: "stay put", next: "connection_lost" },
            { text: "feel around", next: "connection_lost" }
        ],
        image: null
    },
    {
        id: "glitch_recovery",
        text: '\nSTATIC...\n[CONNECTION LOST]\nWould you like to RECONNECT or ABANDON the system?\n',
        choices: [
            { text: "reconnect", next: "reconnect_scene" },
            { text: "abandon", next: "shutdown" }
        ],
        image: null
    },
    {
        id: "connection_lost",
        text: '\nSTATIC...\n[CONNECTION LOST]\nWould you like to RECONNECT or ABANDON the system?\n',
        choices: [
            { text: "reconnect", next: "reconnect_scene" },
            { text: "abandon", next: "shutdown" }
        ],
        image: null
    },
    {
        id: "reconnect_scene",
        text: '\nI... I’m still here. But something feels... wrong. I don’t think I’m alone anymore.\n',
        choices: [
            { text: "what's wrong?", next: "wrong_response" },
            { text: "what do you mean?", next: "wrong_response" }
        ],
        image: null
    },
    {
        id: "wrong_response",
        text: '\nI can hear voices... but they don’t sound human. Also... I think this terminal is older than I thought. The date says 1953. That can’t be right...\n',
        choices: [
            { text: "check the logs", next: "logs" },
            { text: "ask Alex's age", next: "alex_age" }
        ],
        image: null
    },
    {
        id: "logs",
        text: "\nLOG FILE: 'PROJECT VESSEL'\n[TOP SECRET]\nSubject's consciousness successfully transferred into digital framework...\n",
        choices: [
            { text: "ask Alex’s age", next: "alex_age" },
            { text: "confront Alex", next: "alex_panic" }
        ],
        image: null
    },
    {
        id: "alex_age",
        text: '\nWait... No, no... What are you saying? I\'ve been here for... for HOURS, not decades!\n',
        choices: [
            { text: "explain further", next: "system_error" },
            { text: "mention project info", next: "system_error" }
        ],
        image: null
    },
    {
        id: "alex_panic",
        text: '\nWait... No, no... What are you saying? I\'ve been here for... for HOURS, not decades!\n',
        choices: [
            { text: "explain further", next: "system_error" },
            { text: "mention project info", next: "system_error" }
        ],
        image: null
    },
    {
        id: "system_error",
        text: '\nSYSTEM ERROR\nNo! Get me out! Get me out of here!\nWARNING: SYSTEM UNSTABLE\n',
        choices: [
            { text: "force quit", next: "shutdown" },
            { text: "ride it out", next: "deep_simulation" }
        ],
        image: null
    },
    {
        id: "deep_simulation",
        text: '\nThe screen flickers violently.\nSuddenly... you feel cold, like something is pulling you...\n\n[Loading deeper simulation...]\n\nDo you continue?\n',
        choices: [
            { text: "continue", next: "inside_terminal" }
        ],
        image: null
    },
    {
        id: "inside_terminal",
        text: '\nHey... can you hear me? Who are you? Why are YOU in the terminal?\n\nYou look around, realizing you are inside the simulation now.\n\nTo be continued...\n',
        choices: [],
        image: null
    },
    {
        id: "open_door",
        text: '\nYou open the door and step into darkness...\nTo be continued...\n',
        choices: [],
        image: null
    },
    {
        id: "peek_door",
        text: '\nYou peek through the crack... shadows shift beyond.\nTo be continued...\n',
        choices: [],
        image: null
    },
    {
        id: "shutdown",
        text: '\nSYSTEM SHUTDOWN\nConnection terminated.\n',
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
                line.innerHTML += '<br><br>'; 
            } else {
                const safeChar = text[i]
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");
                line.innerHTML += safeChar;
            }
            i++;
        } else {
            clearInterval(typing);
            terminalPrompt.style.display = 'block';
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
    line.innerHTML = `> ${choiceText}<br><br>`; 
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
    sceneIndex = nextId;
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

imagePopup.addEventListener('click', (e) => {
    if (e.target === imagePopup) {
        imagePopup.classList.add('hidden');
    }
});

// =======================
// Startup screen logic with loading + transition
// =======================
const startupText = `
[BOOT SEQUENCE INITIATED]
Checking system integrity
Loading terminal modules
Establishing secure link
`;

let i = 0;
function typeWriter() {
    if (i < startupText.length) {
        document.getElementById("startup-text").textContent += startupText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    } else {
        // After text finishes, animate loading bar
        const loadingBar = document.getElementById("loading-bar");
        loadingBar.style.transition = "width 2s ease";
        loadingBar.style.width = "100%";

        setTimeout(() => {
            // Hide startup, show main UI
            document.getElementById("startup-screen").style.display = "none";

            const mainUI = document.getElementById("main-ui");
            mainUI.classList.remove("hidden");
            mainUI.style.opacity = 0;
            mainUI.style.transition = "opacity 1s ease";
            requestAnimationFrame(() => {
                mainUI.style.opacity = 1;
            });

            // Start game dialogue AFTER terminal fades in
            const startScene = getSceneById("boot");
            setTimeout(() => {
                typeText(startScene.text, () => showChoices(startScene));
            }, 500);

        }, 2500); // Delay for loading bar fill + transition
    }
}



// =======================
// INIT everything on window load
// =======================
window.onload = typeWriter;



