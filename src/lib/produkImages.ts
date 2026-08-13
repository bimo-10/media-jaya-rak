import rakDoubleImage from "@/assets/img/produk/rak-double.webp";
import rakSingleImage from "@/assets/img/produk/rak-single.webp";
import mejaKasirImage from "@/assets/img/produk/meja-kasir.jpeg";
import rakMinimarketImage from "@/assets/img/produk/rak-minimarket.webp";
import rakHeavyDutyImage from "@/assets/img/produk/rak-heavy-duty.jpeg";
import rakMediumDutyImage from "@/assets/img/produk/rak-medium-duty.png";
import rakLightDutyImage from "@/assets/img/produk/rak-light-duty.png";
import rakHeavyDuty1Image from "@/assets/img/produk/rak-heavy-duty-1.jpeg";
import rakCustomKombinasiImage from "@/assets/img/produk/rak-custom-kombinasi.jpeg";
import rakSikuSerbagunaImage from "@/assets/img/produk/rak-siku-serbaguna.jpeg";
import rakRokokImage from "@/assets/img/produk/rak-rokok.jpeg";
import trollyBelanjaImage from "@/assets/img/produk/trolly-belanja.jpg";
import keranjangMiraniImage from "@/assets/img/produk/keranjang-mirani.webp";
import rakBuahImage from "@/assets/img/produk/rak-buah.jpg";
import priceCardImage from "@/assets/img/produk/price-card.jpeg";
import singleChromeImage from "@/assets/img/produk/single-chrome.jpeg";
import rakBackpanelPerforadeImage from "@/assets/img/produk/rak-backpanel-perforade.jpeg";
import rakBackpanelPolosImage from "@/assets/img/produk/rak-backpanel-polos.jpeg";
import rakCornerImage from "@/assets/img/produk/rak-corner.jpeg";
import rakEndImage from "@/assets/img/produk/rak-end.jpeg";
import mejaKasirAlfaSudutImage from "@/assets/img/produk/meja-kasir-alfa-sudut.jpeg";
import mejaKasirStandarImage from "@/assets/img/produk/meja-kasir-standar.jpeg";
import backmeshDindingImage from "@/assets/img/produk/backmesh-dinding.jpeg";
import backmeshKakiImage from "@/assets/img/produk/backmesh-kaki.jpeg";
import boxWagonImage from "@/assets/img/produk/box-wagon.jpeg";
import doubleRamImage from "@/assets/img/produk/double-ram.jpeg";
import keranjangTarikImage from "@/assets/img/produk/keranjang-tarik.jpeg";
import pintuMasukPutarImage from "@/assets/img/produk/pintu-masuk-putar.jpeg";
import rakSnackKeranjangImage from "@/assets/img/produk/rak-snack-keranjang.jpeg";
import stopperImage from "@/assets/img/produk/stopper.jpeg";
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
  {
    src: rakMediumDutyImage,
    alt: "Rak Medium Duty",
  },
  {
    src: rakLightDutyImage,
    alt: "Rak Light Duty",
  },
  {
    src: rakHeavyDuty1Image,
    alt: "Rak Heavy Duty 1",
  },
  {
    src: rakCustomKombinasiImage,
    alt: "Rak Custom Kombinasi",
  },
  {
    src: rakSikuSerbagunaImage,
    alt: "Rak Siku Serbaguna",
  },
  {
    src: rakBackpanelPerforadeImage,
    alt: "Rak Backpanel Perforade",
  },
  {
    src: rakBackpanelPolosImage,
    alt: "Rak Backpanel Polos",
  },
  {
    src: rakCornerImage,
    alt: "Rak Corner",
  },
  {
    src: rakEndImage,
    alt: "Rak End",
  },
  {
    src: mejaKasirAlfaSudutImage,
    alt: "Meja Kasir Alfa Sudut",
  },
  {
    src: mejaKasirStandarImage,
    alt: "Meja Kasir Standar",
  },
  {
    src: backmeshDindingImage,
    alt: "Backmesh Dinding",
  },
  {
    src: backmeshKakiImage,
    alt: "Backmesh Kaki",
  },
  {
    src: boxWagonImage,
    alt: "Box Wagon",
  },
  {
    src: doubleRamImage,
    alt: "Double Ram",
  },
  {
    src: keranjangTarikImage,
    alt: "Keranjang Tarik",
  },
  {
    src: pintuMasukPutarImage,
    alt: "Pintu Masuk Putar",
  },
  {
    src: rakSnackKeranjangImage,
    alt: "Rak Snack Keranjang",
  },
  {
    src: stopperImage,
    alt: "Stopper",
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
