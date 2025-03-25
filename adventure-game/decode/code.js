document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-encoder-decoder");
    const shiftInput = document.getElementById("shift-value");
    const userInput = document.getElementById("user-input");
    const outputText = document.getElementById("output-text");

    let isEncoding = true;  // By default, the button will encode

    // Function to handle the Caesar Cipher encoding/decoding
    function caesarCipher(text, shift, encode = true) {
        const result = [];
        const shiftValue = encode ? shift : -shift;  // Negative shift for decoding

        for (let i = 0; i < text.length; i++) {
            let char = text[i];

            if (/[a-zA-Z]/.test(char)) {  // If it's a letter, apply the cipher
                const startCharCode = char === char.toLowerCase() ? 97 : 65;  // a=97, A=65
                const newChar = String.fromCharCode(
                    ((char.charCodeAt(0) - startCharCode + shiftValue + 26) % 26) + startCharCode
                );
                result.push(newChar);
            } else {
                result.push(char);  // Non-alphabet characters remain unchanged
            }
        }

        return result.join('');
    }

    // Event listener for the button to toggle encoding/decoding
    toggleButton.addEventListener("click", () => {
        // Toggle between encoding and decoding
        isEncoding = !isEncoding;
        toggleButton.textContent = isEncoding ? "Encode" : "Decode";  // Change button text
        outputText.value = "";  // Clear output when toggling
    });

    // Event listener for the submit button to process input and apply cipher
    document.getElementById("submit-btn").addEventListener("click", () => {
        const shift = parseInt(shiftInput.value) || 0;  // Get the shift value
        const inputText = userInput.value;  // Get the input text

        // Apply the cipher to the input text and update the output field
        outputText.value = caesarCipher(inputText, shift, isEncoding);
    });
});
