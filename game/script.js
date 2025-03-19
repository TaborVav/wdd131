const story = {
    start: {
        prompt: "Booting...\n\n*** SYSTEM ONLINE ***\n\n\"Hello? Is someone there? Please... I need help.\"\n\n(Respond: hello/who)",
        responses: {
            hello: "intro1",
            who: "intro2"
        }
    },
    intro1: {
        prompt: "\"Oh thank goodness! I'm... I'm stuck. I don't know where I am. I think it’s some kind of bunker. Can you help me?\"\n\n(Respond: just breath/where_are_you)",
        responses: {
            calm_down: "intro3",
            where_are_you: "intro4"
        }
    },
    intro2: {
        prompt: "\"My name’s Alex. I was exploring this underground place with some friends... They locked me in as a prank... hours ago. Now, I’m really scared.\"\n\n(Respond: calm_down/where_are_you)",
        responses: {
            calm_down: "intro3",
            where_are_you: "intro4"
        }
    },
    intro3: {
        prompt: "\"I-I’m trying, but it’s dark. There’s only this old terminal here. Then you showed up. I think I heard something moving outside.\"\n\n(Respond: describe_room/what_sound)",
        responses: {
            describe_room: "room1",
            what_sound: "sound1"
        }
    },
    intro4: {
        prompt: "\"It looks like an old military bunker... metal walls, pipes, and this rusty computer I’m talking to you through.\"\n\n(Respond: describe_room/what_sound)",
        responses: {
            describe_room: "room1",
            what_sound: "sound1"
        }
    },
    room1: {
        prompt: "\"There’s a door with no handle, a vent up high, and some strange panel with wires on the wall.\"\n\n(Respond: inspect_panel/try_vent)",
        responses: {
            inspect_panel: "puzzle1",
            try_vent: "vent1"
        }
    },
    sound1: {
        prompt: "\"Scraping... like metal on concrete. It stopped now. Please, what should I do?\"\n\n(Respond: inspect_panel/try_vent)",
        responses: {
            inspect_panel: "puzzle1",
            try_vent: "vent1"
        }
    },
    puzzle1: {
        prompt: "** IMAGE: schematic.png appears **\n\n\"The panel has colored wires and some old labels. It looks dangerous. What should I cut?\"\n\n(Respond: red/blue/green/yellow)",
        responses: {
            red: "mishap1",
            blue: "safe1",
            green: "mishap2",
            yellow: "mishap1"
        }
    },
    vent1: {
        prompt: "\"I can’t reach it. Too high up, and nothing to climb on. The panel might be my only way.\"\n\n(Respond: inspect_panel)",
        responses: {
            inspect_panel: "puzzle1"
        }
    },
    safe1: {
        prompt: "\"It worked! The door just clicked. It might be open now.\"\n\n(Respond: open_door/peek_first)",
        responses: {
            open_door: "open1",
            peek_first: "peek1"
        }
    },
    mishap1: {
        prompt: "** Sparks fly! **\n\n\"AH! Something shocked me! The computer screen is glitching—wait... are you still there?\"\n\n(Respond: yes/hold_on)",
        responses: {
            yes: "glitch1",
            hold_on: "glitch1"
        }
    },
    mishap2: {
        prompt: "** A loud bang! **\n\n\"The lights just died... I think I messed up. I can barely see anything.\"\n\n(Respond: stay_put/feel_around)",
        responses: {
            stay_put: "glitch1",
            feel_around: "glitch1"
        }
    },
    glitch1: {
        prompt: "** STATIC... **\n\n[CONNECTION LOST]\n\nWould you like to RECONNECT or ABANDON the system? (reconnect/abandon)",
        responses: {
            reconnect: "reconnect1",
            abandon: "shutdown"
        }
    },
    reconnect1: {
        prompt: "** SYSTEM RESTORED **\n\n\"I... I’m still here. But something feels... wrong. I don’t think I’m alone anymore.\"\n\n(Respond: wrong_how/what_do_you_mean)",
        responses: {
            wrong_how: "reveal1",
            what_do_you_mean: "reveal1"
        }
    },
    reveal1: {
        prompt: "\"I can hear voices... but they don’t sound human. Also... I think this terminal is older than I thought. The date says 1953. That can’t be right...\"\n\n(Respond: check_logs/ask_age)",
        responses: {
            check_logs: "logs1",
            ask_age: "boy_reveal"
        }
    },
    logs1: {
        prompt: "** LOG FILE: 'PROJECT VESSEL' **\n\n[TOP SECRET]\nSubject's consciousness successfully transferred into digital framework...\n\n(Respond: ask_age/confront)",
        responses: {
            ask_age: "boy_reveal",
            confront: "boy_reveal"
        }
    },
    boy_reveal: {
        prompt: "\"Wait... No, no... What are you saying? I've been here for... for HOURS, not decades!\"\n\n(Respond: explain/project_info)",
        responses: {
            explain: "meltdown",
            project_info: "meltdown"
        }
    },
    meltdown: {
        prompt: "** SYSTEM ERROR **\n\n\"No! Get me out! Get me out of here!\"\n\n** WARNING: SYSTEM UNSTABLE **\n\n(Respond: force_quit/ride_it_out)",
        responses: {
            force_quit: "shutdown",
            ride_it_out: "twist1"
        }
    },
    twist1: {
        prompt: "** The screen flickers violently **\n\nSuddenly... you feel cold, like something is pulling you...\n\n[Loading deeper simulation...]\n\n(Respond: continue)",
        responses: {
            continue: "user_twist"
        }
    },
    user_twist: {
        prompt: "\"Hey... can you hear me? Who are you? Why are YOU in the terminal?\"\n\n** You look around, realizing you are inside the simulation now. **\n\n(To be continued...)",
        responses: {}
    },
    shutdown: {
        prompt: "** SYSTEM SHUTDOWN **\n\nConnection terminated.",
        responses: {}
    }
};


