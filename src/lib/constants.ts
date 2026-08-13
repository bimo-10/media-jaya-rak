export const SITE_NAME = "Media Jaya Rak";

export const PHONE_DISPLAY = "0823-3078-9144";
export const PHONE_NUMBER = "6282330789144";
export const EMAIL = "mediajayarack@gmail.com";
export const ADDRESS =
  "Jln Pratama Indah Blok A3 No.2 Pelem Watu Menganti, Kabupaten Gresik, Jawa Timur";

const WA_MESSAGE =
  "Halo Media Jaya Rak, Saya ingin bertanya mengenai produk Rak Gondola dan Rak Gudang. Mohon informasi terkait: harga produk, ukuran yang tersedia, kapasitas beban, estimasi waktu pengerjaan dan pengiriman, serta layanan instalasi (jika tersedia). Terima kasih.";

export const WA_LINK = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Produk Kami",
    href: "/produk-kami",
    children: [
      { label: "Rak Gondola", href: "/produk-kami/rak-gondola" },
      { label: "Rak Gudang", href: "/produk-kami/rak-gudang" },
      { label: "Produk Lainnya", href: "/produk-kami/produk-lainnya" },
    ],
  },
  // { label: "Katalog Produk", href: "/katalog-produk" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Testimoni", href: "/testimoni-pelanggan" },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/mediajayarak" },
  { label: "Shopee", href: "https://id.shp.ee/cWv736Sc" },
  { label: "TikTok", href: "https://tiktok.com/@mediajayarak" },
  { label: "Facebook", href: "https://www.facebook.com/share/185DYyUpYW/" },
];
