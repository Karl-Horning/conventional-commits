/** @type {string} */
const STORAGE_KEY_FONT = "cc-font-preference";

/** @type {string} */
const DEFAULT_FONT = "inter";

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
        // localStorage may be unavailable in private browsing; fail silently.
    }
};

/**
 * Loads the saved font from localStorage, falling back to the default.
 *
 * @returns {string} The saved font identifier.
 */
const loadFont = () => {
    try {
        return localStorage.getItem(STORAGE_KEY_FONT) ?? DEFAULT_FONT;
    } catch {
        return DEFAULT_FONT;
    }
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

        const original = btn.textContent;
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        btn.setAttribute("aria-label", `Copied: ${text}`);

        setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove("copied");
            btn.setAttribute("aria-label", `Copy ${text}`);
        }, 2000);
    } catch {
        // Clipboard API unavailable; fail silently.
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
