import { getImage } from "astro:assets";

export const HERO_IMAGE_WIDTH = 1000;
export const HERO_IMAGE_QUALITY = 78;

// Background image for the hero section
import logoImage from "@/img/assets/logo.webp";

const logoSources = {
  src: logoImage,
  alt: "Logo Media Jaya Rak",
};

export type logoImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export async function getLogoImage(): Promise<logoImage> {
  const optimized = await getImage({
    src: logoSources.src,
    width: HERO_IMAGE_WIDTH,
    format: "webp",
    quality: HERO_IMAGE_QUALITY,
  });
  return {
    src: optimized.src,
    alt: logoSources.alt,
    width: optimized.attributes.width,
    height: optimized.attributes.height,
  };
}

export async function getFaviconImage(size = 32): Promise<{ src: string }> {
  const optimized = await getImage({
    src: logoSources.src,
    width: size,
    height: size,
    fit: "cover",
    format: "png",
  });
  return { src: optimized.src };
}
