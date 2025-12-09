import { Howl } from "howler";

export const playSound = () => {
  const sound = new Howl({
    src: ["/زغروطه.mp3"], // Path to the audio file in the public directory
    format: ["mp3"], // Specify the format if needed
  });
  sound.play();
};
