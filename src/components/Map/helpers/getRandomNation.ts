import { Nation } from "@/interfaces/Map";
import { nations, colors } from "@/constants/nations";

export const getFallenNation = (): Nation => ({
  name: "",
  bellicosity: 0,
  qty: 0,
  color: "#fff",
  img: ""
});

let faceIndex = 1;

const getRandomNation = (): Nation => {
  faceIndex += 1;
  const name = nations.splice(Math.floor(Math.random() * nations.length), 1)[0];
  return name
    ? {
        name: name,
        bellicosity: Math.ceil(Math.random() * 10),
        qty: Math.ceil(Math.random() * 10),
        color: colors[Math.floor(Math.random() * colors.length)],
        img: `https://randomuser.me/api/portraits/${
          faceIndex % 2 ? "women" : "men"
        }/${faceIndex % 100}.jpg`
      }
    : getFallenNation();
};

export default getRandomNation;
