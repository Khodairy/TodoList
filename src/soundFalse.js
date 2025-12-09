import { Howl } from "howler";

export const playFalseSound = () => {
  const sound = new Howl({
    src: ["/يا فاشل يا فاشل الباشا تلميذ.mp3"], // Path to the audio file in the public directory
    format: ["mp3"], // Specify the format if needed
  });
  sound.play();
};
