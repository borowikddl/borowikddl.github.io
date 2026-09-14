// assets/navigation.js
// Provides a global navigation function sendTo()

function sendTo(page, param) {
    console.log(`Attempting to navigate via global sendTo: ${page}, ${param || ''}`);
    let targetUrl = '';
    const currentParams = new URLSearchParams(window.location.search);
    let paramsString = currentParams.toString();

    // Preserve existing query parameters unless explicitly clearing or overriding
    // For simplicity here, we'll just append new ones or navigate without them
    // A more robust solution might merge params if 'param' is an object,
    // or handle conflicts. For now, 'param' is treated as a simple string value for 'type'.

    switch (page) {
        case 'card': // Added missing case for 'card'
            targetUrl = 'card.html'; // Relative path
            break;
        case 'home':
            targetUrl = 'home.html'; // Relative path
            break;
        case 'documents':
            targetUrl = 'documents.html'; // Relative path
            break;
        case 'services':
            targetUrl = 'services.html'; // Relative path
            break;
        case 'qr':
            targetUrl = 'qr.html'; // Relative path
            break;
        case 'more':
            targetUrl = 'more.html'; // Relative path
            break;
        case 'scan':
            targetUrl = `scan.html${param ? '?type=' + encodeURIComponent(param) : ''}`; // Relative path
            // If scan needs to preserve other params, adjust here.
            paramsString = param ? 'type=' + encodeURIComponent(param) : ''; // Example: Scan usually starts fresh
            break;
        case 'document': // Assumes specific document view
            targetUrl = 'document.html'; // Relative path
            // Example: if document needs an id: targetUrl = `document.html?id=${param}`
            break;
        case 'pesel':
            targetUrl = 'pesel.html'; // Relative path
            break;
        case 'shortcuts':
            targetUrl = 'shortcuts.html'; // Relative path
            break;
        case 'edit_card':
            targetUrl = 'edit_card.html'; // Relative path
            break;
        case 'display': // For QR code result page
            targetUrl = 'display.html'; // Assuming display.html exists, relative path
            break;
        default:
            console.warn(`sendTo: Unknown page target '${page}'`);
            return; // Do not navigate if page is unknown
    }

    // Construct final URL, generally preserving existing params unless page logic dictates otherwise
    // For many navigations, existing params might not be relevant on the new page.
    // The logic for `scan` above provides an example of specific param handling.
    // If `paramsString` should generally be preserved:
    // window.location.href = targetUrl + (paramsString ? '?' + paramsString : '');

    // For this application, most top-level navigations probably don't need to carry over
    // arbitrary params from the previous page, unless specifically handled like 'scan'.
    // Let's make it simpler and only add params if the case specifically builds them.
    if (targetUrl.includes('?')) { // If params already added by the switch case
        window.location.href = targetUrl;
    } else {
        // Add existing params from current URL if not specifically handled
        // This might or might not be desired for all cases.
        // Consider if pages like 'home.html' should inherit params from 'card.html?id=123'
        // For now, let's keep it simple and *not* carry over general params by default.
        // If a specific navigation needs params, it should build its targetUrl accordingly.
        window.location.href = targetUrl;
    }
}
