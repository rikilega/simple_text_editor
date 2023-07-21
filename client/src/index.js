import { getNotes, saveNote } from './db';

window.addEventListener('DOMContentLoaded', async () => {
    const textarea = document.getElementById('editor');
    const notes = await getNotes();
    if (notes.length > 0) {
        textarea.value = notes[0];
    }

    textarea.addEventListener('blur', () => {
        saveNote(textarea.value);
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, (err) => {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installButton = document.getElementById('install');
  installButton.style.display = 'block';

  installButton.addEventListener('click', (e) => {
    installButton.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
    });
  });
});

