import heroImage1 from "@/assets/img/hero/Hero.jpeg";
import { getImage } from "astro:assets";

const HERO_IMAGE_WIDTH = 1000;
const HERO_IMAGE_QUALITY = 78;

export const heroImage1Sources = {
  src: heroImage1,
  alt: "Hero Image 1",
};

export type HeroImage1 = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export async function getHeroImage(): Promise<HeroImage1> {
  const optimized = await getImage({
    src: heroImage1Sources.src,
    width: HERO_IMAGE_WIDTH,
    format: "webp",
    quality: HERO_IMAGE_QUALITY,
  });
  return {
    src: optimized.src,
    alt: heroImage1Sources.alt,
    width: optimized.attributes.width,
    height: optimized.attributes.height,
  };
}
