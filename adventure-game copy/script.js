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
      { text: "OoOOoh I'm a ghost!", next: "silent2" },
      { text: ". . .", next: "silent_1" },
    ],
    image: null,
  },

  {
    id: "hello",
    text: "\nHello?!\nWait... you are a person?\nHow did you get this computer to turn on? Let alone connect to it...\nYou know what? I dont even care. I'm desperate for any help I can get at this point.\n",
    choices: [
      { text: "I am a real person. Who is this?", next: "who_response" },
      { text: "I know as much as you do. Who is this?", next: "who_response" },
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
    id: "who_response",
    text: "\nMy name’s Atlas.\nI thought I was alone.\nIt’s been hours.\nI tried this computer but couldn't get it to turn on until your message appeared, then it just turned on by itself\n",
    choices: [
      { text: "Where are you?", next: "where" },
      { text: "What happened? It just turned on?", next: "what_is_this" },
    ],
    image: "file/0972.jpg",
  },

  {
    id: "what_is_this",
    text: "\nI don’t really know. One minute, it’s dead. Then I get your message... and it just turns on.\nIt’s like it’s waiting for something.\n",
    choices: [
      { text: "Maybe it's a trap. Can you get out?", next: "can_get_out" },
      {
        text: "Something's off. Something's messing with you.", next: "something_off",
      },
    ],
    image: null,
  },

  

  {
    id: "how_long",
    text: "\nYa, I don’t know... Hours? Maybe longer. I’ve lost track.\nI’ve just been stuck here, trying to figure out what happened, but the place is all dark and cold.\nIt’s like the walls are closing in.\n",
    choices: [
    //   { text: "Stay calm. We'll figure this out.", next: "stay_calm" },
      { text: "Can you hear anything? Anyone else?", next: "anyone_else" },
    ],
    image: null,
  },

  {
    id: "anyone_else",
    text: "\nNo. I don’t hear anyone else.\nBut… sometimes I swear I hear something.\nNot just the hum. Footsteps. Breathing.\nSomething’s moving.\n",
    choices: [
        { text: "That's just your mind playing tricks.", next: "mind_tricks" },
        { text: "You need to be careful. This could be dangerous.", next: "dangerous" }
    ],
    image: null
},

{
    id: "mind_tricks",
    text: "\nYeah, probably.\nI’m just so alone down here... It’s messing with me.\nLet’s focus. Any chance you can help me find a way out?\n",
    choices: [
        { text: "I can try. Do you have any idea where you are?", next: "where" },
        // { text: "Tell me more about that hum. Is it constant?", next: "hum_constant" }
    ],
    image: null
},

{
    id: "dangerous",
    text: "\nYeah... Something’s definitely wrong.\nI just hope whatever’s out there isn’t paying attention to me.\n",
    choices: [
        // { text: "Stay quiet. We don’t want to draw attention.", next: "stay_quiet" },
        { text: "You have to find a way out. This isn’t safe.", next: "find_way_out" }
    ],
    image: null
},

{
    id: "find_way_out",
    text: "\nI know.\nI’m looking around. But everything’s so… sealed off.\nI don’t know how much longer I can last in here.\n",
    choices: [
        { text: "Where are you exactly?", next: "where" },
        // { text: "Can you see anything that could help? A way out?", next: "way_out" }
    ],
    image: null
},

  {
    id: "where",
    text: "\nSome kind of bunker. Underground, I think.\nMe and my friends found this old place. My friends were messing around and locked me in a closet.\nReal funny, right?\nWhen I was inside, I heard this awful machine like humming.\nIt felt like needles in my brain and I started freaking out.\nAnd then another door—one I swear wasn’t there before—opened up behind me.\nI panicked and ran through. The door slammed shut. Leaving me in a dark twisting hallway.\nAfter a lot of yelling and hitting the wall, I walked the only way I could, and I ended up in here. It’s been hours.\nIt’s just me now…\nand this computer.\n",
    choices: [
      { text: "Can you describe the room?", next: "where_describe" },
      // { text: "Check to see if the door can be opened again.", next: "" },
    ],
    image: "file/7312.png",
  },

  {
    id: "where_describe",
    text: "\nUh, yeah—\nIt’s like a maintenance room, I think?\nBare concrete. Heavy pipes. Rust...\nThere's a big, old computer bank—this one—and some scattered papers.\nEverything’s dusty, looks like no one's been here for decades.\nThere's also a hatch in the floor, but it’s locked tight.\nNo tools in sight. Figures.\nThis computer might be the only thing I can actually use right now.",
    choices: [
      {
        text: "Maybe see if the computer can show a way out.", next: "try_computer"},
      { text: "What about in the hallway?", next: "hall" },
    ],
    image: null,
  },

  {
    id: "hall",
    text: "\nThere's nothing in the hall, some harsh overhead lighting and cement walls is all I could find.\n",
    choices: [
      { text: "Well maybe the computer can help.", next: "try_computer" },
      // { text: "Go check again. Just in case.", next: "" },
    ],
    image: null,
  },

  {
    id: "try_computer",
    text: "\nOkay.\nThere’s a menu. Looks like old company files maybe...\n",
    choices: [
      { text: "Company? What company?", next: "what_co" },
      { text: "Files of what?", next: "wh_file" },
    ],
    image: null,
  },

  {
    id: "what_co",
    text: "\nThe Arcana company... I don't know what that means.\nBased my current predicament not a company that wanted to be known.\n",
    choices: [
      { text: "Can you try sending them?", next: "send_blueprints" },
      { text: "Maybe the files can tell us something.", next: "wh_file" },
    ],
    image: null,
  },

  {
    id: "wh_file",
    text: "\nThere's lots of files that wont open...\nOh here's one! A schematic.\nOr blueprint of some sort?\n'Schematic #7'???\n",
    choices: [
      { text: "Can you try sending it?", next: "send_blueprints" },
      // { text: "", next: "" },
    ],
    image: null,
  },

  {
    id: "send_blueprints",
    text: "\nYa I think I just sent it. Did it show up?\n",
    choices: [
      { text: "Yep. What is this?", next: "file1got" },
      { text: "No...*evil chuckle*", next: "evil_chuckles" }
    ],
    image: "file/arcanalgo.png",
  },

  {
    id: "evil_chuckles",
    text: "\nDid you literally just type \"evil chuckle\"...?\n",
    choices: [
      { text: "uh....*cough* *cough* Anyway...", next: "awkward" },
      { text: "No...*evil chuckle again*", next: "awkward" }
    ],
    image: "file/arcanalgo.png",
  },
  {
    id: "awkward",
    text: "Okay... well I am going to chalk that up to humor and not that my only chance of my escape is with the help of some crazy person\nI'll also assume you actually did receieve them.\nThe file is strange though. Half of it doesn't even look like english.\nMaybe its corrupted.\n",
    choices: [
      { text: "Keep digging. look for files about exits.", next: "ab_exits" },
      // { text: "Look at it closer to be sure. Is anything on it familiar to you?", next: "blu_aha" },
      // { text: "", next: "" }
    ],
    image: null,
  },
  {
    id: "file1got",
    text: "\nNo idea.\nHalf of it doesn't even look like english.\nMaybe its corrupted.\n",
    choices: [
      { text: "Keep digging. Anything about exits?", next: "ab_exits" },
      // { text: "Look at it closer to be sure. Is anything on it familiar to you?", next: "blu_aha" },
      // { text: "", next: "" }
    ],
    image: null,
  },

  {
    id: "ab_exits",
    text: "\nHold on.\nFound a file on service tunnels.\nBut it is totally corrupted, wont let me send or open it.\n",
    choices: [
      { text: "Keep looking.", next: "heard" },
      // { text: "", next: "" },
      // { text: "", next: "" }
    ],
    image: null,
  },

{
   id: "heard",
   text: "I'm looking...\nWait.\nI think I just heard something...\nDown the hall.\n",
   choices: [
    { text: "Probably just your nerves. Keep looking.", next: "keep_l" },
    { text: "Could it be your friends?", next: "hall_friend" },
    { text: "What did you hear?.", next: "wh_hear" }
  ],
  image: null,
},

  {
    id: "keep_l",
    text: "\nYa okay.\nHey I got one!\nThere’s a maintenance schematic for a panel on the wall\nLooks like its behind the bookshelf.\n",
    choices: [
      { text: "Can you get behind the bookshelf?", next: "bookshelf_b" },
      // { text: "", next: "" },
      // { text: "", next: "" }
    ],
    image: null,
  },

  {
    id: "hall_friend",
    text: "\nIt's possible. Creepy. But possible. Seems like they would call my name if it were them.\n",
    choices: [
      { text: "Maybe just focus on the bookshelf. Can you get behind it?", next: "bookshelf_b" },
      { text: "You should go investigate, just in case.", next: "inv1" },
      { text: "What did it sound like?", next: "wh_hear" }
    ],
    image: null,
  },

  {
    id: "wh_hear",
    text: "\nIt was brief, but it sounded like shuffling, like someone dragging their feet.\n",
    choices: [
      { text: "Ya avoid that... Can you get behind the bookshelf?", next: "bookshelf_b" },
      { text: "You should check it out.", next: "inv1" },
    ],
    image: null,
  },
// ---- Again find way to pause this dialogue for a moment?
  {
    id: "inv1",
    text: "\nOkay... I'll go down the hall and investigate\nI'll be right back\nI'm back.\nWhile creepy it was uneventful. I didnt find anything or anyone.",
    choices: [
      { text: "Well better safe than sorry. Think you can get behind the bookshelf?", next: "bookshelf_b" },
      { text: "Lets hope it was nothing. Can you move that bookshelf?", next: "bookshelf_b" },
    ],
    image: null,
  },

  {
    id: "bookshelf_b",
    text: "\nIt's pretty big... I can try. There's a reason my friends could shove me into the closet.\nI'm not the strongest or biggest individual.\n",
    choices: [
      { text: "Go try! There's a chance it could help!", next: "bookshelf_f" },
      // { text: "So... You're a wimp?", next: "wimpy" },
      // { text: "", next: "" }
    ],
    image: null,
  },

  // ------Maybe find a way to make it pause here for a moment?
  {
    id: "bookshelf_f",
    text: "\nI moved it!\nWell. More so I rocked it until it tipped over and nearly crushed me...\nBut, good news, I found the panel.\nBad news, it's locked and needs a passcode of some sort.\n",
    choices: [
      { text: "Great Job! Maybe we can find the code in the computer files?", next: "f_code" },
    //   {text: "Try hitting random numbers.", next: "random_num" },
    //   {text: "Hopefully you don't need anything trapped under that bookshelf...", next: "bookshelf_f_2" },
    ],
    image: null,
  },

  {
    id: "f_code",
    text: '\nChecking now.\nConveniently there’s a section labeled "Override Codes."\nUnconveniently the numbers are... off.\n',
    choices: [
      { text: "Off how...?", next: "offhow" },
      // { text: "Corrupted?", next: "" },
      // { text: "", next: "" }
    ],
    image: null,
  },

  {
    id: "offhow",
    text: "\nLike they’re incomplete.\nMissing digits.\nOr more so... replaced with symbols.\nI just sent it so you can see.\n",
    choices: [
      { text: "Strange...", next: "somewhere" },
    //   { text: "Lets backtrack. Look carefully at the blueprint. Is there anything there you might recognize?", next: "blu_aha"},
    ],
    image: null,
  },

  {
    id: "blu_aha",
    text: "\nNo.\nNot a thing...\nWait a minute.\nIt is hard to say for sure, it was dark and I was really freaking out\n but this might be the closet I was stuck inside!\n I remember hitting my elbow on what felt like a metal bar and this schematic has that weird lever!\n And the door on the right looks similar to the door I fell out of into the hallway!\n",
    choices: [
      { text: "Now we are getting somewhere!", next: "somewhere" },
      // { text: "You dumb kid, how did you not see that sooner?!", next: "" },
      // { text: "", next: "" }
    ],
    image: null,
  },

  {
    id: "somewhere",
    text: "\nWait. I heard something again...\n",
    choices: [
    //   { text: "I think its just your nerves getting to you,", next: "nerves" },
      { text: "I'm not so sure you're alone", next: "not_sure" },
      // { text: "WEE-WOO-WEE-WOO!!!! HE'S OVER HERE!!!", next: "" }
    ],
    image: null,
  },

  {
    id: "not_sure",
    text: "\nIt stopped. but for a moment I thought in the hallway I saw...\nNo couldnt have been.\n",
    choices: [
      { text: "You thought you saw...what?", next: "saw_what" },
    //   { text: "Maybe go look down the hallway to investigate.", next: "investigate_hallway" }
    ],
    image: null,
  },
// --------
  {
    id: "nerves",
    text: "\nYa you're proabably right.\n Lets get back to work.\nI want to get out of here!\nWe know there's a code panel, and we have the 'Schematic #7' with the closet/device I got shoved in.\nWhat do you think we should focus on?\n",
    choices: [
      { text: "Let's look for clues with the closet you got trapped in.", next: "clu_thepod" },
      { text: "Let's see if we can find out more about that code panel.", next: "" },
      { text: "I have another question.", next: "noth_q" }
    ],
    image: null,
  },

  {
    id: "saw_what",
    text: "\nI dont really know if I want to say it.\n I will sound crazy.\nI know I'm alone down here.\n",
    choices: [
    //   {
    //     text: "On second thought, it's probably just your nerves getting to you.",
    //     next: "nerves",
    //   },
      { text: "Could it be your friends? You should check.", next: "investigate_hallway" }
    ],
    image: null,
  },
// ------ Another pause here
  {
    id: "investigate_hallway",
    text: "\nI don’t know if that’s a good idea... But I’ll take a quick peek.\nHold on.\n\n. . .\n\nI think I saw someone, but... their movements weren’t right. Like they were glitching or flickering.\n",
    choices: [
    //   { text: "Stay far away from that hallway!", next: "stay_away" },
      { text: "Go hide and observe more.", next: "observe_flicker" },
    ],
    image: null,
  },
// ------ Another pause here
  {
    id: "observe_flicker",
    text: "\nOkay.\nI stayed hidden around the corner, and... it disappeared.\nI swear it looked like...\nWell... me. Same clothes, same hair, but the face...\nit was blank. And for the moment it appeared it seemed to be making a machine like hum",
    choices: [
    //   { text: "Maybe stay away for now", next: "stay_away" },
      {text: "Blank? Could it be connected to the humming you heard in the closet?", next: "connect_hum"},
    ],
    image: null,
  },

  {
    id: "flicker_call",
    text: "\nWait... I hear it again. My name... faint, but it's there. From the hallway.\nWho’s messing with me? Why now? I thought it was just me here.\n",
    choices: [
      {
        text: "That’s strange. Could it be another person?",
        next: "strange_voice",
      },
      { text: "We need to focus. Forget about the voice.", next: "focus" },
      {
        text: "Go check the hallway again. This is too weird.",
        next: "investigate_flicker_2",
      },
    ],
    image: null,
  },

  {
    id: "stay_away",
    text: "\nOh I am.\n I wish there was a door I could lock.\nOkay, but really. That was messed up...\nLet’s get back to the panel and the files and get me out of here.\n",
    choices: [
      { text: "Alright, let’s focus.", next: "pro_ima" },
      { text: "Do you still have that blueprint?", next: "blu_aha" },
    ],
    image: null,
  },

  {
    id: "connect_hum",
    text: "\nThe humming... yeah maybe.\nIt felt like it changed something around me.\nAnd that thing looked... off, like a corrupted version of me.\nMaybe this place is messing with my head.\n",
    choices: [
      { text: "Let’s stay focused and get you out.", next: "nerves" },
      { text: "Maybe the computer has more clues about this.", next: "nerves" },
    ],
    image: null,
  },

  {
    id: "clu_thepod",
    text: "\nAlright let me see if I can find any file that explains the 'closet'.\nMaybe if I look in a nearby file.\nHmmm... This is interesting.\nDoes this make any sense to you?\n",
    choices: [
      { text: "It does!", next: "does" },
      { text: "Not a clue.", next: "doesnt" },
    ],
    image: "",
  },

  {
    id: "does",
    text: "\nGood, because I don’t.\nIt’s labeled 'Subject Containment'...\nWhy would they call a closet that?\n",
    choices: [
      { text: "Maybe it's not really a closet.", next: "containment_room" },
      { text: "Weird. Keep looking.", next: "keep_l" },
    ],
    image: null,
  },

  {
    id: "doesnt",
    text: "\nNo worries, me neither.\nBut it’s labeled 'Subject Containment'.\nSounds... intense.\n",
    choices: [
      {
        text: "That doesn't sound like a normal closet...",
        next: "containment_room",
      },
      {
        text: "Keep digging, maybe something else explains it.",
        next: "keep_l",
      },
    ],
    image: null,
  },

  {
    id: "containment_room",
    text: "\nYeah...\nNow that you mention it...\nWhat if I wasn’t supposed to get out of that 'closet'?\n",
    choices: [
      {
        text: "You think they were keeping something locked inside?",
        next: "whatlocked",
      },
      { text: "Let's not jump to conclusions yet.", next: "keep_l" },
    ],
    image: null,
  },

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
  showImage(scene.image);
}

// ==============================================
// Show clue/image related to scene (in image area)
// ==============================================
function showImage(image) {
  imageArea.innerHTML = "";
  if (image) {
    const img = document.createElement("img");
    img.src = image;
    img.alt = "clue";
    img.style.maxWidth = "100%";
    imageArea.appendChild(img);
    currentImage = image;
  } else {
    imageArea.innerHTML = "<p>Image Area</p>";
  }
}

// ==============================================
// Add collected file as button below terminal
// ==============================================
function addFileButton(image) {
  const btn = document.createElement("button");
  btn.textContent = `File: ${image}`;
  btn.onclick = () => openPopup(image);
  fileButtons.appendChild(btn);
}

// ==============================================
// Open image popup for collected files/clues
// ==============================================
function openPopup(image) {
  popupImg.src = image;
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
