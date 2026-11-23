
document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // 1. Are.na 이미지 불러오기
    // ========================================

    const ARENA_API =
        'https://api.are.na/v3/channels/works-iaqp2sxuqce/contents?per=100';

    async function loadArenaImages() {

        // HTML에서 Are.na 이미지 연결이 필요한 요소 찾기
        const images = document.querySelectorAll(
            'img[data-arena-filename]'
        );

        try {

            // Are.na works 채널에서 이미지 목록 가져오기
            const response = await fetch(ARENA_API);

            if (!response.ok) {
                throw new Error(
                    'Are.na API 오류: ' + response.status
                );
            }

            const result = await response.json();

            // ========================================
            // 이미지 제목 정규화 함수
            // 공백, 대소문자, 유니코드 차이 무시
            // ========================================

            function normalizeTitle(title) {
                return title
                    .normalize('NFC')
                    .trim()
                    .replace(/\s+/g, '')
                    .toLowerCase();
            }

            // 이미지 제목과 이미지 주소를 연결할 목록 만들기
            const arenaImages = new Map();

            result.data.forEach(function(block) {

                if (
                    block.type === 'Image' &&
                    block.title &&
                    block.image &&
                    block.image.src
                ) {

                    arenaImages.set(
                        normalizeTitle(block.title),
                        block.image.src
                    );

                }

            });

            // ========================================
            // HTML의 파일명과 Are.na 제목 비교
            // ========================================

            images.forEach(function(img) {

                const filename =
                    img.dataset.arenaFilename;

                const imageUrl = arenaImages.get(
                    normalizeTitle(filename)
                );

                if (imageUrl) {

                    img.src = imageUrl;

                } else {

                    console.warn(
                        'Are.na에서 이미지를 찾을 수 없습니다:',
                        filename
                    );

                }

            });

            console.log(
                'Are.na 이미지 연결 완료:',
                arenaImages.size,
                '개'
            );

        } catch (error) {

            console.error(
                'Are.na 이미지 불러오기 실패:',
                error
            );

        }

    }

    // 이미지 불러오기 실행
    loadArenaImages();


    // ========================================
    // 2. Contact 요소
    // ========================================

    const contactOpen =
        document.getElementById('contact-open');

    const contactModal =
        document.getElementById('contact-modal');

    const contactClose =
        document.getElementById('contact-close');


    // ========================================
    // 3. CV 요소
    // ========================================

    const cvOpen =
        document.getElementById('cv-open');

    const cvModal =
        document.getElementById('cv-modal');

    const cvClose =
        document.getElementById('cv-close');


    // ========================================
    // 4. Contact 창 열기
    // ========================================

    if (contactOpen && contactModal) {

        contactOpen.addEventListener('click', function(e) {

            e.preventDefault();
            contactModal.style.display = 'flex';

        });

    }


    // Contact 창 닫기
    if (contactClose && contactModal) {

        contactClose.addEventListener('click', function() {

            contactModal.style.display = 'none';

        });

    }


    // Contact 바깥 클릭 시 닫기
    if (contactModal) {

        contactModal.addEventListener('click', function(e) {

            if (e.target === contactModal) {

                contactModal.style.display = 'none';

            }

        });

    }


    // ========================================
    // 5. CV 창 열기
    // ========================================

    if (cvOpen && cvModal) {

        cvOpen.addEventListener('click', function(e) {

            e.preventDefault();
            cvModal.style.display = 'flex';

        });

    }


    // CV 창 닫기
    if (cvClose && cvModal) {

        cvClose.addEventListener('click', function() {

            cvModal.style.display = 'none';

        });

    }


    // CV 바깥 클릭 시 닫기
    if (cvModal) {

        cvModal.addEventListener('click', function(e) {

            if (e.target === cvModal) {

                cvModal.style.display = 'none';

            }

        });

    }


    // ========================================
    // 6. CV 한글 / 영어 전환
    // ========================================

    const langButtons =
        document.querySelectorAll('.cv-language button');

    langButtons.forEach(function(button) {

        button.addEventListener('click', function() {

            const lang = button.dataset.lang;

            const cvEng = document.getElementById('cv-eng');
            const cvKor = document.getElementById('cv-kor');

            if (cvEng && cvKor) {

                cvEng.hidden = (lang !== 'eng');
                cvKor.hidden = (lang !== 'kor');

            }

            langButtons.forEach(function(btn) {

                btn.classList.remove('active');

            });

            button.classList.add('active');

        });

    });

});

