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
        window.addEventListener('scroll', runTransitions);
    };
});

async function fetchData() {
    const response = await fetch('assets/js/data.json');
    const data = await response.json();
    return data;
}

function loadFunction(users, to, usersData) {
    changeTitle(users);
    const body = document.querySelector('body');
    body.setAttribute('id', 'body-message-container');
    body.style.setProperty('--bg-image', `url('${encodeURI(users.background_image)}')`);
    // body.style.backgroundImage = `url(${users.background_image})`;
    // Container
    const divContainer = document.createElement('div');
    divContainer.classList.add('message-container');
    // Container Content
    const divContainerContent = document.createElement('div');
    divContainerContent.classList.add('message-container-content');
    // Container Card
    const divCard = document.createElement('div');
    divCard.classList.add('message-content-card');
    const h1 = document.createElement('h1');
    h1.textContent = 'Undangan';
    const h2 = document.createElement('h2');
    h2.textContent = 'Kepada Yth.';
    const p = document.createElement('p');
    p.textContent = to;
    divCard.append(h1, h2, p);
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
    divContainerContent.append(divCard, divContent, divDivider);
    divContainer.appendChild(divContainerContent);
    document.body.appendChild(divContainer);
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
    const body = document.getElementById('body-message-container');
    body.removeAttribute('id', 'body-message-container');
    body.removeAttribute("style");
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
    divTitle.classList.add('slide-right');
    divTitle.setAttribute('id', 'header-content-left');
    const h1 = document.createElement('h1');
    h1.textContent = 'Wedding of';
    const h2 = document.createElement('h2');
    h2.textContent = users.title;
    // FloralBox
    const divFloralBox = document.createElement('div');
    divFloralBox.classList.add('floral-box');
    divTitle.append(h1, h2, divFloralBox);
    // Image
    const divImage = document.createElement('div');
    divImage.classList.add('slide-left');
    divImage.setAttribute('id', 'header-content-right');
    const image = new Image();
    image.src = users.image_header;
    image.width = 1024;
    image.height = 1024;
    image.loading = 'lazy';
    image.alt = users.title;
    // Append
    divImage.appendChild(image);
    divContent.append(divTitle, divImage);
    const divDivider = document.createElement('div');
    divDivider.classList.add('divider');
    header.append(divDate, divContent, divDivider);
    startClock();
    runHeaderAnimation();
};

function runHeaderAnimation() {
    const headerLeft = document.getElementById('header-content-left');
    const headerRight = document.getElementById('header-content-right');
    setTimeout(() => {
        headerLeft.classList.add('active');
        headerRight.classList.add('active');
    }, 200);
};
// Header END

// Function Main
function showMain(users) {
    if(users) {
        showHero(users);
        showMessage(users);
        showBride(users);
        showDate(users);
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
    h2.classList.add('slide-right');
    h2.textContent = 'Kisah Cinta yang Indah';
    const divRight = document.createElement('div');
    divRight.classList.add('hero-content-right', 'slide-up');
    const image = new Image();
    image.src = users.image_hero;
    image.width = 1024;
    image.height = 1536;
    image.loading = 'lazy';
    image.alt = users.title;
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

function showMessage(users) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.classList.add('container', 'fade-in');
    const h2 = document.createElement('h2');
    h2.textContent = users.text_message[0].title;
    section.appendChild(h2);
    users.text_message[1].text.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        section.appendChild(p);
    });
    const divDivider = document.createElement('div');
    divDivider.classList.add('divider');
    section.appendChild(divDivider);
    main.insertAdjacentElement('beforeend', section);
};

function showBride(users) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.classList.add('container');
    const divContainer = document.createElement('div');
    divContainer.classList.add('bride-container');
    const h2 = document.createElement('h2');
    h2.textContent = 'Mempelai Pria & Wanita';
    const divFloralBox = document.createElement('div');
    divFloralBox.classList.add('floral-box');
    users.biography.forEach(item => {
        item.boy.forEach(boy => {
            const divContentBoy = document.createElement('div');
            divContentBoy.classList.add('bride-content', 'slide-right');
            const h3Boy = document.createElement('h3');
            h3Boy.textContent = boy.title;
            const divImageBoy = document.createElement('div');
            divImageBoy.classList.add('bride-content-image');
            const imageBoy = new Image();
            imageBoy.src = boy.image;
            imageBoy.width = 720;
            imageBoy.height = 720;
            imageBoy.loading = 'lazy';
            imageBoy.alt = boy.title;
            divImageBoy.appendChild(imageBoy);
            const pBoy = document.createElement('p');
            pBoy.textContent = boy.text;
            const divDivider = document.createElement('div');
            divDivider.classList.add('divider');
            divContentBoy.append(divImageBoy, h3Boy, pBoy, divDivider);
            divContainer.appendChild(divContentBoy);
        });
        item.women.forEach(women => {
            const divContentWomen = document.createElement('div');
            divContentWomen.classList.add('bride-content', 'slide-left');
            const h3Women = document.createElement('h3');
            h3Women.textContent = women.title;
            const divImageWomen = document.createElement('div');
            divImageWomen.classList.add('bride-content-image');
            const imageWomen = new Image();
            imageWomen.src = women.image;
            imageWomen.width = 720;
            imageWomen.height = 720;
            imageWomen.loading = 'lazy';
            imageWomen.alt = women.title;
            divImageWomen.appendChild(imageWomen);
            const pWomen = document.createElement('p');
            pWomen.textContent = women.text;
            const divDivider = document.createElement('div');
            divDivider.classList.add('divider');
            divContentWomen.append(divImageWomen, h3Women, pWomen, divDivider);
            divContainer.appendChild(divContentWomen);
        });
    });
    section.append(h2, divFloralBox, divContainer);
    main.insertAdjacentElement('beforeend', section);
};

