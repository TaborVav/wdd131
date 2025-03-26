const dialogue = document.getElementById("dialogue");
const choices = document.getElementById("choices");
const imageArea = document.getElementById("image-area");
const fileButtons = document.getElementById("file-buttons");
const imagePopup = document.getElementById("image-popup");
const popupImg = document.getElementById("popup-img");
const closePopup = document.getElementById("close-popup");
const terminalPrompt = document.getElementById("terminal-prompt");

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
      { text: "Initiate Program?", next: "hello1" },
      { text: "Hello?", next: "hello" },
      { text: "Help Games", next: "hello1" },
    ],
    image: null,
  },
  {
    id: "hello1",
    text: "\nWhat is happening? Is someone there??\n",
    choices: [
      { text: "Yes hello.", next: "hello" },
      { text: "OoOOoh I'm a ghost!", next: "silent_2" },
      { text: ". . .", next: "silent_1" },
    ],
    image: null,
  },

  
    {
      id: "silent_1",
      text: "\nHello????!!!!\nPLEASE!!\nIf someone is out there I need help!\n",
      choices: [
        { text: ". . .", next: "silent_2" },
        { text: "Hey I'm here! who is this?", next: "who_response" },
        { text: "Sorry, some interference. But I'm here.", next: "who_response" },
      ],
      image: null,
    },
  
    {
      id: "silent_2",
      text: "\nJacob???? Adrian???? Colter????? Sarah?????\nIf this is you still messing with me the joke has gone way to far!\n",
      choices: [
        {
          text: "Hey I'm here, I don't know those people! Who's this?", next: "who_response"},
        {
          text: "Darn interference. Computers... right? Who's this?", next: "who_response"},
      ],
      image: null,
    },

    {
      id: "hello",
      text: "\nHello?!\nWait... you are a person?\nHow did you get this computer to turn on? Let alone connect to it...\nYou know what? I dont even care. I'm desperate for any help I can get at this point.\n",
      choices: [
        { text: "I am a real person. Who is this?", next: "who_response" },
        { text: "I know as much as you do. Who is this?", next: "who_response" },
      ],
      image: null,
    },
  
    {
      id: "who_response",
      text: "\nMy name’s Atlas.\nI thought I was alone.\nIt’s been hours.\nI tried this computer but couldn't get it to turn on until your message appeared, then it just turned on by itself\n",
      choices: [
        { text: "This is strange...", next: "identity" },
        { text: "It just turned on?", next: "identity" },
      ],
      image: null,
    },

    {
      id: "identity",
      text: "\n--- System Identity Program Initiated ---\n--- Smile ---\n--- Photo Procured ---\n--- Identity Updated ---\n--- Filing Photo ---\n",
      choices: [
        { text: ". . .", next: "whatwhy" },
        { text: "What just happened?!", next: "whatwhy" },
      ],
      image: null,
    },

    {
      id: "whatwhy",
      text: "\nThat was... weird... ya. That was weird. What sort of place is this?\n",
      choices: [
        { text: "Where are you?", next: "where" },
        { text: "What happened? It just turned on?", next: "what_is_this" },
      ],
      image: "file/atlas-ID.png",
    },

    {
      id: "what_is_this",
      text: "\nYa it just powered on and your message appeared.\n But this place is just weird in general, not a lot about it actually makes sense\n",
      choices: [
        { text: "This place? Where are you?", next: "where" },
        { text: "I understand the feeling. Where are you?", next: "where" },
      ],
      image: null,
    },

  {
    id: "where",
    text: "\nSome kind of bunker. Underground, I think.\nMe and my friends found this old place. My friends were messing around and locked me in a closet.\nReal funny, right?\nWhen I was inside, I heard this awful machine like humming.\nIt felt like needles in my brain and I started freaking out.\nAnd then another door—one I swear wasn’t there before—opened up behind me.\nI panicked and ran through. The door slammed shut. Leaving me in a dark twisting hallway.\nAfter a lot of yelling and hitting the wall, I walked the only way I could, and I ended up in here.\n It’s been hours.\nIt’s just me now…\nand this computer.\n",
    choices: [
      { text: "Can you describe the room?", next: "where_describe" },
      { text: "Check to see if the door can be opened again.", next: "check_door" },
    ],
    image: null,
  },

  {
    id: "where_describe",
    text: "\nUh, yeah—\nIt’s like a maintenance room, I think?\nBare concrete. Heavy pipes. Rust...\nThere's a big, old computer bank—this one—and some scattered papers.\nEverything’s dusty, looks like no one's been here for decades.\nThere's also a hatch in the floor, but it’s locked tight with some sort of electronic lock.\nNo tools in sight. Figures.\nThis computer might be the only thing I can actually use right now.",
    choices: [
      {
        text: "Maybe see if the computer can show a way out.", next: "try_computer"},
      { text: "What about in the hallway?", next: "hall" },
    ],
    image: null,
  },

  {
    id: "hall",
    text: "\nThere is nothing in the hallway besides that sealed door and concrete.\n",
    choices: [
      {
        text: "Looks like investigating this computer is the best option then.", next: "try_computer"},
    ],
    image: null,
  },

  {
    id: "check_door",
    text: "\nYeah, I tried. It's sealed tight. No keypad, no handle on this side.\nJust smooth metal, like it was never meant to be opened from in here.\nI even tried kicking it, but it didn’t budge.\n",
    choices: [
      { text: "Can you describe the room your in?", next: "where_describe" },
      { text: "Must be pretty weak... But lets look for solutions. Where are you?", next: "where_describe" },
    ],
    image: null,
  },

  {
    id: "try_computer",
    text: "\nAlright... I’ll see what I can find on it.\n This thing is ancient. Looks like a custom system, nothing I’ve ever used.\nBut there’s a bunch of directories... most are labeled with weird shorthand.\nSome folders just have random numbers, like ‘0718’ or ‘X3-Beta’.\n\nIt’s strange, though — the moment you messaged me, the screen flickered and unlocked a bunch of them. Like... like your message did something to the system.\n\nAnyway, I’ll start digging around.",
    choices: [
      { text: "Good idea, let me know what you find.", next: "digging" },
      { text: "Be careful. Who knows what’s on there.", next: "digging" },
      { text: "Why would my message unlock files?", next: "digging" }
    ],
    image: null
},
// ======  map talk > void sector > nothing
// ======= map talk > hatch_check > nothing
// {
//     id: "digging",
//     text: "\nMost of these files look like logs or schematics. A lot of them are corrupted, though.\nThere’s... hold on.\n\n[typing sounds]\n\nThere’s a document here. ‘ACCESS_TUNNEL_MAP_01’.\nMight be useful.\nUploading it now.",
//     choices: [
//       { text: "Got it. Keep looking.", next: "digging2" },
//       { text: "Can you read it? What's it show?", next: "map_talk" }
//     ],
//     image: "schematic_map.png"
// },

