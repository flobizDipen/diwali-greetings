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

    function initializeScreen2() {
        const name = getNameFromURL();
        displayName(name);
        updateGreetingBtn.textContent = "Generate yours";
        shareWhatsAppBtn.classList.add('hidden');
        
        // Adjust marquee container width to match video width
        const videoWidth = greetingVideo.offsetWidth;
        marqueeContainer.style.width = `${videoWidth}px`;

        greetingVideo.play();
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
        const shareUrl = `${window.location.origin}${window.location.pathname}?n=${encodedName}`;
        const message = encodeURIComponent(`Check out my personalized Diwali greeting: ${shareUrl}`);
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
        }
    }

    // Adjust marquee width when window is resized
    window.addEventListener('resize', () => {
        const videoWidth = greetingVideo.offsetWidth;
        marqueeContainer.style.width = `${videoWidth}px`;
    });

    initFromURL();
});