// Event listener for the submit button
document.getElementById('submit-btn').addEventListener('click', function() {
    // Get user input and shift value
    const userInput = document.getElementById('user-input').value;
    const shiftValue = parseInt(document.getElementById('shift-value').value);
    
    // Validate input
    if (isNaN(shiftValue)) {
        alert("Please enter a valid shift value.");
        return;
    }

    // Check if toggle switch is ON (decode) or OFF (encode)
    const isDecoding = document.querySelector('.switch input').checked;
    
    // If decoding, reverse the shift value
    const finalShift = isDecoding ? -shiftValue : shiftValue;

    // Call the Caesar cipher function
    const cipherText = caesarCipher(userInput, finalShift);
    
    // Display the ciphered text in the output area
    document.getElementById('output-text').value = cipherText;
});

// Caesar cipher function
function caesarCipher(input, shift) {
    let cipheredText = '';
    
    // Loop through the input text
    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char.match(/[a-zA-Z]/)) {
            // Check if it's a letter and apply the shift
            const base = char === char.toLowerCase() ? 97 : 65; // ASCII 'a' or 'A'
            const charCode = char.charCodeAt(0);
            const shiftedCode = (charCode - base + shift + 26) % 26 + base;
            cipheredText += String.fromCharCode(shiftedCode);
        } else {
            // If it's not a letter, add the character unchanged
            cipheredText += char;
        }
    }
    return cipheredText;
}

// Optional: Toggling dark/light mode with the switch
const switchToggle = document.querySelector('.switch input');
switchToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
