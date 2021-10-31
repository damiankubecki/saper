class WindowProps {
    constructor() {
        this.title = 'Przegrana';
        this.content = `
        <div class="window__content__container">
            <h4 class="window__content__subtitle">Gra zakończona porażką</h4>
            <p class="window__content__paragraph--bigger">Czas: <span id="stats_time"></span></p>
            <p class="window__content__paragraph--bigger">Zagęszczenie bomb: <span id="stats_compaction"></span></p>
        </div>
        <button class="window__confirm">Nowa gra</button>
        `;
        this.windowFunctions = game => {
            this.#game = game;
            this.#confirmBtn = document.querySelector('.window__confirm');

            this.#fillStats();
            this.#addConfirmListener();
        }
    }

    #game;
    #confirmBtn;

    #addConfirmListener() {
        this.#confirmBtn.addEventListener('click', () => this.#confirmListener());
    }

    #confirmListener() {
        this.#game.restartGame();
        this.#closeWindow();
    }

    #fillStats() {
        this.#fillGameTimeInfo();
        this.#fillBombsCompactionInfo();
    }

    #fillGameTimeInfo() {
        const timeSpan = document.querySelector('#stats_time');

        const gameTime = this.#game.getTimerTime();
        timeSpan.textContent = `${gameTime}s`;
    }

    #fillBombsCompactionInfo() {
        const compactionSpan = document.querySelector('#stats_compaction');

        const bombs = this.#game.getBombsNumber();
        const rows = this.#game.getRowsNumber();
        const cols = this.#game.getColsNumber();

        const bombsCompaction = bombs / (rows * cols) * 100;
        compactionSpan.textContent = `${bombsCompaction.toFixed(2)}%`;
    }

    #closeWindow() {
        const optionsWindow = document.querySelector(".window");
        optionsWindow.classList.remove("active");
    }
}

const window = new WindowProps();

export default {
    title: window.title,
    content: window.content,
    renderFunction: window.windowFunctions
}