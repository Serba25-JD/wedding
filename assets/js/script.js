document.addEventListener('DOMContentLoaded', async function() {
    const header = document.createElement('header');
    const main = document.createElement('main');
    const footer = document.createElement('footer');
    document.body.append(header, main, footer);
    const usersData = await fetchData();
    const params = new URLSearchParams(window.location.search);
    const user = decodeURIComponent(params.get('user'));
    const users = usersData.find(u => u.title === user);
    if(!users) showError();
    changeTitle(users);
    showAllLayout(users);
});


async function fetchData() {
    const response = await fetch('assets/js/data.json');
    const data = await response.json();
    return data;
}

function changeTitle(users) { 
    if(users) {
        const titleTag = document.querySelector('title');
        titleTag.textContent = `Wedding of ${users.title}`;
    }
};

function showAllLayout(users) {
    if(users) {
        showHeader(users);
        showMain(users);
        showFooter(users);
    };
};

// Function Header
function formatDate(date) {
    const months = [
        "Januari","Februari","Maret","April","Mei","Juni",
        "Juli","Agustus","September","Oktober","November","Desember"
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
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };
        const timeWIB = new Intl.DateTimeFormat("id-ID", options).format(new Date());
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
        showInvite(users);
        showGallery(users);
        showClosing(users);
    };
};

function showHero(users) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.classList.add('container');
    section.setAttribute('id', 'hero');
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
    pQuote.textContent = `" ${users.text_quote} " `;
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
    const divFloralBox = document.createElement('div');
    divFloralBox.classList.add('floral-box');
    section.append(h2, p, divFloralBox);
    main.insertAdjacentElement('beforeend', section);
};

function showFooter(users) {
    const footer = document.querySelector('footer');
    footer.classList.add('footer-container');
    const pUsers = document.createElement('p');
    pUsers.textContent = `Salam yang Indah dari kami ${users.title}`;
    const pCreator = document.createElement('p');
    pCreator.textContent = 'Made with ❤️: Jeremi. (2025)';
    footer.append(pUsers, pCreator);
};

function showError() {
    const body = document.querySelector('body');
    body.setAttribute('id', 'not-found');
    const header = document.querySelector('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Ups, something wrong.';
    header.appendChild(h1);
    const main = document.querySelector('main');
    const p = document.createElement('p');
    p.textContent = 'Kemungkinan user tidak ditemukan.';
    main.appendChild(p);
    const footer = document.querySelector('footer');
    const pFooter = document.createElement('p');
    pFooter.textContent = 'Made with ❤️: Jeremi. (2025)';
    footer.appendChild(pFooter);
}