document.addEventListener('DOMContentLoaded', function() {
    const url = new URLSearchParams(window.location.search);
    const template =  url.get('t');
    fetch('assets/js/user.json')
    .then(response => response.json())
    .then(data => {
        const query = window.location.search.substring(1);
        const params = query.split('&');
        const tParam = params[0];
        const template = Number(tParam.split('=')[1]);
        const rest = params.slice(1);
        const user = rest.slice(0,2).join(' & ');
        const found = data.find(item => item.user === user && item.template === template);
        if(found) {
            const body = document.querySelector('body');
            body.innerHTML = '';
            const styleTag = document.querySelector('link[rel="stylesheet"]');
            styleTag.href = `template/template_${template}/styles.css`;
            const script = document.createElement('script');
            script.src = `template/template_${template}/script.js`;
            script.defer = true;
            body.appendChild(script);
        } else {
            showLayout();
        };
    });
    function showLayout() {
        fetch('assets/js/template.json')
        .then(response => response.json())
        .then(data => {
            const main = document.querySelector('main');
            const section = document.createElement('section');
            data.forEach((item, no) => {
                const divContainer = document.createElement('div');
                divContainer.classList.add('container');
                const divImage = document.createElement('div');
                divImage.classList.add('image');
                const divPreview = document.createElement('div');
                divPreview.classList.add('preview');
                const icon = document.createElement('i');
                icon.setAttribute('data-feather', 'eye');
                divPreview.appendChild(icon);
                const image = new Image();
                image.src = item.src;
                image.width = 949;
                image.height = 949;
                image.loading = 'lazy';
                divImage.append(divPreview, image);
                const divContent = document.createElement('div');
                divContent.classList.add('content', 'selected');
                divContent.setAttribute('no', no);
                const p = document.createElement('p');
                p.textContent = 'Pesan';
                divContent.appendChild(p);
                divContainer.append(divImage, divContent);
                section.appendChild(divContainer);
                main.appendChild(section);
                feather.replace();
            });
            document.querySelectorAll('.preview').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const container = e.target.closest('.container');
                    const parent = container.querySelector('.content');
                    const target = parseInt(parent.getAttribute('no'));
                    const item = data[target];
                    window.open(item.url, '_blank');
                });
            });
            document.querySelectorAll('.selected').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const target = btn.getAttribute('no');
                    const phoneNumber = '625156246765';
                    let message = 'Halo, saya ingin melakukan pemesanan wedding invite online.\n'
                    message += `Saya tertarik dengan template ${target}`;
                    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                });
            });
        });
    };
});