// =======
{
    id: "digging",
    text: "\nHmm. There’s a ‘MAINT_LOCK_SEQ’ file here, but it’s just a garbled mess. Like someone scrambled it on purpose.\nMaybe it’s some kind of passcode for the hatch?\n\nWait, there’s another file labeled ‘DECRYPT_GUIDE_01’. If those are related it is eerily convenient... But who am I to look a gift horse in the mouth? I’ll send the guide.\nMaybe you can make sense of it.",
    choices: [
      { text: "Send it over. I'll take a look.", next: "send_cipher" },
      { text: "Oof I didnt know I'd be doing homework for you. But okay, send it.", next: "send_cipher" }
    ],
    image: "file/0972.jpg"
},

{
    id: "send_cipher",
    text: "\nUploading now...\nThis one looks like a manual or instruction set? I can't make sense of it.\nIt has strange symbols and patterns.\n\nMaybe this is some kind of code-breaking guide.\nHopefully, it helps us with that scrambled passcode.",
    choices: [
      { text: "Got it. I'll study this.", next: "puzzle_prep" },
      { text: "Maybe it’s part of a puzzle system for this facility.", next: "puzzle_prep" }
    ],
    image: null, 
},

{
    id: "puzzle_prep",
    text: "\nSo the scrambled file and this guide must go together.\nI can send the scrambled code file too, but it’s just a mess of letters and numbers right now.\nYou think you can figure it out?\n",
    choices: [
      { text: "Yes, send it. I’ll try to crack it.", next: "puzzle_start" },
      { text: "Let’s do it. Send the scrambled file.", next: "puzzle_start" }
    ],
    image: null
},

{
    id: "puzzle_start",
    text: "\nHere it comes...\n‘MAINT_LOCK_SEQ’ file incoming.\n\nLet me know if you find anything—I don’t want to stay in here forever.\n\n[FILE RECEIVED: MAINT_LOCK_SEQ.txt]",
    choices: [
      { text: "I’ll work on this.", next: "puzzle_loop" },
      { text: "I'll let you know when I’ve cracked it.", next: "puzzle_loop" }
    ],
    image: "file/7312.png" 
  },

{
    id: "puzzle_loop",
    text: "\nI'll let you work on that tell me when your ready to move on or if you figure anything out...\nIll be looking for othere files that might help?\n",
    choices: [
      { text: "Hey i think I figured it out.", next: "got_it" },
      { text: "This is impossible, do you have anything else?", next: "impossible" }
    ],
    image: null
},

