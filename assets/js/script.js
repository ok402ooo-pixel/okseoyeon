
document.addEventListener('DOMContentLoaded', function() {

    // Contact 요소
    const contactOpen = document.getElementById('contact-open');
    const contactModal = document.getElementById('contact-modal');
    const contactClose = document.getElementById('contact-close');

    // CV 요소
    const cvOpen = document.getElementById('cv-open');
    const cvModal = document.getElementById('cv-modal');
    const cvClose = document.getElementById('cv-close');


    // Contact 창 열기
    contactOpen.addEventListener('click', function(e) {
        e.preventDefault();
        contactModal.style.display = 'flex';
    });

    // Contact 창 닫기
    contactClose.addEventListener('click', function() {
        contactModal.style.display = 'none';
    });

    // Contact 바깥 클릭 시 닫기
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            contactModal.style.display = 'none';
        }
    });


    // CV 창 열기
    cvOpen.addEventListener('click', function(e) {
        e.preventDefault();
        cvModal.style.display = 'flex';
    });

    // CV 창 닫기
    cvClose.addEventListener('click', function() {
        cvModal.style.display = 'none';
    });

    // CV 바깥 클릭 시 닫기
    cvModal.addEventListener('click', function(e) {
        if (e.target === cvModal) {
            cvModal.style.display = 'none';
        }
    });


    // CV 한글 / 영어 전환
    const langButtons = document.querySelectorAll('.cv-language button');

    langButtons.forEach(function(button) {

        button.addEventListener('click', function() {

            const lang = button.dataset.lang;

            document.getElementById('cv-eng').hidden = (lang !== 'eng');
            document.getElementById('cv-kor').hidden = (lang !== 'kor');

            langButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });

            button.classList.add('active');

        });

    });

});