let currentStep = "start";

const imageTriggers = {
    // Step : [imageSrc, label]
    "showSchematic": ["images/schematic.png", "Schematic Diagram"],
    "showCipher": ["images/cipherwheel.png", "Cipher Wheel"]
};

function typeWriter(text, callback, speed = 30) {
    const promptEl = document.getElementById("prompt");
    promptEl.innerText = "";
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            promptEl.innerText += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            if (callback) callback();
        }
    }, speed);
}

function nextStep(next) {
    const step = story[next];
    const historyEl = document.getElementById("history");
    const promptEl = document.getElementById("prompt");
    const buttonsEl = document.getElementById("buttons");

    // Append previous prompt to history
    const block = document.createElement("div");
    block.innerHTML = `<div>${promptEl.innerText}</div>`;
    historyEl.appendChild(block);

    // Clear current prompt & buttons
    promptEl.innerText = "";
    buttonsEl.innerHTML = "";

    // Show next prompt
    typeWriter(step.prompt);

    // Create response buttons
    for (const [key, value] of Object.entries(step.responses)) {
        const btn = document.createElement("button");
        btn.className = "response";
        btn.innerText = key.toUpperCase();
        btn.onclick = () => nextStep(value);
        buttonsEl.appendChild(btn);
    }

    // Scroll to bottom
    historyEl.scrollTop = historyEl.scrollHeight;

    // Handle image triggers
    if (imageTriggers[next]) {
        const [src, label] = imageTriggers[next];
        showImage(src, label);
    } else {
        clearImage();
    }

    currentStep = next;
}

// Boot Sequence
window.onload = () => {
    const bootText = [
        "Booting terminal...",
        "Loading system files...",
        "Establishing connection...",
        "System ready."
    ];

    function runBootSequence(i = 0) {
        if (i < bootText.length) {
            typeWriter(bootText[i], () => {
                setTimeout(() => runBootSequence(i + 1), 1000);
            }, 40);
        } else {
            setTimeout(() => nextStep(currentStep), 500);
        }
    }

    runBootSequence();
};

// Image functions
let unlockedImages = [];
function showImage(imageSrc, label) {
    const imgContainer = document.getElementById("imageDisplay");
    imgContainer.innerHTML = `<img src="${imageSrc}" alt="${label}">`;
    if (!unlockedImages.includes(imageSrc)) {
        unlockedImages.push(imageSrc);
        const btn = document.createElement("button");
        btn.textContent = label.toUpperCase();
        btn.onclick = () => openPopup(imageSrc);
        document.getElementById("fileButtons").appendChild(btn);
    }
}
function clearImage() {
    document.getElementById("imageDisplay").innerHTML = "";
}
function openPopup(src) {
    document.getElementById("popupImage").src = src;
    document.getElementById("popup").classList.remove("hidden");
}
document.getElementById("closePopup").onclick = () => {
    document.getElementById("popup").classList.add("hidden");
};