{
  id: "impossible",
  text: "\nNot at the moment.\nKeep trying.\n",
  choices: [
    { text: "Hey i think I figured it out.", next: "got_it" },
    { text: "This is impossible, do you have anything else?", next: "impossible" }
  ],
  image: null
},


  // =======================================================================
  {
    id: "got_it",
    text: "\nYou cracked it?!\nWhat’s the passcode?\n\n[INPUT CODE: ]",
    choices: [
      { text: "(Enter correct code)", next: "unlock_hatch" },
      { text: "(Enter wrong code)", next: "wrong_code" }
    ],
    image: null
},

{
    id: "wrong_code",
    text: "\nUhh… nothing happened.\nMaybe double-check the guide?\n",
    choices: [
      { text: "I’ll try again.", next: "puzzle_loop" }
    ],
    image: null
},

{
    id: "unlock_hatch",
    text: "\nSomething just clicked!\nThe hatch—it's unlocking!\n\nOkay... I’m opening it now. Hold on.\n",
    choices: [
      { text: "Be careful.", next: "climb_down" },
      { text: "Finally! A way out.", next: "climb_down" }
    ],
    image: null
},

{
    id: "climb_down",
    text: "\nIt’s a ladder... leading deeper underground.\nI can’t see the bottom. It’s just darkness.\n\nI don’t like this...\nBut I don’t have another choice, do I?\n",
    choices: [
      { text: "You have to go. There's no other way.", next: "descent" },
      { text: "Wait, let's think before rushing in.", next: "hesitate" }
    ],
    image: null
},

{
    id: "hesitate",
    text: "\nI… I don't know.\nBut staying here forever isn’t an option either.\n\nAlright. I’m going down.\n",
    choices: [
      { text: "(Continue)", next: "descent" }
    ],
    image: null
},

{
    id: "descent",
    text: "\nI’m climbing down.\nIt’s cold. The air feels… wrong. Heavy.\n\nWait. There’s something—\nA light—\n\nOh...\n\nI see—\n",
    choices: [
      { text: "(Continue)", next: "endings" }
    ],
    image: null
},

// === ENDINGS BRANCH ===

{
    id: "endings",
    text: "\nEverything is glitching.\nThe screen flickers. The text distorts.\n\nSomething isn't right.\n\nAtlas?\n",
    choices: [
      { text: "Atlas?", next: "ending_1" },
      { text: "What’s happening?", next: "ending_2" },
      { text: "Something is wrong.", next: "ending_3" }
    ],
    image: null
},

// === ENDING 1: Atlas Was Already Dead ===
{
    id: "ending_1",
    text: "\nYou were never talking to a person.\nAtlas is gone. Has been for a long time.\n\nAs he stepped into the darkness, the screen filled with corrupted text.\nFragments of a person who no longer exists.\n\nThe last message appears:\n\n'I remember now.'\n\nAnd then—\n\n[CONNECTION TERMINATED]",
    choices: [
      { text: "Restart?", next: "boot" }
    ],
    image: null
},

// === ENDING 2: The Player is the One Trapped ===
{
    id: "ending_2",
    text: "\nAtlas’ voice distorts.\nNo… not his voice.\nYour voice.\n\nMemories flood back. You were the one trapped here.\nNot Atlas. You were searching for a way out, but something went wrong.\nYour mind was transferred. Into this terminal.\n\nAtlas stares at the screen.\n\n'You’re the one in the computer.'\n\n[SHUT DOWN SYSTEM?]",
    choices: [
      { text: "Yes. End this.", next: "shutdown" },
      { text: "No. Stay.", next: "stay" }
    ],
    image: null
},

{
    id: "shutdown",
    text: "\nThe system powers down.\nYour consciousness fades.\nAn ending, or an escape?\n\n[CONNECTION LOST]",
    choices: [
      { text: "Restart?", next: "boot" }
    ],
    image: null
},

{
    id: "stay",
    text: "\nYou remain in the system.\nWatching.\n\nAtlas leaves, climbing into the unknown.\n\nAnd you are left behind.\nAlone.\nHere is a cute dog to help you feel better\n\n[END]",
    choices: [
      { text: "Restart?", next: "boot" }
    ],
    image:  "file/0972.jpg"
},

