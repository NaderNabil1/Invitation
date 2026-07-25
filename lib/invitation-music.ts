const MUSIC_SRC = "/music.mp3";
const CLIP_SECONDS = 15;
const FADE_MS = 1200;

let audio: HTMLAudioElement | null = null;
let fadeTimer: number | null = null;
let fadeRaf: number | null = null;
let started = false;

function clearTimers() {
  if (fadeTimer !== null) {
    window.clearTimeout(fadeTimer);
    fadeTimer = null;
  }
  if (fadeRaf !== null) {
    window.cancelAnimationFrame(fadeRaf);
    fadeRaf = null;
  }
}

function fadeOutAndStop() {
  if (!audio) return;

  const startVol = audio.volume;
  const start = performance.now();

  const tick = (now: number) => {
    if (!audio) return;
    const t = Math.min(1, (now - start) / FADE_MS);
    audio.volume = startVol * (1 - t);
    if (t < 1) {
      fadeRaf = window.requestAnimationFrame(tick);
      return;
    }
    audio.pause();
    audio.currentTime = 0;
    audio.volume = startVol;
  };

  fadeRaf = window.requestAnimationFrame(tick);
}

/** Plays the first 15s of the invitation track (user-gesture safe). */
export function playInvitationMusic() {
  if (typeof window === "undefined" || started) return;
  started = true;

  audio = new Audio(MUSIC_SRC);
  audio.preload = "auto";
  audio.volume = 0.85;
  audio.currentTime = 0;

  const playPromise = audio.play();
  if (playPromise) {
    playPromise.catch(() => {
      started = false;
      audio = null;
    });
  }

  const hardStopAt = CLIP_SECONDS * 1000;
  const fadeAt = Math.max(0, hardStopAt - FADE_MS);

  fadeTimer = window.setTimeout(() => {
    fadeOutAndStop();
  }, fadeAt);

  // Safety: force stop if fade somehow stalls past the clip length.
  window.setTimeout(() => {
    if (!audio || audio.paused) return;
    clearTimers();
    audio.pause();
    audio.currentTime = 0;
  }, hardStopAt + 200);
}
