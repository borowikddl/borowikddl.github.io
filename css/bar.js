// assets/bar.js

// Handles the state and navigation of the bottom bar.
// Data loading and management are now handled by data_manager.js and individual page scripts.

var params = new URLSearchParams(window.location.search);
var barElements = document.querySelectorAll(".bottom_element_grid");

// Initialize bar state based on localStorage
var currentBottomTab = localStorage.getItem('bottom');
if (currentBottomTab) {
    barElements.forEach((element) => {
        const image = element.querySelector('.bottom_element_image');
        const text = element.querySelector('.bottom_element_text');
        const sendAttribute = element.getAttribute('send');

        if (image && text) {
            if (sendAttribute === currentBottomTab) {
                image.classList.add(currentBottomTab + "_open");
                text.classList.add("open");
            } else {
                image.classList.remove(sendAttribute + "_open");
                // Ensure the base class is present if not open
                if (!image.classList.contains(sendAttribute)) {
                    image.classList.add(sendAttribute);
                }
                text.classList.remove("open");
            }
        } else {
            console.warn("Bottom bar element missing image or text container:", element);
        }
    });
}

// Specific sendTo for bottom bar navigation, manages 'top' and 'bottom' state
function navigateBarTo(page, topState, bottomState) {
    if (topState) {
        localStorage.setItem('top', topState);
    }
    if (bottomState) {
        localStorage.setItem('bottom', bottomState);
    }
    // Use the global sendTo function
    if (typeof sendTo === 'function') {
        // The global sendTo function handles .html extension and relative paths
        // It currently doesn't use the 'params' from this file by default for most pages,
        // but if specific pages handled by bar.js need to pass these params,
        // the 'param' argument of global sendTo or the global sendTo itself would need adjustment.
        // For now, we assume 'page' is enough.
        sendTo(page);
    } else {
        console.error('Global sendTo function is not defined. Navigation from bar.js might fail.');
        // Fallback to old relative navigation just in case, but this is not ideal.
        // Note: this fallback still uses a leading slash, which we are trying to remove.
        // The expectation is that assets/navigation.js is loaded and sendTo is available.
        location.href = `${page}.html` + (params.toString() ? '?' + params.toString() : '');
    }
}

barElements.forEach((element) => {
    element.addEventListener('click', () => {
        var targetPage = element.getAttribute("send");
        if (targetPage) {
            localStorage.setItem('bottom', targetPage); // Set active tab state
            // Pass 'targetPage' (which is like 'home', 'documents') directly to navigateBarTo,
            // which will then call the global sendTo.
            // The third parameter to navigateBarTo (bottomState) is 'targetPage' itself.
            navigateBarTo(targetPage, localStorage.getItem('top'), targetPage);
        } else {
            console.warn("Bottom bar element missing 'send' attribute:", element);
        }
    });
});

// Utility functions (can be moved to a shared utility file if used broadly)
const utilityOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
const utilityOptionsTime = { second: '2-digit', minute: '2-digit', hour: '2-digit' };

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function delayAsync(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// --- Removed IndexedDB, server fetch, and complex data generation logic ---
// All data is now managed via assets/data_manager.js and edited via edit_card.html
