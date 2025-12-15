async function main() {
    const query = window.location.search.substring(1);
    const params = query.split('&');
    const rest = params.slice(1);
    const user = rest.slice(0,2).join(' & ');
    const usersData = await fetchData();
    const users = usersData.find(u => u.title === user);
    if(users) {
        loadFunction(users, usersData);
        window.addEventListener('scroll', runTransitions);
        setInterval(createPetal, 900);
    };
};
main();

async function fetchData() {
    const response = await fetch('template/template_2/data.json');
    const data = await response.json();
    return data;
};

function changeTitle(users) { 
    if(users) {
        const titleTag = document.querySelector('title');
        titleTag.textContent = `Wedding of ${users.title}`;
    }
};

function loadFunction(users, usersData) {
    changeTitle(users);
    const body = document.querySelector('body');
    body.setAttribute('id', 'open-container');
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Undangan Pernikahan';
    header.appendChild(h1);
    const main = document.createElement('main');
    const section = document.createElement('section');
    section.classList.add('bride-container');
    const divImageRing = document.createElement('div');
    divImageRing.classList.add('bride-content');
    const imageRing = new Image();
    imageRing.src = 'assets/image/main/ring-768x768.webp';
    imageRing.width = 768;
    imageRing.height = 768;
    imageRing.loading = 'lazy';
    divImageRing.appendChild(imageRing);
    const biography = users.biography[0];
    const types = ['boy', 'women'];
    types.forEach(type => {
        const user = biography[type][0];
        const divContent = document.createElement('div');
        divContent.classList.add('bride-content');
        const image = new Image();
        image.src = user.image;
        image.width = 720;
        image.height = 720;
        image.alt = user.title;
        image.loading = 'lazy';
        const h2 = document.createElement('h2');
        h2.textContent = user.title;
        divContent.append(image, h2);
        section.append(divImageRing, divContent);
        main.appendChild(section);
    });
    const footer = document.createElement('footer');
    footer.classList.add('open-footer');
    const p = document.createElement('p');
    p.textContent = `Dengan segala kerendahan hati, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberi
    doa restu pada acara pernikahan kami.`;
    p.style.whiteSpace = 'pre-line';
    const divOpen = document.createElement('div');
    divOpen.setAttribute('id', 'open-content-btn');
    const pOpen = document.createElement('p');
    pOpen.textContent = 'Buka Undangan';
    divOpen.appendChild(pOpen);
    footer.append(p, divOpen);
    body.append(header, main, footer);
    openButton(users, usersData);
};

function openButton(users, usersData) {
    const body = document.getElementById('open-container');
    const button = document.getElementById('open-content-btn');
    button.addEventListener('click', function() {
        body.removeAttribute('id', 'open-container');
        body.innerHTML = '';
        body.setAttribute('id', 'open-content');
        body.classList.add('active');
        createTag(users, usersData);
        audio.play();
    });
};

function createTag(users, usersData) {
    const body = document.getElementById('open-content');
    const header = document.createElement('header');
    header.setAttribute('id', 'open-content-header');
    const main = document.createElement('main');
    main.setAttribute('id','open-content-main');
    const footer = document.createElement('footer');
    body.append(header, main, footer);
    showAllLayout(users);
    showSong(usersData);
};

function showAllLayout(users) {
    showHeader(users);
    showMain(users);
    showFooter();
};

function showHeader(users) {
    const header = document.getElementById('open-content-header');
    header.classList.add('open-content-header');
    header.style.backgroundImage = `url('${users.background_image}')`;
    const h1 = document.createElement('h1');
    h1.textContent = users.title;
    header.appendChild(h1);
};

function showMain(users) {
    showHeroHeader(users);
    showHero(users);
    showMessage(users);
    showDate(users);
    showGallery(users);
    showClosing(users);
};

function showFlower(count = 10) {
    const main = document.getElementById('open-content-main');
    const section = document.createElement('section');
    section.classList.add('flower');
    for (let i = 0; i < count; i++) {
        const divFlower = document.createElement('div');
        divFlower.classList.add('flower-content');
        const imageFlower = new Image();
        imageFlower.src = 'assets/image/main/one-flower-4-612x408.webp';
        imageFlower.width = 612;
        imageFlower.height = 408;
        imageFlower.alt = 'Flower';
        imageFlower.loading = 'lazy';
        divFlower.appendChild(imageFlower);
        section.appendChild(divFlower);
    };
    main.insertAdjacentElement('beforeend', section);
};