function showDate(users) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.setAttribute('id', 'date');
    section.classList.add('container', 'fade-in');
    const h2 = document.createElement('h2');
    h2.textContent = 'Pernikahan yang Indah';
    const pDate = document.createElement('p');
    pDate.textContent = `${users.date} | Pukul ${users.time}`;
    const pLocationName = document.createElement('p');
    pLocationName.textContent = users.location_map;
    const pLocationNameMap = document.createElement('p');
    pLocationNameMap.textContent = users.location_name;
    const button = document.createElement('button');
    button.setAttribute('id', 'location');
    button.textContent = 'Lihat Rute';
    const divDivider = document.createElement('div');
    divDivider.classList.add('divider');
    section.append(h2, pDate, pLocationName, pLocationNameMap, button, divDivider);
    main.insertAdjacentElement('beforeend', section);
    showRute(users);
};

function showRute(users) {
    const button = document.getElementById('location');
    button.addEventListener('click', function() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const destination = users.location_coordinate;
                const url = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${destination}`;
                window.open(url, "_blank");
            }, function(error) {
                alert("Tidak bisa mendapatkan lokasi Anda. Pastikan GPS/Location diaktifkan.");
            });
        } else {
            alert("Browser Anda tidak mendukung Geolocation.");
        };
    });
};

function showGallery(users) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.classList.add('container', 'fade-down');
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
                divImageWedding.classList.add('gallery-content', 'blur-in');
                const image = new Image();
                image.src = img.src;
                image.width = 1024;
                image.height = 1024;
                image.loading = 'lazy';
                image.alt = users.title;
                divImageWedding.appendChild(image);
                divContainerImage.appendChild(divImageWedding);
            });
        };
        if(item.fiance) {
            item.fiance.forEach(img => {
                const divImageWedding = document.createElement('div');
                divImageWedding.classList.add('gallery-content', 'blur-in');
                const image = new Image();
                image.src = img.src;
                image.width = 1024;
                image.height = 1024;
                image.loading = 'lazy';
                image.alt = users.title;
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
    section.classList.add('container', 'fade-in');
    const h2 = document.createElement('h2');
    h2.textContent = 'Penutup yang Indah';
    const divText = document.createElement('div');
    divText.classList.add('text-container');
    const pText = document.createElement('p');
    pText.textContent = users.text_closing;
    const pMessage = document.createElement('p');
    pMessage.setAttribute('id', 'message-bride');
    pMessage.textContent = `Salam yang indah dari kami: ${users.title}.`;
    const pMessageGift = document.createElement('p');
    pMessageGift.textContent = 'Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.'
    divText.append(pText, pMessage, pMessageGift);
    const divGiftContainer = document.createElement('div');
    divGiftContainer.classList.add('gift-container');
    users.bank.forEach(item => {
        if(item.BCA) {
            item.BCA.forEach(data => {
                const divGiftContent = document.createElement('div');
                divGiftContent.classList.add('gift-content');
                divGiftContent.setAttribute('id', 'gift-content');
                const image = new Image();
                image.src = 'assets/image/BCA.png'
                image.width = 300;
                image.height = 150;
                image.alt = 'BCA';
                image.loading = 'lazy';
                const pNo = document.createElement('p');
                pNo.textContent = data.number;
                pNo.setAttribute('id', 'bank-number');
                const pName = document.createElement('p');
                pName.textContent = data.name;
                divGiftContent.append(image, pNo, pName);
                divGiftContainer.appendChild(divGiftContent);
            });
        };
    });
    const divFloralBox = document.createElement('div');
    divFloralBox.classList.add('floral-box');
    section.append(h2, divText, divGiftContainer, divFloralBox);
    main.insertAdjacentElement('beforeend', section);
    document.getElementById('gift-content').addEventListener('click', function() {
        const number = document.getElementById('bank-number').textContent;
        navigator.clipboard.writeText(number)
        .then(() => {
            alert('Nomor disalin!');
        })
        .catch(() => {
            alert('Gagal menyalin.');
        });
    });
};

function showSong(usersData) {
    const songObj = usersData.find(u => u.song);
    const songs = songObj.song;
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
        const current = Math.floor(Math.random() * songs.length);
        source.src = songs[current];
        audio.load();
        const musicTitle = document.getElementById('music-title');
        let filename = songs[current].split('/').pop();
        filename = filename.replace(/\.[^/.]+$/, '');
        musicTitle.textContent = filename;
    }
    audio.addEventListener('ended', () => {
        current++;
        if (current >= songs.length) current = 0;
        playSong();
        audio.play();
    });
    playSong();
};

function showFooter() {
    const footer = document.querySelector('footer');
    footer.classList.add('footer-promo', 'fade-in');
    const divContainer = document.createElement('div');
    divContainer.classList.add('footer-container');
    // Content
    const divContent = document.createElement('div');
    divContent.classList.add('footer-content', 'content', 'slide-right');
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
    divSocial.classList.add('footer-social', 'content', 'slide-left');
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
    divMusic.classList.add('footer-music', 'content', 'slide-up');
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

function runTransitions() {
    // semua elemen yang memiliki class slide-*
    const elements = document.querySelectorAll('.slide-left, .slide-right, .slide-up, .slide-down, .fade-in, .fade-down, .blur-in');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // kalau masuk viewport → tambah class active
        if(rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('active');
        } 
        // kalau keluar viewport → remove class active
        else {
            el.classList.remove('active');
        };
    });
};
