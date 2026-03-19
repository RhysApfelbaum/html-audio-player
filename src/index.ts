import AudioMotionAnalyzer, {
    type ConstructorOptions,
} from 'audiomotion-analyzer';
import { asset, entries, exists, mouseEnterLeave } from './helpers';

const soundEffects = {};

const DEFAULT_MUSIC_PLAYER_STATE = {
    source: new Audio() as HTMLMediaElement,
};

type MusicPlayerState = typeof DEFAULT_MUSIC_PLAYER_STATE;

interface MusicPlayerColors {
    foreground?: string;
    background?: string;
    highlight?: string;
}

interface MusicPlayerOptions {
    selector?: string;
    container?: HTMLElement;
    state?: MusicPlayerState;
    visualizerOptions?: ConstructorOptions;
    colors?: Partial<MusicPlayerColors>;
    soundEffects?: boolean;
}

export default class MusicPlayer {
    private playPause: HTMLButtonElement;
    private reroll: HTMLButtonElement;
    private visualizer: AudioMotionAnalyzer;
    private state: MusicPlayerState;
    private static SOUND_EFFECT_URLS = {
        buttonClick: asset('./assets/audio/button_click.mp3'),
        buttonHover: asset('./assets/audio/button_hover.mp3'),
        diceRoll: asset('./assets/audio/dice_roll.mp3'),
    } as const;
    private soundEffects: Partial<
        Record<keyof typeof MusicPlayer.SOUND_EFFECT_URLS, HTMLAudioElement>
    >;
    private root: ShadowRoot;

