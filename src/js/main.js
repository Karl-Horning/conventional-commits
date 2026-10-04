/** @type {string} */
const STORAGE_KEY_FONT = "cc-font-preference";

/** @type {string} */
const DEFAULT_FONT = "inter";

/**
 * Valid font identifiers. The inline script in the head of index.html checks against the same list.
 *
 * @type {string[]}
 */
const FONTS = ["inter", "system", "opendyslexic"];

/**
 * Applies the chosen font to the document and updates button state.
 *
 * @param {string} font - The font identifier ('inter', 'system', or 'opendyslexic').
 */
const applyFont = (font) => {
    document.documentElement.setAttribute("data-font", font);

    document.querySelectorAll(".font-btn").forEach((btn) => {
        const isActive = btn.dataset.font === font;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
    });
};

/**
 * Saves the chosen font to localStorage.
 *
 * @param {string} font - The font identifier to persist.
 */
const saveFont = (font) => {
    try {
        localStorage.setItem(STORAGE_KEY_FONT, font);
    } catch {
        // Without localStorage, the choice lasts until the page reloads.
    }
};

/**
 * Loads the saved font from localStorage. Returns the default font if nothing valid is saved.
 *
 * @returns {string} The font identifier to apply.
 */
const loadFont = () => {
    try {
        const font = localStorage.getItem(STORAGE_KEY_FONT);
        return FONTS.includes(font) ? font : DEFAULT_FONT;
    } catch {
        return DEFAULT_FONT;
    }
};

/** @type {number} */
const FEEDBACK_DURATION_MS = 2000;

/**
 * Pending reset timers, keyed by button. A second click clears the old timer before setting a new one.
 *
 * @type {WeakMap<HTMLButtonElement, number>}
 */
const resetTimers = new WeakMap();

/**
 * Shows feedback on a copy button and announces it to screen readers, then restores the button after a short delay.
 *
 * @param {HTMLButtonElement} btn - The button to update.
 * @param {string} buttonText - The text to show on the button.
 * @param {string} announcement - The message for the status region.
 * @param {boolean} succeeded - Whether the copy worked.
 */
const showCopyFeedback = (btn, buttonText, announcement, succeeded) => {
    const status = document.getElementById("copy-status");

    clearTimeout(resetTimers.get(btn));

    btn.textContent = buttonText;
    btn.classList.toggle("copied", succeeded);
    if (status) {
        status.textContent = announcement;
    }

    resetTimers.set(
        btn,
        setTimeout(() => {
            btn.textContent = btn.dataset.label;
            btn.classList.remove("copied");
            if (status) {
                status.textContent = "";
            }
        }, FEEDBACK_DURATION_MS),
    );
};

/**
 * Copies the given text to the clipboard and shows brief feedback on
 * the triggering button.
 *
 * @param {string} text - The text to copy.
 * @param {HTMLButtonElement} btn - The button that triggered the copy.
 */
const copyToClipboard = async (text, btn) => {
    try {
        await navigator.clipboard.writeText(text);
        showCopyFeedback(btn, "Copied!", `Copied: ${text}`, true);
    } catch {
        // The Clipboard API is missing or blocked, so ask for a manual copy.
        showCopyFeedback(
            btn,
            "Couldn't copy",
            "Couldn't copy. Select the text and copy it yourself.",
            false,
        );
    }
};

/**
 * Initialises the font switcher.
 */
const initFontSwitcher = () => {
    applyFont(loadFont());

    document.querySelectorAll(".font-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const font = btn.dataset.font;
            applyFont(font);
            saveFont(font);
        });
    });
};

/**
 * Initialises the copy-to-clipboard buttons.
 */
const initCopyButtons = () => {
    document.querySelectorAll(".copy-btn").forEach((btn) => {
        btn.dataset.label = btn.textContent.trim();

        btn.addEventListener("click", () => {
            const code = btn.closest(".copy-item")?.querySelector("code");
            if (code) {
                copyToClipboard(code.textContent.trim(), btn);
            }
        });
    });
};

// Initialise on DOM ready.
document.addEventListener("DOMContentLoaded", () => {
    initFontSwitcher();
    initCopyButtons();
});
