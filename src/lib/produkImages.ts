import rakDoubleImage from "@/assets/img/produk/rak-double.webp";
import rakSingleImage from "@/assets/img/produk/rak-single.webp";
import mejaKasirImage from "@/assets/img/produk/meja-kasir.jpeg";
import rakMinimarketImage from "@/assets/img/produk/rak-minimarket.webp";
import rakHeavyDutyImage from "@/assets/img/produk/rak-heavy-duty.jpeg";
import rakRokokImage from "@/assets/img/produk/rak-rokok.jpeg";
import trollyBelanjaImage from "@/assets/img/produk/trolly-belanja.jpg";
import keranjangMiraniImage from "@/assets/img/produk/keranjang-mirani.jpg";
import rakBuahImage from "@/assets/img/produk/rak-buah.jpg";
import priceCardImage from "@/assets/img/produk/price-card.jpeg";
import singleChromeImage from "@/assets/img/produk/single-chrome.jpeg";
import { getImage } from "astro:assets";

const HERO_IMAGE_WIDTH = 1000;
const HERO_IMAGE_QUALITY = 78;

export const produkImages = [
  {
    src: rakDoubleImage,
    alt: "Rak Double",
  },
  {
    src: rakSingleImage,
    alt: "Rak Single",
  },
  {
    src: mejaKasirImage,
    alt: "Meja Kasir",
  },
  {
    src: rakMinimarketImage,
    alt: "Rak Minimarket",
  },
  {
    src: rakHeavyDutyImage,
    alt: "Rak Heavy Duty",
  },
  {
    src: rakRokokImage,
    alt: "Rak Rokok",
  },
  {
    src: trollyBelanjaImage,
    alt: "Trolly Belanja",
  },
  {
    src: keranjangMiraniImage,
    alt: "Keranjang Mirani",
  },
  {
    src: rakBuahImage,
    alt: "Rak Buah",
  },
  {
    src: priceCardImage,
    alt: "Price Card",
  },
  {
    src: singleChromeImage,
    alt: "Single Chrome",
  },
];

export type ProdukImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export async function getProdukImage(index: number): Promise<ProdukImage> {
  const optimized = await getImage({
    src: produkImages[index].src,
    width: HERO_IMAGE_WIDTH,
    format: "webp",
    quality: HERO_IMAGE_QUALITY,
  });
  return {
    src: optimized.src,
    alt: produkImages[index].alt,
    width: optimized.attributes.width,
    height: optimized.attributes.height,
  };
}
