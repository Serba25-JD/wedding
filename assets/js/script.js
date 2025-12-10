document.addEventListener('DOMContentLoaded', async function() {
    const usersData = await fetchData();
    const params = new URLSearchParams(window.location.search);
    const user = decodeURIComponent(params.get('user'));
    const to = decodeURIComponent(params.get('to'));
    const users = usersData.find(u => u.title === user);
    if(!users) {
        showError(user);
        return;
    } else {
        // loadFunctionLayout(users);
        loadFunction(users, to, usersData);
    };
});

async function fetchData() {
    const response = await fetch('assets/js/data.json');
    const data = await response.json();
    return data;
}

function loadFunction(users, to, usersData) {
    changeTitle(users);
    // Container
    const divContainer = document.createElement('div');
    divContainer.classList.add('message-container');
    // Container Content
    const divCard = document.createElement('div');
    divCard.classList.add('message-content-card');
    const h1 = document.createElement('h1');
    h1.textContent = 'Kepada Yth.';
    const p = document.createElement('p');
    p.textContent = to;
    divCard.append(h1, p);
    // Content Amplop
    const divContent = document.createElement('div');
    divContent.classList.add('message-content');
    // Content Amplop Atas
    const divClose = document.createElement('div');
    divClose.classList.add('message-content-close');
    // Content Amplop Bunga
    const divFloralBox = document.createElement('div');
    divFloralBox.classList.add('floral-box');   
    divContent.append(divClose, divFloralBox);
    // Container Divider
    const divDivider = document.createElement('div');
    divDivider.classList.add('divider');
    divContainer.append(divCard, divContent, divDivider);
    document.body.append(divContainer);
    const content = document.querySelector('.message-content');
    content.addEventListener('click', function() {
        setTimeout(() => {
            const floralBox = document.querySelector('.floral-box');
            if(floralBox) floralBox.remove();
            content.classList.add('open');
            setTimeout(() => {
                const container = document.querySelector('.message-container');
                container.classList.add('show');
                setTimeout(() => {
                    loadFunctionLayout(users, usersData);
                    audio.play();
                    if(container) container.remove();
                }, 410);
            }, 400);
        }, 200);
    });
};

function changeTitle(users) { 
    if(users) {
        const titleTag = document.querySelector('title');
        titleTag.textContent = `Wedding of ${users.title}`;
    }
};

function loadFunctionLayout(users, usersData) {
    const header = document.createElement('header');
    const main = document.createElement('main');
    const footer = document.createElement('footer');
    document.body.append(header, main, footer);
    showAllLayout(users);
    showSong(usersData);
};

function showAllLayout(users) {
    if(users) {
        showHeader(users);
        showMain(users);
        showFooter();
    };
};

