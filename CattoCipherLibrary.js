// JavaScript version of CattoCipher functions
function reverseCipher(text) {
       let result = '';
        for (let i = 0; i < text.length; i++) {
            let character = text.charAt(i);
            if (character.match(/[A-Z]/)) {
                character = String.fromCharCode('Z'.charCodeAt(0) - (character.charCodeAt(0) - 'A'.charCodeAt(0)));
            } else if (character.match(/[a-z]/)) {
                character = String.fromCharCode('z'.charCodeAt(0) - (character.charCodeAt(0) - 'a'.charCodeAt(0)));
            }
            result += character;
        }
        return result;
}


function decryptHTML(decrypt, n) {
	let s = reverseCipher(decrypt);
	let escapedData = s.replace(/</g, '&lt;');
	escapedData = escapedData.replace(/>/g, '&gt;');
	escapedData = escapedData.replace(/\n/g, '<br>');
	escapedData = escapedData.replace(/\*\*\*(.*?)\*\*\*/g, '<b><i>$1</i></b>');
	escapedData = escapedData.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
	escapedData = escapedData.replace(/\*(.*?)\*/g, '<i>$1</i>');
	escapedData = escapedData.replace(/\-\-(.*?)\-\-/g, '<s>$1</s>');
	escapedData = escapedData.replace(/\_\_(.*?)\_\_/g, '<u>$1</u>');
	escapedData = escapedData.replace(/!c\.(#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}))\."(.*)"/g, '<span style="color: $1;">$2</span>');
    return escapedData;
}

function decrypt(decrypt, n) {
	return reverseCipher(decrypt);
}

function encrypt(encrypt, n) {
	return reverseCipher(encrypt);
}

/*
var userInput = prompt("Please enter something:");
var u = encrypt(userInput, 1);
console.log("User input: " + u);
console.log("User input: " + decrypt(u, 1));
*/
// test