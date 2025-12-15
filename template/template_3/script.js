async function main() {
    const query = window.location.search.substring(1);
    const params = query.split('&');
    const rest = params.slice(1);
    const user = rest.slice(0,2).join(' & ');
    const usersData = await fetchData();
    const users = usersData.find(u => u.title === user);
    if(users) {
        loadFunction(users, usersData);
        // window.addEventListener('scroll', runTransitions);
    };
};
main();

async function fetchData() {
    const response = await fetch('template/template_3/data.json');
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
    // Header
    const header = document.createElement('header');
    header.classList.add('open-header-container');
    const h1 = document.createElement('h1');
    h1.textContent = 'Your Are Invite To';
    header.appendChild(h1);
    // Header END
    // Main
    const main = document.createElement('main');
    main.classList.add('open-main-container');
    const section = document.createElement('section');
    section.classList.add('open-section-container');
    const figure = document.createElement('figure');
    const image = new Image();
    image.src = users.background_image;
    image.width = 1024;
    image.height = 1536;
    image.alt = users.title;
    image.loading = 'lazy';
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = users.title;
    figure.append(image, figcaption);
    section.appendChild(figure);
    main.appendChild(section);
    // Main END
    // Footer
    const footer = document.createElement('footer');
    footer.classList.add('open-footer-container');
    const button = document.createElement('button');
    button.type = 'submit';
    button.setAttribute('id', 'open-container-btn');
    button.textContent = 'Buka Undangan';
    footer.appendChild(button);
    // Footer END
    body.append(header, main, footer);
    document.getElementById('open-container-btn').addEventListener('click', function() {
        showAllLayout(users);
    });
};

function showAllLayout(users) {
    const body = document.querySelector('body');
    body.setAttribute('id', 'open-content');
    body.classList.add('active');
    body.innerHTML = '';
}