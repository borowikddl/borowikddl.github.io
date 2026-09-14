window.onload = () => {
    if ('serviceWorker' in navigator) {
        // Adjust path for subdirectory deployment, e.g., /app/sw.js
        // Assuming 'app' is the repository name or base path on GitHub Pages.
        navigator.serviceWorker.register('/hujowatel/sw.js', { scope: '/hujowatel/' })
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }
};