function showHeroHeader(users) {
    showFlower(10);
    const main = document.getElementById('open-content-main');
    const section = document.createElement('section');
    section.classList.add('container');
    const divContainer = document.createElement('div');
    divContainer.classList.add('hero');
    // Left
    const divHeroLeft = document.createElement('div');
    divHeroLeft.classList.add('hero-content', 'fade-down');
    const pHeroLeft = document.createElement('p');
    pHeroLeft.textContent = users.text_hero;
    divHeroLeft.appendChild(pHeroLeft);
    // Right
    const divHeroRight = document.createElement('div');
    divHeroRight.classList.add('hero-content', 'fade-in');
    const imageHeroRight = new Image();
    imageHeroRight.src = users.image_header;
    imageHeroRight.width = 1024;
    imageHeroRight.height = 1024;
    imageHeroRight.alt = users.title;
    imageHeroRight.loading = 'lazy';
    divHeroRight.appendChild(imageHeroRight);
    // Append Left and Right
    divContainer.append(divHeroLeft, divHeroRight);
    section.appendChild(divContainer);
    main.insertAdjacentElement('beforeend', section);
};

function showHero(users) {
    showFlower(10);
    const main = document.getElementById('open-content-main');
    const section = document.createElement('section');
    section.classList.add('container');
    const divContainer = document.createElement('div');
    divContainer.classList.add('hero');
    // Left
    const divHeroLeft = document.createElement('div');
    divHeroLeft.classList.add('hero-content', 'fade-in');
    const imageHeroLeft = new Image();
    imageHeroLeft.src = users.image_hero;
    imageHeroLeft.width = 1024;
    imageHeroLeft.height = 1536;
    imageHeroLeft.alt = users.title;
    imageHeroLeft.loading = 'lazy';
    divHeroLeft.appendChild(imageHeroLeft);
    // Right
    const divHeroRight = document.createElement('div');
    divHeroRight.classList.add('hero-content', 'fade-down');
    const pHeroRight = document.createElement('p');
    pHeroRight.textContent = users.text_quote;
    divHeroRight.appendChild(pHeroRight);
    // Append Left and Right
    divContainer.append(divHeroLeft, divHeroRight);
    section.appendChild(divContainer);
    main.insertAdjacentElement('beforeend', section);
};

function showMessage(users) {
    showFlower(10);
    const main = document.getElementById('open-content-main');
    const section = document.createElement('section');
    section.classList.add('container');
    const divText = document.createElement('div');
    divText.classList.add('bride-header', 'fade-down');
    const h2 = document.createElement('h2');
    h2.textContent = users.text_message[0].title;
    divText.appendChild(h2);
    users.text_message[1].text.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        divText.appendChild(p);
    });
    const divContainer = document.createElement('div');
    divContainer.classList.add('bride-container');
    const biography = users.biography[0];
    if(biography.boy[0]) {
        const divContent = document.createElement('div');
        divContent.classList.add('bride-content', 'fade-in');
        const image = new Image();
        image.src = biography.boy[0].image;
        image.width = 720;
        image.height = 720;
        image.alt = biography.boy[0].title
        image.loading = 'lazy';
        const h3 = document.createElement('h3');
        h3.textContent = biography.boy[0].title;
        const p = document.createElement('p');
        p.textContent = biography.boy[0].text;
        divContent.append(image, h3, p);
        divContainer.appendChild(divContent);
    };
    if(biography.women[0]) {
        const divContent = document.createElement('div');
        divContent.classList.add('bride-content', 'fade-down');
        const image = new Image();
        image.src = biography.women[0].image;
        image.width = 720;
        image.height = 720;
        image.alt = biography.women[0].title;
        image.loading = 'lazy';
        const h3 = document.createElement('h3');
        h3.textContent = biography.women[0].title;
        const p = document.createElement('p');
        p.textContent = biography.women[0].text;
        divContent.append(image, h3, p);
        divContainer.appendChild(divContent);
    };
    section.append(divText, divContainer);
    main.insertAdjacentElement('beforeend', section);
};

