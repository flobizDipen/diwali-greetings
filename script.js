document.addEventListener('DOMContentLoaded', () => {
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const startLamp = document.getElementById('startLamp');
    const nameInput = document.getElementById('nameInput');
    const updateGreetingBtn = document.getElementById('updateGreeting');
    const shareWhatsAppBtn = document.getElementById('shareWhatsApp');
    const topNameDisplay = document.getElementById('topNameDisplay');
    const marqueeText = document.getElementById('marqueeText');
    const greetingVideo = document.getElementById('greetingVideo');
    const marqueeContainer = document.getElementById('marqueeContainer');
    const greetingContainer = document.querySelector('.greeting-container');

    function getNameFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('n');
        return name ? name.replace(/_/g, ' ') : 'mySandesh';
    }

    function displayName(name) {
        topNameDisplay.textContent = name;
        const marqueeContent = `${name} की तरफ से आपको और आपके परिवार को दिवाली के पावन पर्व की हार्दिक शुभकामनाए |`;
        marqueeText.innerHTML = `<span>${marqueeContent}</span><span>${marqueeContent}</span>`;
        nameInput.value = name;
    }

    function adjustMarqueeWidth() {
        const videoRect = greetingVideo.getBoundingClientRect();
        marqueeContainer.style.width = `${videoRect.width}px`;
        marqueeContainer.style.left = `${videoRect.left}px`;
    }

    function initializeScreen2() {
        const name = getNameFromURL();
        displayName(name);
        updateGreetingBtn.textContent = "Generate yours";
        shareWhatsAppBtn.classList.add('hidden');
        
        // Remove existing play button if any
        const existingPlayButton = greetingContainer.querySelector('.play-button');
        if (existingPlayButton) {
            existingPlayButton.remove();
        }

        const playButton = document.createElement('button');
        playButton.textContent = 'Play with Sound';
        playButton.classList.add('play-button');
        playButton.addEventListener('click', () => {
            greetingVideo.muted = false;
            greetingVideo.play();
            playButton.remove();
        });
        greetingContainer.appendChild(playButton);

        greetingVideo.muted = true;
        greetingVideo.play();

        // Adjust marquee width after video metadata is loaded
        greetingVideo.addEventListener('loadedmetadata', adjustMarqueeWidth);
        // Also adjust on window resize
        window.addEventListener('resize', adjustMarqueeWidth);

        // Adjust immediately in case video is already loaded
        adjustMarqueeWidth();
    }

    startLamp.addEventListener('click', () => {
        screen1.classList.add('hidden');
        screen2.classList.remove('hidden');
        initializeScreen2();
    });

    updateGreetingBtn.addEventListener('click', () => {
        const name = nameInput.value.trim() || 'mySandesh';
        displayName(name);
        updateURLWithName(name);
        document.querySelector('.input-wrapper').classList.add('hidden');
        shareWhatsAppBtn.classList.remove('hidden');
    });

    shareWhatsAppBtn.addEventListener('click', () => {
        const name = nameInput.value.trim() || 'mySandesh';
        const encodedName = encodeURIComponent(name.replace(/ /g, '_'));
        const shareUrl = `https://flobizdipen.github.io/diwali-greetings/?n=${encodedName}`;
        const message = encodeURIComponent(`*${name}* ने आपके लिए कुछ भेजा है\nटच करके देखो\n👇 👇\n${shareUrl}`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
    });

    function updateURLWithName(name) {
        const url = new URL(window.location);
        url.searchParams.set('n', name.replace(/ /g, '_'));
        window.history.pushState({}, '', url);
    }

    function initFromURL() {
        const name = getNameFromURL();
        if (name !== 'mySandesh') {
            displayName(name);
            screen1.classList.add('hidden');
            screen2.classList.remove('hidden');
            document.querySelector('.input-wrapper').classList.add('hidden');
            shareWhatsAppBtn.classList.remove('hidden');
            initializeScreen2();
        }
    }

    initFromURL();
});