// Function Header
function formatDate(date) {
    const months = [
        'Januari','Februari','Maret','April','Mei','Juni',
        'Juli','Agustus','September','Oktober','November','Desember'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

function startClock() {
    const pLeft = document.getElementById('wib-clock');
    function updateTime() {
        const options = {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        const timeWIB = new Intl.DateTimeFormat('id-ID', options).format(new Date());
        pLeft.textContent = `Waktu: ${timeWIB}`;
    }
    updateTime();
    setInterval(updateTime, 1000);
};

function showHeader(users) {
    // Header
    const header = document.querySelector('header');
    header.classList.add('header-container');
    // Date
    const divDate = document.createElement('div');
    divDate.classList.add('header-content-date');
    const pDate = document.createElement('p');
    pDate.textContent = `${formatDate(new Date())}`;
    const pClock = document.createElement('p');
    pClock.setAttribute('id', 'wib-clock');
    divDate.append(pDate, pClock);
    // Flower
    const divContent = document.createElement('div');
    const divFlowerContainer = document.createElement('div');
    divFlowerContainer.classList.add('flower-container');
    // Content
    divContent.classList.add('header-content');
    const divTitle = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.textContent = 'Wedding of';
    const h2 = document.createElement('h2');
    h2.textContent = users.title;
    const p = document.createElement('p');
    p.textContent = users.date;
    // FloralBox
    const divFloralBox = document.createElement('div');
    divFloralBox.classList.add('floral-box');
    divTitle.append(h1, h2, p, divFloralBox);
    // Image
    const divImage = document.createElement('div');
    const image = new Image();
    image.src = users.image;
    image.width = 768;
    image.height = 768;
    image.loading = 'lazy';
    // Append
    divImage.appendChild(image);
    divContent.append(divTitle, divImage);
    const divDivider = document.createElement('div');
    divDivider.classList.add('divider');
    header.append(divDate, divContent, divDivider);
    startClock();
};
// Header END

// Function Main
function showMain(users) {
    if(users) {
        showHero(users);
        showDate(users);
        showCalender(users);
        showInvite(users);
        showGallery(users);
        showClosing(users);
    };
};

function showHero(users) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.classList.add('container');
    const div = document.createElement('div');
    div.classList.add('hero');
    const h2 = document.createElement('h2');
    h2.textContent = 'Kisah Cinta yang Indah';
    const divRight = document.createElement('div');
    divRight.classList.add('hero-content-right');
    const image = new Image();
    image.src = users.image;
    image.width = 760;
    image.height = 760;
    image.loading = 'lazy';
    const p = document.createElement('p');
    p.textContent = users.text_hero;
    divRight.append(image, p);
    const divFloralBox = document.createElement('div');
    divFloralBox.classList.add('floral-box');
    div.append(h2, divRight, divFloralBox);
    const divDivider = document.createElement('div');
    divDivider.classList.add('divider');
    section.append(div, divDivider);
    main.insertAdjacentElement('beforeend', section);
};

function showDate(users) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.setAttribute('id', 'date');
    section.classList.add('container');
    const h2 = document.createElement('h2');
    h2.textContent = 'Pernikahan yang Indah';
    const pDate = document.createElement('p');
    pDate.textContent = `${users.date} | Pukul ${users.time}`;
    const pLocationName = document.createElement('p');
    pLocationName.textContent = users.location_name;
    const pLocationNameMap = document.createElement('p');
    pLocationNameMap.textContent = users.location_map;
    const divDivider = document.createElement('div');
    divDivider.classList.add('divider');
    section.append(h2, pDate, pLocationName, pLocationNameMap, divDivider);
    main.insertAdjacentElement('beforeend', section);
};

function showCalender(users) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.classList.add('container');
    const h2 = document.createElement('h2');
    h2.textContent = 'Kalender yang Indah';
    const divCalender = document.createElement('div');
    divCalender.setAttribute('id', 'calendar');
    const divDivider = document.createElement('div');
    divDivider.classList.add('divider');
    section.append(h2, divCalender, divDivider);
    main.insertAdjacentElement('beforeend', section);
    generateCalendar(users);
};

function parseIndoDate(str) {
    const months = {
        Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
        Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11
    };
    const [day, monthName, year] = str.split(' ');
    return new Date(year, months[monthName], day);
};