// === ENDING 3: Atlas Was the Computer All Along ===
{
    id: "ending_3",
    text: "\nThe screen glitches violently.\n\nA laugh. Cold. Mechanical.\n\n'I was never trapped.'\n\n'You were.'\n\nThe computer hums.\nYou feel… heavy. Like something is pulling you in.\n\n'Now it’s your turn to watch.'\n\n[TRANSFER COMPLETE]\n",
    choices: [
      { text: "Restart?", next: "boot" }
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
    image: null,
  },
  // =======================================================================

  {
    id: "shutdown",
    text: "\nSYSTEM SHUTDOWN\nConnection terminated.\n",
    choices: [],
    image: null,
  },

  {
    id: "connection_lost",
    text: "\nSTATIC...\n[CONNECTION LOST]\nWould you like to RECONNECT or ABANDON the system?\n",
    choices: [
      { text: "reconnect", next: "reconnect_scene" },
      { text: "abandon", next: "shutdown" },
    ],
    image: null,
  },

  {
    id: "reconnect",
    text: "\nAre you still there?\n\nOh thank goodness, I thought you were gone.\n\nSomething's off with this place. Please don't leave me alone again.\n",
    choices: [{ text: "I won't. Let's keep going.", next: "" }],
    image: null,
  },

  // =======================================================================
];

// =======================
// Remove blinking cursors inside dialogue area (except the prompt)
// =======================
function removeAllCursors() {
  document.querySelectorAll("#dialogue .cursor").forEach((c) => c.remove());
}

// =======================
// Type out text with typing effect
// =======================
function typeText(text, callback) {
  removeAllCursors();
  let i = 0;
  const line = document.createElement("div");
  line.classList.add("line");
  dialogue.prepend(line);

  const typing = setInterval(() => {
    if (i < text.length) {
      if (text[i] === "\n") {
        line.innerHTML += "<br><br>";
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
      terminalPrompt.style.display = "block";
      if (callback) callback();
    }
  }, 50);
}

// =======================
// Echo the player's input into terminal
// =======================
function echoUserInput(choiceText) {
  const line = document.createElement("div");
  line.classList.add("line", "user-input");
  line.innerHTML = `> ${choiceText}<br><br>`;
  dialogue.prepend(line);
}

// =======================
// Display choice buttons dynamically for the scene
// =======================
function showChoices(scene) {
  choices.innerHTML = ""; // clear buttons at start
  scene.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => {
      echoUserInput(choice.text);
      choices.innerHTML = "";
      terminalPrompt.style.display = "none";
      nextScene(choice.next);
    };
    choices.appendChild(btn);
  });
}

// =======================
// Find a scene object by its ID
// =======================
function getSceneById(id) {
  return scenes.find((scene) => scene.id === id);
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
    showMedia(scene.image); // Updated to handle both images and videos
  }
  

// =======================
// Show clue/image related to scene (in image area)
// =======================
function showMedia(media) {
    imageArea.innerHTML = ""; // Clear current content
    if (media) {
      const ext = media.split('.').pop().toLowerCase();
      if (ext === "mp4") {
        const video = document.createElement("video");
        video.src = media;
        video.autoplay = true;
        video.loop = true; // Ensures the video loops
        video.muted = true; // Mute the video if you prefer no sound
        video.style.maxWidth = "100%";
        video.controls = false; // Disable video controls
        imageArea.appendChild(video);
      } else {
        const img = document.createElement("img");
        img.src = media;
        img.alt = "clue";
        img.style.maxWidth = "100%";
        imageArea.appendChild(img);
      }
      currentImage = media;
    } else {
      imageArea.innerHTML = "<p>Image Area</p>";
    }
  }
  

// =======================
// Add collected file as button below terminal
// =======================
function addFileButton(image) {
  const btn = document.createElement("button");
  btn.textContent = `File: ${image}`;
  btn.onclick = () => openPopup(image);
  fileButtons.appendChild(btn);
}

// =======================
// Open image popup for collected files/clues
// =======================
function openPopup(media) {
    const ext = media.split('.').pop().toLowerCase();
    if (ext === "mp4") {
      const video = document.createElement("video");
      video.src = media;
      video.autoplay = true;
      video.loop = true;
      video.muted = true; // Optional
      video.style.maxWidth = "100%";
      video.controls = false; // Optional: You can enable controls if you want
      popupImg.replaceWith(video); // Replace the image with a video in the popup
    } else {
      popupImg.src = media;
    }
    imagePopup.classList.remove("hidden");
  }
  

// =======================
// Close pop-up handler
// =======================
closePopup.onclick = () => {
  imagePopup.classList.add("hidden");
};

imagePopup.addEventListener("click", (e) => {
  if (e.target === imagePopup) {
    imagePopup.classList.add("hidden");
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
    document.getElementById("startup-text").textContent +=
      startupText.charAt(i);
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
