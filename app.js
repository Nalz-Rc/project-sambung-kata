const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const MESSAGES = {
  loading: "Memuat data...",
  loadError: "Gagal memuat data. Pastikan file data.txt tersedia.",
  loadHint:
    "Aplikasi harus dijalankan dari GitHub Pages atau local server, bukan dibuka langsung via file://.",
  emptyData: "Data kosong. Isi data.txt terlebih dahulu.",
  idle: "Pilih huruf untuk mulai mencari.",
  noMatch: "Tidak ada data",
  modePrefix: "Awalan",
  modeSuffix: "Akhiran",
};

const collator = new Intl.Collator("id", { sensitivity: "base" });

const state = {
  loadState: "loading",
  mode: "prefix",
  query: "",
  entries: [],
  matches: [],
  errorMessage: "",
};

const elements = {
  statusText: document.querySelector("#status-text"),
  queryDisplay: document.querySelector("#query-display"),
  queryModeLabel: document.querySelector("#query-mode-label"),
  backspaceButton: document.querySelector("#backspace-button"),
  resetButton: document.querySelector("#reset-button"),
  letterGrid: document.querySelector("#letter-grid"),
  modeButtons: Array.from(document.querySelectorAll(".mode-button")),
  resultsSummary: document.querySelector("#results-summary"),
  resultsContainer: document.querySelector("#results-container"),
  resultsEmpty: document.querySelector("#results-empty"),
  resultsList: document.querySelector("#results-list"),
};

function createLetterButtons() {
  const fragment = document.createDocumentFragment();

  for (const letter of LETTERS) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "letter-button";
    button.textContent = letter;
    button.dataset.letter = letter;
    button.addEventListener("click", () => {
      if (!areLetterButtonsEnabled()) {
        return;
      }

      state.query += letter;
      updateMatches();
      render();
    });
    fragment.appendChild(button);
  }

  elements.letterGrid.appendChild(fragment);
}

function areLetterButtonsEnabled() {
  return state.loadState === "ready";
}

function setMode(nextMode) {
  if (state.mode === nextMode) {
    return;
  }

  state.mode = nextMode;
  updateMatches();
  render();
}

function updateMatches() {
  if (state.loadState !== "ready" || state.query.length === 0) {
    state.matches = [];
    return;
  }

  const normalizedQuery = state.query.toLocaleLowerCase("id-ID");
  const matcher =
    state.mode === "prefix"
      ? (entry) => entry.normalized.startsWith(normalizedQuery)
      : (entry) => entry.normalized.endsWith(normalizedQuery);

  state.matches = state.entries.filter(matcher);
}

function parseData(text) {
  const sanitized = text.replace(/^\uFEFF/, "");
  const seen = new Set();
  const entries = [];

  for (const rawLine of sanitized.split(/\r?\n/)) {
    const value = rawLine.trim();

    if (!value) {
      continue;
    }

    const normalized = value.toLocaleLowerCase("id-ID");

    if (seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);
    entries.push({ display: value, normalized });
  }

  entries.sort((left, right) => collator.compare(left.display, right.display));
  return entries;
}

function formatCount(label, count) {
  return `${label}: ${count.toLocaleString("id-ID")} kata`;
}

function renderStatus() {
  elements.statusText.classList.toggle("is-error", state.loadState === "error");

  if (state.loadState === "loading") {
    elements.statusText.textContent = MESSAGES.loading;
    return;
  }

  if (state.loadState === "error") {
    elements.statusText.innerHTML = "";
    elements.statusText.append(document.createTextNode(state.errorMessage || MESSAGES.loadError));

    const hint = document.createElement("span");
    hint.className = "status-hint";
    hint.textContent = MESSAGES.loadHint;
    elements.statusText.append(hint);
    return;
  }

  if (state.loadState === "empty") {
    elements.statusText.textContent = MESSAGES.emptyData;
    return;
  }

  elements.statusText.textContent = formatCount("Total data", state.entries.length);
}