function generateCalendar(users) {
    const calendar = document.getElementById('calendar');
    const today = new Date();
    // Tanggal Wedding (YYYY, MM-1, DD)
    const weddingDate = parseIndoDate(users.date);
    // Bulan yang ingin dibuat (bulan sekarang)
    const year = today.getFullYear();
    const month = today.getMonth();
    // Awal dan akhir bulan
    const firstDay = new Date(year, month, 1).getDay(); 
    const lastDate = new Date(year, month + 1, 0).getDate();
    // Nama hari
    const daysOfWeek = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const headerRow = document.createElement('div');
    headerRow.classList.add('calendar-header');
    daysOfWeek.forEach(dayName => {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day-name');
        dayDiv.textContent = dayName;
        headerRow.append(dayDiv);
    });
    // Grid Kalender
    const grid = document.createElement('div');
    grid.classList.add('calendar-grid');
    // Tambah blank cell sebelum tanggal 1
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        grid.append(empty);
    };
    // Render tanggal
    for (let i = 1; i <= lastDate; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.textContent = i;
        const thisDate = new Date(year, month, i);
        // --- Weekend ---
        if (thisDate.getDay() === 0) {
            day.classList.add('weekend');
        };
        // --- Hari lewat sebelum wedding ---
        if (thisDate < today && thisDate < weddingDate) {
            day.classList.add('past');
        };
        // --- Hari ini ---
        if (thisDate.toDateString() === today.toDateString()) {
            day.classList.add('today');
        };
        // --- Hari wedding ---
        if (thisDate.getDate() === weddingDate.getDate() &&
            thisDate.getMonth() === weddingDate.getMonth() &&
            thisDate.getFullYear() === weddingDate.getFullYear()
        ) {
            if (thisDate.toDateString() === today.toDateString()) {
                day.classList.add('wedding-today');
            } else if (today < weddingDate) {
                day.classList.add('wedding');
            } else {
                day.classList.add('wedding-passed');
            };
        };
        // Progres menuju wedding (hanya tanggal di antara today & wedding)
        if (thisDate > today && thisDate < weddingDate) {
            const diff = Math.floor((weddingDate - thisDate) / (1000 * 60 * 60 * 24));
            if (diff <= 3) day.classList.add('progress-1');
            else if (diff <= 7) day.classList.add('progress-2');
            else day.classList.add('progress-3');
        };
        // --- Tanggal setelah wedding (bukan wedding day) ---
        if (thisDate > weddingDate) {
            day.classList.add('after-wedding');
        };
        grid.append(day);
    };
    calendar.innerHTML = '';
    const divFloralBox = document.createElement('div');
    divFloralBox.classList.add('floral-box');
    calendar.append(divFloralBox, headerRow, grid);
};

function showInvite(users) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.classList.add('container');
    const h2 = document.createElement('h2');
    h2.textContent = 'Undangan yang Indah';
    const pInvite = document.createElement('p');
    pInvite.textContent = users.text_invite;
    const iframe = document.createElement('iframe');
    iframe.src = users.maps;
    iframe.style.border = 0;
    iframe.width = 600;
    iframe.height = 450;
    iframe.loading = 'lazy';
    const pQuote = document.createElement('p');
    pQuote.textContent = `' ${users.text_quote} ' `;
    const divDivider = document.createElement('div');
    divDivider.classList.add('divider');
    section.append(h2, pInvite, iframe, pQuote, divDivider);
    main.insertAdjacentElement('beforeend', section);
};

function showGallery(users) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.classList.add('container');
    const h2 = document.createElement('h2');
    h2.textContent = 'Galeri yang Indah';
    const pGallery = document.createElement('p');
    pGallery.textContent = users.text_gallery;
    const divContainerImage = document.createElement('div');
    divContainerImage.classList.add('gallery-container');
    users.gallery.forEach(item => {
        if(item.wedding) {
            item.wedding.forEach(img => {
                const divImageWedding = document.createElement('div');
                divImageWedding.classList.add('gallery-content');
                const image = new Image();
                image.src = img.src;
                image.width = 768;
                image.height = 768;
                image.loading = 'lazy';
                divImageWedding.appendChild(image);
                divContainerImage.appendChild(divImageWedding);
            });
        };
        if(item.fiance) {
            item.fiance.forEach(img => {
                const divImageWedding = document.createElement('div');
                divImageWedding.classList.add('gallery-content');
                const image = new Image();
                image.src = img.src;
                image.width = 768;
                image.height = 768;
                image.loading = 'lazy';
                divImageWedding.appendChild(image);
                divContainerImage.appendChild(divImageWedding);
            });
        };
    });
    const divDivider = document.createElement('div');
    divDivider.classList.add('divider');
    section.append(h2, pGallery, divContainerImage, divDivider);
    main.insertAdjacentElement('beforeend', section);
};

function showClosing(users) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.classList.add('container');
    const h2 = document.createElement('h2');
    h2.textContent = 'Penutup yang Indah';
    const p = document.createElement('p');
    p.textContent = users.text_closing;
    const pMessage = document.createElement('p');
    pMessage.textContent = `Salam yang indah dari kami: ${users.title}.`;
    const divFloralBox = document.createElement('div');
    divFloralBox.classList.add('floral-box');
    section.append(h2, p, divFloralBox);
    main.insertAdjacentElement('beforeend', section);
};

