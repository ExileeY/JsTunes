export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');
    const radioVolumeUp = document.querySelector('.radio-volume-up');


    const audio = new Audio();
    audio.type = "audio/aac";

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-pause');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-pause');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const imgUrl = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = imgUrl;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
    });

    radioVolumeUp.addEventListener('click', () => {
        let currentVolume = audio.volume * 100;

        radioVolumeUp.classList.toggle('fa-volume-up');
        radioVolumeUp.classList.toggle('fa-volume-off');

        if (audio.muted) {
            audio.muted = false;
            radioVolume.value = currentVolume;
        } else {
            audio.muted = true;
            radioVolume.value = 0;
        }
    });

    audio.volume = 0.5;

    radioVolume.value = audio.volume * 100;
};