function renderControls() {
  const controlsEnabled = state.loadState === "ready";
  const queryExists = state.query.length > 0;

  for (const button of elements.modeButtons) {
    const isActive = button.dataset.mode === state.mode;
    button.setAttribute("aria-pressed", String(isActive));
    button.disabled = !controlsEnabled;
  }

  elements.queryModeLabel.textContent = `Mode: ${
    state.mode === "prefix" ? MESSAGES.modePrefix : MESSAGES.modeSuffix
  }`;

  elements.queryDisplay.textContent = queryExists ? state.query : "-";
  elements.backspaceButton.disabled = !controlsEnabled || !queryExists;
  elements.resetButton.disabled = !controlsEnabled || !queryExists;

  const letterButtons = elements.letterGrid.querySelectorAll(".letter-button");
  for (const button of letterButtons) {
    button.disabled = !controlsEnabled;
  }
}

function renderResults() {
  const hasQuery = state.query.length > 0;
  const shouldShowList = state.loadState === "ready" && hasQuery && state.matches.length > 0;
  const shouldShowEmptyMessage = !shouldShowList;

  elements.resultsList.classList.toggle("is-visible", shouldShowList);
  elements.resultsEmpty.hidden = !shouldShowEmptyMessage;

  if (state.loadState === "loading") {
    elements.resultsSummary.textContent = MESSAGES.loading;
    elements.resultsEmpty.textContent = MESSAGES.loading;
    elements.resultsList.innerHTML = "";
    return;
  }

  if (state.loadState === "error") {
    elements.resultsSummary.textContent = MESSAGES.loadError;
    elements.resultsEmpty.textContent = MESSAGES.loadError;
    elements.resultsList.innerHTML = "";
    return;
  }

  if (state.loadState === "empty") {
    elements.resultsSummary.textContent = MESSAGES.emptyData;
    elements.resultsEmpty.textContent = MESSAGES.emptyData;
    elements.resultsList.innerHTML = "";
    return;
  }

  if (!hasQuery) {
    elements.resultsSummary.textContent = MESSAGES.idle;
    elements.resultsEmpty.textContent = MESSAGES.idle;
    elements.resultsList.innerHTML = "";
    return;
  }

  if (state.matches.length === 0) {
    elements.resultsSummary.textContent = MESSAGES.noMatch;
    elements.resultsEmpty.textContent = MESSAGES.noMatch;
    elements.resultsList.innerHTML = "";
    return;
  }

  elements.resultsSummary.textContent = formatCount("Hasil", state.matches.length);

  const fragment = document.createDocumentFragment();
  for (const entry of state.matches) {
    const item = document.createElement("li");
    item.textContent = entry.display;
    fragment.appendChild(item);
  }

  elements.resultsList.innerHTML = "";
  elements.resultsList.appendChild(fragment);
}

function render() {
  renderStatus();
  renderControls();
  renderResults();
}

async function loadData() {
  state.loadState = "loading";
  state.errorMessage = "";
  render();

  try {
    const response = await fetch(`./data.txt?t=${Date.now()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    const entries = parseData(text);

    state.entries = entries;
    state.loadState = entries.length > 0 ? "ready" : "empty";
    updateMatches();
    render();
  } catch (error) {
    state.entries = [];
    state.matches = [];
    state.loadState = "error";
    state.errorMessage = MESSAGES.loadError;
    render();
    console.error("Gagal memuat data.txt", error);
  }
}

function attachEvents() {
  for (const button of elements.modeButtons) {
    button.addEventListener("click", () => {
      if (!areLetterButtonsEnabled()) {
        return;
      }

      setMode(button.dataset.mode);
    });
  }

  elements.backspaceButton.addEventListener("click", () => {
    if (!areLetterButtonsEnabled() || state.query.length === 0) {
      return;
    }

    state.query = state.query.slice(0, -1);
    updateMatches();
    render();
  });

  elements.resetButton.addEventListener("click", () => {
    if (!areLetterButtonsEnabled() || state.query.length === 0) {
      return;
    }

    state.query = "";
    updateMatches();
    render();
  });
}

createLetterButtons();
attachEvents();
render();
loadData();
