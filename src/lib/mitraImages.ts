import mitraImage1 from "@/assets/img/mitra/IMG-20260617-WA0008.jpg";
import mitraImage2 from "@/assets/img/mitra/IMG-20260617-WA0011.jpg";
import mitraImage3 from "@/assets/img/mitra/IMG-20260617-WA0012.jpg";
import mitraImage4 from "@/assets/img/mitra/IMG-20260617-WA0013.jpg";
import mitraImage5 from "@/assets/img/mitra/IMG-20260617-WA0014.jpg";
import mitraImage6 from "@/assets/img/mitra/IMG-20260617-WA0015.jpg";
import mitraImage7 from "@/assets/img/mitra/IMG-20260617-WA0016.jpg";
import mitraImage8 from "@/assets/img/mitra/IMG-20260617-WA0017.jpg";
import mitraImage9 from "@/assets/img/mitra/IMG-20260617-WA0018.jpg";
import mitraImage10 from "@/assets/img/mitra/IMG-20260617-WA0019.jpg";
import mitraImage11 from "@/assets/img/mitra/IMG-20260617-WA0020.jpg";
import { getImage } from "astro:assets";

const MITRA_IMAGE_WIDTH = 300;
const MITRA_IMAGE_QUALITY = 78;

export const mitraImages = [
  {
    src: mitraImage1,
    alt: "Mitra Image 1",
  },
  {
    src: mitraImage2,
    alt: "Mitra Image 2",
  },
  {
    src: mitraImage3,
    alt: "Mitra Image 3",
  },
  {
    src: mitraImage4,
    alt: "Mitra Image 4",
  },
  {
    src: mitraImage5,
    alt: "Mitra Image 5",
  },
  {
    src: mitraImage6,
    alt: "Mitra Image 6",
  },
  {
    src: mitraImage7,
    alt: "Mitra Image 7",
  },
  {
    src: mitraImage8,
    alt: "Mitra Image 8",
  },
  {
    src: mitraImage9,
    alt: "Mitra Image 9",
  },
  {
    src: mitraImage10,
    alt: "Mitra Image 10",
  },
  {
    src: mitraImage11,
    alt: "Mitra Image 11",
  },
];

export type MitraImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export async function getMitraImage(index: number): Promise<MitraImage> {
  const optimized = await getImage({
    src: mitraImages[index].src,
    width: MITRA_IMAGE_WIDTH,
    format: "webp",
    quality: MITRA_IMAGE_QUALITY,
  });
  return {
    src: optimized.src,
    alt: mitraImages[index].alt,
    width: optimized.attributes.width,
    height: optimized.attributes.height,
  };
}
