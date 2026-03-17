import AudioMotionAnalyzer, {
    type ConstructorOptions,
} from 'audiomotion-analyzer';
import { asset, exists, mouseEnterLeave } from './helpers';

const soundEffects = {
    buttonClick: new Audio(asset('./assets/audio/button_click.mp3')),
    buttonHover: new Audio(asset('./assets/audio/button_hover.mp3')),
    diceRoll: new Audio(asset('./assets/audio/dice_roll.mp3')),
};

const DEFAULT_MUSIC_PLAYER_STATE = {
    source: new Audio() as HTMLMediaElement,
    soundEffects: true,
};

type MusicPlayerState = typeof DEFAULT_MUSIC_PLAYER_STATE;

interface MusicPlayerOptions {
    selector?: string;
    container?: HTMLElement;
    state?: MusicPlayerState;
    visualizerOptions?: ConstructorOptions;
}

export default class MusicPlayer {
    private playPause: HTMLButtonElement;
    private reroll: HTMLButtonElement;
    private visualizer: AudioMotionAnalyzer;
    private state: MusicPlayerState;
    private root: ShadowRoot;

    constructor(options: MusicPlayerOptions) {
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

        this.state = {
            ...DEFAULT_MUSIC_PLAYER_STATE,
            ...options.state,
        };

        this.state.source.addEventListener('ended', () => this.pause());

        this.root = options.container.attachShadow({ mode: 'open' });
        const section = document.createElement('section');
        section.style.visibility = 'hidden';
        section.innerHTML = `
            <section>
                <button class="play-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z"/></svg>
                    <div id="spectrum"></div>
                </button>
                <span>

                    <button class="random-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256C206.3 256 192 241.7 192 224C192 206.3 206.3 192 224 192zM192 416C192 398.3 206.3 384 224 384C241.7 384 256 398.3 256 416C256 433.7 241.7 448 224 448C206.3 448 192 433.7 192 416zM320 288C337.7 288 352 302.3 352 320C352 337.7 337.7 352 320 352C302.3 352 288 337.7 288 320C288 302.3 302.3 288 320 288zM384 224C384 206.3 398.3 192 416 192C433.7 192 448 206.3 448 224C448 241.7 433.7 256 416 256C398.3 256 384 241.7 384 224zM416 384C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448C398.3 448 384 433.7 384 416C384 398.3 398.3 384 416 384z"/></svg>
                    </button>
                    <a href="#" target="_blank">testeasdfasfd</a>
                </span>
            </section>
        `;

        const link = document.createElement('link');
        link.href = asset('./styles.css');
        link.type = 'text/css';
        link.rel = 'stylesheet';

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

        this.playPause = exists(
            this.root.querySelector<HTMLButtonElement>('.play-button')
        );

        this.playPause.addEventListener('click', () => this.toggle());
        this.playPause.addEventListener('click', () =>
            soundEffects.buttonClick.play()
        );

        this.reroll = exists(
            this.root.querySelector<HTMLButtonElement>('.random-button')
        );
        this.reroll.addEventListener('click', () =>
            soundEffects.diceRoll.play()
        );

        mouseEnterLeave({
            element: this.playPause,
            hoverTime: 100,
            callback() {
                soundEffects.buttonHover.play();
            },
        });

        mouseEnterLeave({
            element: this.reroll,
            hoverTime: 100,
            callback() {
                soundEffects.diceRoll.play();
            },
        });
    }

    update(newState: Partial<MusicPlayerState>) {
        this.pause();
        this.visualizer.disconnectInput();
        this.state = {
            ...this.state,
            ...newState,
        };
        this.visualizer.connectInput(this.state.source);
    }

    pause() {
        console.log('pausing');
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