function showFooter() {
    const footer = document.querySelector('footer');
    footer.classList.add('footer-promo');
    const divContainer = document.createElement('div');
    divContainer.classList.add('footer-container');
    // Content
    const divContent = document.createElement('div');
    divContent.classList.add('footer-content', 'content');
    const h2 = document.createElement('h2');
    h2.textContent = 'Buat Undangan Pernikahan Online Kamu!';
    const pH2 = document.createElement('p');
    pH2.textContent = 'Buat momen spesialmu lebih berkesan dengan undangan online yang elegan, interaktif, dan mudah dibagikan.';
    const aH2 = document.createElement('a');
    aH2.href = 'https://wa.me/625156246765';
    aH2.classList.add('btn-contact');
    aH2.textContent = 'Hubungi Kami Sekarang.';
    divContent.append(h2, pH2, aH2);
    // Social
    const divSocial = document.createElement('div');
    divSocial.classList.add('footer-social', 'content');
    const pSocial = document.createElement('p');
    pSocial.textContent = 'Ikuti kami di:';
    const aInstagram = document.createElement('a');
    aInstagram.href = 'https://www.instagram.com/je.onlyone_';
    const imgInstagram = new Image();
    imgInstagram.src = 'assets/css/instagram.svg';
    imgInstagram.alt = 'Instagram';
    imgInstagram.loading = 'lazy';
    aInstagram.appendChild(imgInstagram);
    divSocial.append(pSocial, aInstagram);
    // Music
    const divMusic = document.createElement('div');
    divMusic.classList.add('footer-music', 'content');
    const divMusicIcon = document.createElement('div');
    divMusicIcon.setAttribute('id', 'music-icon');
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');
    const pMusicIcon = document.createElement('p');
    pMusicIcon.textContent = '🎵';
    divMusicIcon.append(divSpinner, pMusicIcon);
    const divMusicTitle = document.createElement('div');
    const pMusicTitle = document.createElement('p');
    pMusicTitle.textContent = 'Sedang memutar lagu:';
    const pMusicSong = document.createElement('p');
    pMusicSong.setAttribute('id', 'music-title');
    divMusicTitle.append(pMusicTitle, pMusicSong);
    divMusic.append(divMusicIcon, divMusicTitle);
    // Creator
    const pCreator = document.createElement('p');
    pCreator.textContent = 'Made with ❤️: Jeremi. (2025)';
    divContainer.append(divContent, divSocial, divMusic, pCreator);
    footer.appendChild(divContainer);
};

function showError(users) {
    const body = document.querySelector('body');
    body.setAttribute('id', 'not-found');
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Ups, ada kesalahan nih...';
    header.appendChild(h1);
    const main = document.createElement('main');
    const section = document.createElement('section');
    const p = document.createElement('p');
    p.textContent = `${users} tidak ditemukan.`;
    section.appendChild(p);
    main.appendChild(section);
    const footer = document.createElement('footer');
    const pFooter = document.createElement('p');
    pFooter.textContent = 'Made with ❤️: Jeremi. (2025)';
    footer.appendChild(pFooter);
    body.append(header, main, footer);
};

function showSong(usersData) {
    const songObj = usersData.find(u => u.song);
    const audio = document.createElement('audio');
    audio.setAttribute('id', 'audio');
    const source = document.createElement('source');
    source.setAttribute('id', 'audio-src');
    source.src = '';
    source.type = 'audio/mp3';
    audio.appendChild(source);
    document.body.appendChild(audio);
    let current = 0;
    function playSong() {
        source.src = songObj.song[current];
        audio.load();
        const musicTitle = document.getElementById('music-title');
        let filename = songObj.song[current].split('/').pop();
        filename = filename.replace(/\.[^/.]+$/, "");
        musicTitle.textContent = filename;
    }
    audio.addEventListener('ended', () => {
        current++;
        if (current >= songObj.song.length) current = 0;
        playSong();
        audio.play();
    });
    playSong();
};