function showDate(users) {
    showFlower(10);
    const main = document.getElementById('open-content-main');
    const section = document.createElement('section');
    section.classList.add('container');
    const divContainer = document.createElement('div');
    divContainer.classList.add('date', 'fade-down');
    const h2 = document.createElement('h2');
    h2.textContent = 'Hari Spesial';
    const pDate = document.createElement('p');
    pDate.textContent = `${users.date} | ${users.time}`;
    const pLocationMap = document.createElement('p');
    pLocationMap.textContent = `Lokasi: ${users.location_map}`;
    const pLocationName = document.createElement('p');
    pLocationName.textContent = `Alamat Lengkap: ${users.location_name}`;
    const button = document.createElement('button');
    button.setAttribute('id', 'location');
    button.textContent = 'Lihat Rute';
    divContainer.append(h2, pDate, pLocationMap, pLocationName, button);
    section.appendChild(divContainer);
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
    showFlower(10);
    const main = document.getElementById('open-content-main');
    const section = document.createElement('section');
    section.classList.add('container');
    const h2 = document.createElement('h2');
    h2.textContent = 'Our Galerry';
    const divContainer = document.createElement('div');
    divContainer.classList.add('gallery');
    users.gallery.forEach(item => {
        if(item.wedding) {
            const divContent = document.createElement('div');
            divContent.classList.add('gallery-content', 'fade-down');
            item.wedding.forEach(img => {
                const figure = document.createElement('figure');
                const image = new Image();
                image.src = img.src;
                image.width = 1024;
                image.height = 1024;
                image.alt = users.title;
                image.loading = 'lazy';
                const figcaption = document.createElement('figcaption');
                figcaption.textContent = 'Pernikahan';
                figure.append(image, figcaption);
                divContent.append(figure);
                divContainer.append(divContent);
            });
        };
        if(item.fiance) {
            const divContent = document.createElement('div');
            divContent.classList.add('gallery-content', 'fade-in');
            item.fiance.forEach(img => {
                const figure = document.createElement('figure');
                const image = new Image();
                image.src = img.src;
                image.width = 1024;
                image.height = 1024;
                image.alt = users.title;
                image.loading = 'lazy';
                const figcaption = document.createElement('figcaption');
                figcaption.textContent = 'Tunangan';
                figure.append(image, figcaption);
                divContent.append(figure);
                divContainer.append(divContent);
            });
        };
    });
    section.append(h2, divContainer);
    main.insertAdjacentElement('beforeend', section);
};

function showClosing(users) {
    showFlower(10);
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.classList.add('container');
    const h2 = document.createElement('h2');
    h2.textContent = 'Penutup';
    const divText = document.createElement('div');
    divText.classList.add('text-container', 'fade-in');
    const pText = document.createElement('p');
    pText.textContent = users.text_closing;
    const pMessage = document.createElement('p');
    pMessage.setAttribute('id', 'message-bride');
    pMessage.textContent = `Salam dari kami: ${users.title}.`;
    const pMessageGift = document.createElement('p');
    pMessageGift.textContent = 'Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.'
    divText.append(pText, pMessage, pMessageGift);
    const divGiftContainer = document.createElement('div');
    divGiftContainer.classList.add('gift-container');
    users.bank.forEach(item => {
        if(item.BCA) {
            item.BCA.forEach(data => {
                const divGiftContent = document.createElement('div');
                divGiftContent.classList.add('gift-content', 'fade-down');
                divGiftContent.setAttribute('id', 'gift-content');
                const image = new Image();
                image.src = data.src;
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
    section.append(h2, divText, divGiftContainer);
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
    footer.classList.add('footer-promo');
    const divContainer = document.createElement('div');
    divContainer.classList.add('footer-container', 'fade-in');
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
    imgInstagram.src = 'assets/image/main/instagram.svg';
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

function runTransitions() {
    const elements = document.querySelectorAll('.fade-in, .fade-down');
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


function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * window.innerWidth + 'px';
    petal.style.width = petal.style.height =
      Math.random() * 6 + 8 + 'px';
    const duration = Math.random() * 10 + 12;
    petal.style.animationDuration = `
      ${duration}s,
      ${duration / 2}s,
      ${duration}s
    `;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000);
}

