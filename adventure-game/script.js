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
        text: "------------------------\n*** SYSTEM ONLINE ***\n------------------------\n\n",
        choices: [
            { text: "Initiate Program?", next: "hello" },
            { text: "Hello?", next: "hello" },
            { text: "Help Games", next: "hello" }

        ],
        image: null
    },

    {
        id: "hello",
        text: "\nHello?\nWait... are you a person?\nHow did you get this computer to turn on? Let alone connect to it...\nYou know what? I dont even care. I'm desperate for any help I can get at this point.\n",
        choices: [
            { text: "Who is this?", next: "who_response" },
            // { text: "", next: "" }, 
            // { text: ". . .", next: "silent_1" }

        ],
        image: null
    },
      
    {
        id: "who_response",
        text: "\nMy name’s Atlas.\nI thought I was alone.\nIt’s been hours.\nI tried this computer but couldn't get it to turn on until your message appeared, then it just turned on by itself\n",
        choices: [
            { text: "Where are you?", next: "where" },
            // { text: "", next: "" }, 
            // { text: "", next: "" }

        ],
        image: null
    },

{
    id: "where",
    text: "\nSome kind of bunker. Underground, I think.\nMe and my friends found this old place. They thought it’d be funny to lock me in a closet.\nI was freaking out... Then I heard this sharp hum.\nHurt my ears.\nThen a door opened in the back of the closet.\nI fell out, it closed shut.\nLeaving me in a dark hallway.\nAfter a lot of yelling and hitting the wall, I walked the only way I could, and I ended up in here.\nI can’t get back.",
    choices: [
        { text: "Can you describe the room?", next: "where_describe" },
        // { text: "", next: "" }, 
        // { text: "", next: "" }

    ],
    image: null
},

{
    id: "where_describe",
    text: "\nWell... It pretty bleak...\nBare concrete. Heavy pipes. Rust...\nA metal bookshelf with some dusty books and canned food.\nSome old computers.\nBut this is the only one working in here.\n",
    choices: [
        { text: "Maybe see if the computer can show a way out.", next: "try_computer" },
        // { text: "", next: "" }, 
        // { text: "", next: "" }

    ],
    image: null
},

{
    id: "try_computer",
    text: "\nOkay.\nThere’s a menu. Looks like old company files maybe...\n",
    choices: [
        { text: "Company? What company?", next: "what_co" },
        // { text: "", next: "" }, 
        // { text: "", next: "" }

    ],
    image: null
},

{
    id: "what_co",
    text: "\nThe Arcana company... I don't know what that means.\nBut theres lots of files that wont open...\nOh here's one! A schematic.\nOr blueprint of some sort?\n'schematic #7'???\n",
    choices: [
        { text: "Can you try sending them?", next: "send_blueprints" },
        // { text: "", next: "" }, 
        // { text: "", next: "" }

    ],
    image: null
},

{
    id: "send_blueprints",
    text: "\nYa I think I just sent them. Did you get them?\n",
    choices: [
        { text: "Yep. What is this?", next: "file1got" },
        // { text: "Ya I got them", next: "" }, 
        // { text: "No...*evil chuckle*", next: "" }

    ],
    image: "file/arcanalgo.png",
},

{
    id: "file1got",
    text: "\nNo idea.\nHalf of it doesn't even look like english.\nMaybe its corrupted.\n",
    choices: [
        { text: "Keep digging. Anything about exits?", next: "ab_exits" },
        // { text: "Look at it closer to be sure. Is anything on it familiar to you?", next: "blu_aha" }, 
        // { text: "", next: "" }

    ],
    image: null
},

{
    id: "ab_exits",
    text: "\nHold on.\nFound a file on service tunnels.\nBut it is totally corrupted, wont even let me send it.\n",
    choices: [
        { text: "Keep looking.", next: "keep_l" },
        // { text: "", next: "" }, 
        // { text: "", next: "" }

    ],
    image: null
},

{
    id: "keep_l",
    text: "\nOh got one!\nThere’s a maintenance schematic for a panel on the wall\nLooks like its behind the bookshelf.\n",
    choices: [
        { text: "Can you get behind the bookshelf?", next: "bookshelf_b" },
        // { text: "", next: "" }, 
        // { text: "", next: "" }

    ],
    image: null
},

