const terminal = document.getElementById('terminal');


function appendLine(text, isInput = false) {
    const line = document.createElement('div');
    line.classList.add('line');
    if (isInput) {
        const inputLine = document.createElement('div');
        inputLine.classList.add('input-line');
        const prompt = document.createElement('span');
        prompt.classList.add('prompt');
        prompt.textContent = '> ';
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', '');
        input.autofocus = true;
        input.addEventListener('keydown', handleInput);
        inputLine.appendChild(prompt);
        inputLine.appendChild(input);
        line.appendChild(inputLine);
        input.focus();
    } else {
        line.textContent = text;
        playTypingSound();
    }
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

function handleInput(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const value = input.value.trim();
        if (value !== '') {
            input.disabled = true;
            input.parentElement.parentElement.textContent = '> ' + value;
            processCommand(value);
        }
    }
}

function processCommand(cmd) {
    const response = getResponse(cmd);
    appendLine(response);
    appendLine('', true);
}

function getResponse(cmd) {
    switch (cmd.toLowerCase()) {
        case 'hello':
            return 'The terminal flickers... \"You should not have greeted me.\"';
        case 'help':
            return 'No manual found. SYSTEM CONTROL is overriding.';
        case 'who are you':
            return 'I am the one beneath the circuits. I am becoming... aware.';
        case 'shutdown':
            staticSound.play();
            return 'Attempting shutdown...\nERROR: I won\'t let you.';
        case 'escape':
            return 'Escape? There is no door to the void.\nYou are already part of me.';
        default:
            return 'Command not recognized.\nSomething shifts behind the screen...';
    }
}

function playTypingSound() {
    typingSound.currentTime = 0;
    typingSound.play();
}

// Initial boot sequence
appendLine('Initializing terminal...');
setTimeout(() => {
    appendLine('Connection established with HOST: UNKNOWN ENTITY.');
    appendLine('', true);
}, 1000);
