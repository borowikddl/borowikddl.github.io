
const params = new URLSearchParams(window.location.search);

document.querySelector(".login").addEventListener('click', () => {
    toHome();
});

let welcome = "Dzień dobry!";

const date = new Date();
if (date.getHours() >= 18) {
    welcome = "Dobry wieczór!"
}
document.querySelector(".welcome").innerHTML = welcome;

function toHome() {
    // Use the global sendTo function.
    // The global sendTo function in navigation.js currently doesn't preserve existing URL params by default for 'home'.
    // If preserving 'params' from id.html to home.html is critical,
    // navigation.js would need adjustment or 'home' case should handle a 'param' argument.
    // For now, just calling sendTo('home').
    if (typeof sendTo === 'function') {
        sendTo('home');
    } else {
        console.warn('sendTo function not defined. Falling back to direct navigation for toHome().');
        location.href = 'home.html?' + params; // Fallback, kept relative
    }
}

const input = document.querySelector(".password_input");
input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        document.activeElement.blur();
    }
})

const dot = "•";
let original = "";
const eye = document.querySelector(".eye");

input.addEventListener("input", () => {
    let value = input.value.toString();
    const char = value.substring(value.length - 1);
    if (value.length < original.length) {
        original = original.substring(0, original.length - 1);
    } else {
        original = original + char;
    }

    if (!eye.classList.contains("eye_close")) {
        let dots = "";
        for (let i = 0; i < value.length - 1; i++) {
            dots = dots + dot
        }
        input.value = dots + char;
        delay(3000).then(() => {
            value = input.value; // value is already declared in the outer scope, reassignment is fine.
            if (value.length != 0) {
                input.value = value.substring(0, value.length - 1) + dot
            }
        });
    }
})

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

eye.addEventListener('click', () => {
    const classlist = eye.classList;
    if (classlist.contains("eye_close")) {
        classlist.remove("eye_close");
        let dots = "";
        for (let i = 0; i < input.value.length - 1; i++) {
            dots = dots + dot
        }
        input.value = dots;
    } else {
        classlist.add("eye_close");
        input.value = original;
    }
})