    constructor(options: MusicPlayerOptions) {
        this.state = {
            ...DEFAULT_MUSIC_PLAYER_STATE,
            ...options.state,
        };

        this.state.source.addEventListener('ended', () => this.pause());

        this.soundEffects = {};
        entries(MusicPlayer.SOUND_EFFECT_URLS).forEach(([key, url]) => {
            this.soundEffects[key] = new Audio(url);
        });
        console.log(soundEffects);

        if (!options.container) {
            const queryResult = document.querySelector<HTMLElement>(
                options.selector || ''
            )!;
            if (!queryResult) {
                throw new Error(
                    `MusicPlayer init error:\nThe selector '${options.selector}' returned no results.`
                );
            }
            options.container = queryResult;
        }

        this.root = options.container.attachShadow({ mode: 'open' });
        const section = document.createElement('section');
        section.style.visibility = 'hidden';
        section.innerHTML = `
            <span id="volume-controls">
                <button class="volume-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M112 416L160 416L294.1 535.2C300.5 540.9 308.7 544 317.2 544C336.4 544 352 528.4 352 509.2L352 130.8C352 111.6 336.4 96 317.2 96C308.7 96 300.5 99.1 294.1 104.8L160 224L112 224C85.5 224 64 245.5 64 272L64 368C64 394.5 85.5 416 112 416zM505.1 171C494.8 162.6 479.7 164.2 471.3 174.5C462.9 184.8 464.5 199.9 474.8 208.3C507.3 234.7 528 274.9 528 320C528 365.1 507.3 405.3 474.8 431.8C464.5 440.2 463 455.3 471.3 465.6C479.6 475.9 494.8 477.4 505.1 469.1C548.3 433.9 576 380.2 576 320.1C576 260 548.3 206.3 505.1 171.1zM444.6 245.5C434.3 237.1 419.2 238.7 410.8 249C402.4 259.3 404 274.4 414.3 282.8C425.1 291.6 432 305 432 320C432 335 425.1 348.4 414.3 357.3C404 365.7 402.5 380.8 410.8 391.1C419.1 401.4 434.3 402.9 444.6 394.6C466.1 376.9 480 350.1 480 320C480 289.9 466.1 263.1 444.5 245.5z"/></svg>
                </button>
                <div class="slider">
                    <input type="range" id="volume" value="80">
                    <div class="slider-track"></div>
                </div>
            </span>
            <button class="play-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z"/></svg>
                <div id="spectrum"></div>
            </button>
            <span>
                <button class="random-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256C206.3 256 192 241.7 192 224C192 206.3 206.3 192 224 192zM192 416C192 398.3 206.3 384 224 384C241.7 384 256 398.3 256 416C256 433.7 241.7 448 224 448C206.3 448 192 433.7 192 416zM320 288C337.7 288 352 302.3 352 320C352 337.7 337.7 352 320 352C302.3 352 288 337.7 288 320C288 302.3 302.3 288 320 288zM384 224C384 206.3 398.3 192 416 192C433.7 192 448 206.3 448 224C448 241.7 433.7 256 416 256C398.3 256 384 241.7 384 224zM416 384C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448C398.3 448 384 433.7 384 416C384 398.3 398.3 384 416 384z"/></svg>
                </button>
            </span>
            <span id="time-controls">
                <p id="current-time">0:00</p>
                <div class="slider">
                    <input type="range" id="seek" value="0">
                    <div class="slider-track"></div>
                </div>
                <p id="total-time">0:00</p>
            </span>
        `;

        const link = document.createElement('link');
        link.href = asset('./styles.css');
        link.type = 'text/css';
        link.rel = 'stylesheet';

        Object.entries(options.colors || {}).forEach(([key, value]) => {
            section.style.setProperty(`--${key}`, value);
        });

        this.root.appendChild(link);
        this.root.appendChild(section);
        link.addEventListener('load', () => {
            section.style.visibility = '';
        });

        this.visualizer = new AudioMotionAnalyzer(
            exists(this.root.getElementById('spectrum')),
            {
                source: this.state.source,
                showBgColor: false,
                overlay: true,
                showScaleX: false,
                showScaleY: false,
                radial: true,
                radius: 0.8,
                showPeaks: false,
                gradient: 'orangered',
                ...options.visualizerOptions,
            }
        );

        const volume = exists(
            this.root.querySelector<HTMLInputElement>('#volume')
        );
        volume.addEventListener('input', () => {
            this.state.source.volume = volume.valueAsNumber / 100;
        });

        const volumeButton = exists(
            this.root.querySelector<HTMLButtonElement>('.volume-button')
        );
        const volumeControls = exists(
            this.root.querySelector<HTMLSpanElement>('#volume-controls')
        );
        volumeControls.addEventListener('focusin', () => {
            volumeControls.classList.add('visible');
        });
        volumeControls.addEventListener('focusout', () => {
            volumeControls.classList.remove('visible');
        });

        // Scroll wheel controls volume slider
        volume.addEventListener('wheel', (event) => {
            event.preventDefault();
            const step = Number(volume.step) * 5 || 5;
            const delta = event.deltaY < 0 ? step : -step;
            const newValue = volume.valueAsNumber + delta;

            const min = Number(volume.min) || 0;
            const max = Number(volume.max) || 100;

            const maxClamped = Math.min(max, newValue);
            const clamped = Math.max(min, maxClamped);
            volume.valueAsNumber = clamped;
            volume.dispatchEvent(new Event('input'));
        });

        const seekBar = exists(
            this.root.querySelector<HTMLInputElement>('#seek')
        );

        this.state.source.addEventListener('loadedmetadata', () => {
            if (!Number.isFinite(this.state.source.duration)) {
                seekBar.setAttribute('disabled', 'true');
                seekBar.style.cursor = 'not-allowed';
            }
            exists(this.root.querySelector('#total-time')).innerHTML =
                this.clockDisplay(this.state.source.duration);
        });

        this.state.source.addEventListener('timeupdate', (event) => {
            seekBar.valueAsNumber = this.state.source.currentTime;
            this.updateSeekBar(this.state.source.currentTime);
        });
        seekBar.addEventListener('input', (event) => {
            this.state.source.currentTime = seekBar.valueAsNumber;
            this.updateSeekBar(seekBar.valueAsNumber);
        });

        this.playPause = exists(
            this.root.querySelector<HTMLButtonElement>('.play-button')
        );

        this.playPause.addEventListener('click', () => this.toggle());
        this.playPause.addEventListener('click', () =>
            this.soundEffects.buttonClick?.play()
        );

        this.reroll = exists(
            this.root.querySelector<HTMLButtonElement>('.random-button')
        );
        this.reroll.addEventListener('click', () =>
            this.soundEffects.diceRoll?.play()
        );

        mouseEnterLeave({
            element: this.playPause,
            hoverTime: 100,
            callback: () => {
                this.soundEffects.buttonHover?.play();
            },
        });

        mouseEnterLeave({
            element: this.reroll,
            hoverTime: 100,
            callback: () => {
                this.soundEffects.diceRoll?.play();
            },
        });
    }

    updateState(newState: Partial<MusicPlayerState>) {
        this.pause();
        this.visualizer.disconnectInput();
        this.state = {
            ...this.state,
            ...newState,
        };
        this.visualizer.connectInput(this.state.source);
    }

    updateSeekBar(seconds: number) {
        console.log('hi');
        const currentTime = exists(this.root.querySelector('#current-time'));
        currentTime.innerHTML = this.clockDisplay(seconds);
    }

    clockDisplay(seconds: number) {
        if (!Number.isFinite(seconds)) {
            return '--:--';
        }
        const secondDisplay = Math.floor(seconds % 60)
            .toString()
            .padStart(2, '0');
        const minuteDisplay = Math.floor(seconds / 60).toString();
        return minuteDisplay + ':' + secondDisplay;
    }

    pause() {
        this.state.source.pause();
        this.playPause.classList.remove('playing');
    }

    play() {
        this.state.source.play();
        this.playPause.classList.add('playing');
    }

    toggle() {
        if (!this.state.source.paused) {
            this.pause();
        } else {
            this.play();
        }
    }
}
