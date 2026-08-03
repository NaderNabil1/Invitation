const MUSIC_SRC = "/music.mp3";

let audio: HTMLAudioElement | null = null;
let started = false;

/** Plays the invitation track once through to the end (user-gesture safe). */
export function playInvitationMusic() {
  if (typeof window === "undefined" || started) return;
  started = true;

  audio = new Audio(MUSIC_SRC);
  audio.preload = "auto";
  audio.loop = false;
  audio.volume = 0.5;
  audio.currentTime = 0;

  const playPromise = audio.play();
  if (playPromise) {
    playPromise.catch(() => {
      started = false;
      audio = null;
    });
  }
}
