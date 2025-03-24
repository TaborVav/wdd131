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
        { text: "Initiate Program?", next: "hello" },
        { text: "Hello?", next: "hello" },
        { text: "Help Games", next: "hello" },
      ],
      image: null,
    },
  
    {
      id: "hello",
      text: "\nHello?!\nWait... are you a real person?\nHow did you get this computer to turn on? Let alone connect to it...\nYou know what? I dont even care. I'm desperate for any help I can get at this point.\n",
      choices: [
        { text: "I am a real person. Who is this?", next: "who_response" },
        { text: "I know as much as you do. Who is this?", next: "who_response" },
        { text: "...", next: "silent_1" },
      ],
      image: "file/blueprint.png",
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
        { text: ". . .", next: "shutdown" },
        {
          text: "Hey I'm here, sorry for the slow reply! Who's this?", next: "who_response"},
        {
          text: "Darn interference. Computers... right? Who's this?", next: "who_response"},
      ],
      image: null,
    },
  
    {
      id: "who_response",
      text: "\nMy name’s Atlas.\nI thought I was alone.\nIt’s been hours.\nI tried this computer but couldn't get it to turn on until your message appeared, then it just turned on by itself\n",
      choices: [
        { text: "Where are you?", next: "where" },
      //   { text: "What happened? It just turned on?", next: "what_is_this" },
      //   { text: "It's been hours?", next: "how_long" },
      ],
      image: "file/arcanalgo.png",
    },

  {
    id: "where",
    text: "\nSome kind of bunker. Underground, I think.\nMe and my friends found this old place. My friends were messing around and locked me in a closet.\nReal funny, right?\nWhen I was inside, I heard this awful machine like humming.\nIt felt like needles in my brain and I started freaking out.\nAnd then another door—one I swear wasn’t there before—opened up behind me.\nI panicked and ran through. The door slammed shut. Leaving me in a dark twisting hallway.\nAfter a lot of yelling and hitting the wall, I walked the only way I could, and I ended up in here.\n It’s been hours.\nIt’s just me now…\nand this computer.\n",
    choices: [
      { text: "Can you describe the room?", next: "where_describe" },
      { text: "Check to see if the door can be opened again.", next: "check_door" },
    ],
    image: "file/cipher guide.mp4",
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
    id: "check_door",
    text: "\nYeah, I tried. It's sealed tight. No keypad, no handle on this side.\nJust smooth metal, like it was never meant to be opened from in here.\nI even tried kicking it, but it didn’t budge.\n",
    choices: [
      { text: "", next: "" },
      // { text: "", next: "" },
      // { text: "", next: "" }
    ],
    image: null,
  },

  {
    id: "try_computer",
    text: "\nAlright... I’ll try.\nOkay, I’m in. This thing is ancient. Looks like a custom system, nothing I’ve ever used.\nBut there’s a bunch of directories... most are labeled with weird shorthand.\nSome folders just have random numbers, like ‘0718’ or ‘X3-Beta’.\n\nIt’s strange, though — the moment you messaged me, the screen flickered and unlocked a bunch of them. Like... like your message did something to the system.\n\nAnyway, I’ll start digging around.",
    choices: [
      { text: "Good idea, let me know what you find.", next: "digging" },
      { text: "Be careful. Who knows what’s on there.", next: "digging" },
      { text: "Why would my message unlock files?", next: "digging" }
    ],
    image: null
},

{
    id: "digging",
    text: "\nMost of these files look like logs or schematics. A lot of them are corrupted, though.\nThere’s... hold on.\n\n[typing sounds]\n\nThere’s a document here. ‘ACCESS_TUNNEL_MAP_01’.\nMight be useful.\nUploading it now.",
    choices: [
      { text: "Got it. Keep looking.", next: "digging2" },
      { text: "Can you read it? What's it show?", next: "map_talk" }
    ],
    image: "schematic_map.png"
},

{
    id: "map_talk",
    text: "\nIt shows a few tunnels branching out from this room.\nOne leads to what’s labeled ‘Maintenance Hatch’—that must be the one on the floor.\nAnother tunnel branching off of that one goes deeper underground…\nThat section is labeled ‘SECTOR 3’ with an additional label over it saying ‘RESTRICTED’.\n\nSomething about the map feels off, though.\nThe deeper tunnels don’t have room names or proper labels, just empty blocks and odd gaps in the grid.\nLike parts were erased or left unfinished on purpose.",
    choices: [
      { text: "Avoid the ‘RESTRICTED’ area for now. Focus on the hatch.", next: "hatch_check" },
      { text: "See if the computer has more info on ‘SECTOR 3’.", next: "void_sector" }
    ],
    image: null
},

// =======
{
    id: "digging2",
    text: "\nI’m still poking around...\n\nHmm. There’s a ‘MAINT_LOCK_SEQ’ file here, but it’s just a garbled mess. Like someone scrambled it on purpose.\nMaybe it’s some kind of passcode for the hatch?\n\nWait, there’s another file labeled ‘DECRYPT_GUIDE_01’. If those are related it is eerily convenient... But who am I to look a gift horse in the mouth? I’ll send the guide.\nMaybe you can make sense of it.",
    choices: [
      { text: "Send it over. I'll take a look.", next: "send_cipher" },
      { text: "Oof I didnt know I'd be doing homework for you. But okay, send it.", next: "send_cipher" }
    ],
    image: null
},

{
    id: "send_cipher",
    text: "\nUploading now...\nThis one looks like a manual or instruction set? I can't make sense of it.\nIt has strange symbols and patterns.\n\nMaybe this is some kind of code-breaking guide.\nHopefully, it helps us with that scrambled passcode.",
    choices: [
      { text: "Got it. I'll study this.", next: "puzzle_prep" },
      { text: "Maybe it’s part of a puzzle system for this facility.", next: "puzzle_prep" }
    ],
    image: "decrypt_guide.png" // This would be an image resembling an old printed manual with code wheels or substitution cipher hints.
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
    image: "scrambled_code.png" // This would be an encoded text with mixed characters, ready to be solved using the guide from "decrypt_guide.png".
},

{
    id: "puzzle_loop",
    text: "\nI'll let you work on that tell me when your ready to move on or if you figure anything out...\nIll be looking for othere files that might help?\n",
    choices: [
      { text: "Hey i think i figured it out.", next: "got_it" },
      { text: "This is impossible, do you have anything else?", next: "impossible" }
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
