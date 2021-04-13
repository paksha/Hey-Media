setTimeout(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .catch(function() {
        window.chrome.tabs.create({
            url: 'index.html'
        });
    });
}, 1000);