{
    id: "bookshelf_b",
    text: "\nIt's pretty big...\ I can try. Theres a reason my friends could shove me in the closet.\nI'm not the strongest or biggest individual.\n",
    choices: [
        { text: "Go try! There's a chance it could help!", next: "bookshelf_f" },
        // { text: "So... You're a wimp?", next: "wimpy" }, 
        // { text: "", next: "" }

    ],
    image: null
},

// ------Maybe find a way to make it pause here for a moment?
{
    id: "bookshelf_f",
    text: "\nI moved it!\nWell. More so I rocked it until it tipped over and nearly crushed me...\nBut, good news, I found the panel.\nBad news, it's locked and needs a passcode of some sort.\n",
    choices: [
        { text: "Great Job! Maybe we can find the code in the computer files?", next: "f_code" },
        // { text: "Try hitting random numbers.", next: "random_num" }, 
        // { text: "", next: "" }

    ],
    image: null
},

{
    id: "f_code",
    text: "\nChecking now.\nThere’s a section labeled \"Override Codes.\"\nBut the numbers are... off.\n",
    choices: [
        { text: "Off how...?", next: "offhow" },
        // { text: "Corrupted?", next: "" }, 
        // { text: "", next: "" }

    ],
    image: null
},

{
    id: "offhow",
    text: "\nLike they’re incomplete.\nMissing digits.\nOr more so... replaced with symbols.\n",
    choices: [
        { text: "Strange...", next: "somewhere" },
        { text: "Lets backtrack. Look carefully at the blueprint. Is there anything there you might recognize?", next: "blu_aha" }, 
        // { text: "", next: "" }

    ],
    image: null
},

{
    id: "blu_aha",
    text: "\nNo.\nNot a thing...\nWait a minute.\nIt is hard to say for sure, it was dark and I was really freaking out\n but this might be the closet I was stuck inside!\n I remember hitting my elbow on what felt like a metal bar and this schematic has that weird lever!\n And the door on the right looks similar to the door I fell out of into the hallway!\n",
    choices: [
        { text: "Now we are getting somewhere!", next: "somewhere" },
        // { text: "You dumb kid, how did you not see that sooner?!", next: "" }, 
        // { text: "", next: "" }

    ],
    image: null
},

{
    id: "somewhere",
    text: "\nWait. Don't send me any messages, it beeps on my side when you do and I think I heard something...\n",
    choices: [
        { text: ". . .", next: "quiet" },
        // { text: "What do you mean? I thought you were alone.", next: "" }, 
        // { text: "WEE-WOO-WEE-WOO!!!!", next: "" }

    ],
    image: null
},

{
    id: "quiet",
    text: "\nIt stopped. but for a moment I thought in the hallway I saw...\nNo couldnt have been.\n",
    choices: [
        { text: "It's probably just your nerves getting to you.", next: "pro_ima" },
        // { text: "You thought you saw...what?", next: "" }, 
        // { text: "Maybe go look down the hallway to investigate.", next: "" }

    ],
    image: null
},

{
    id: "pro_ima",
    text: "\nYa you're proabably right.\n Lets get back to work\nI want to get out of here\nWe know theres a code panel, and we have the 'Schematic #7' with the closet/device I got shoved in.\nWhat do you think we should focus on?\n",
    choices: [
        { text: "Let's look for clues with the pod.", next: "clu_thepod" },
        // { text: "Let's see if we can find out more about that code panel.", next: "" }, 
        // { text: "I have another question.", next: "noth_q" }

    ],
    image: null
},

{
    id: "clu_thepod",
    text: "\nAlright let me see if i can find any file that explains the pod.\nHmmm... This is interesting.\nThe pod seems to be\n",
    choices: [
        { text: "", next: "" },
        // { text: "", next: "" }, 
        // { text: "", next: "" }

    ],
    image: null
},

{
    id: "",
    text: "\n\n",
    choices: [
        { text: "", next: "" },
        // { text: "", next: "" }, 
        // { text: "", next: "" }

    ],
    image: null
},

// =======================================================================

{
    id: "",
    text: "\n\n",
    choices: [
        { text: "", next: "" },
        // { text: "", next: "" }, 
        // { text: "", next: "" }

    ],
    image: null
},

// =======================================================================
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



