import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import type { PageFlipInstance } from "react-pageflip";
import {
  getDocument,
  GlobalWorkerOptions,
} from "pdfjs-dist/legacy/build/pdf.mjs";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import catalogPdfUrl from "@/data/KATALOG LOKA RAK_compressed.pdf";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  ExternalLink,
  List,
  Loader2,
  Maximize,
  Minimize,
  Share2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const MIN_ZOOM = 0.6;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.25;
const BOOK_HEIGHT = 500;
const RENDER_HEIGHT = 1400;

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface RenderedPage {
  src: string;
  width: number;
  height: number;
}

function parseHashPage(): number | null {
  if (typeof window === "undefined") return null;
  const match = window.location.hash.match(/^#page\/(\d+)/);
  if (!match) return null;
  const page = Number(match[1]);
  return Number.isFinite(page) && page > 0 ? page : null;
}

function buildShareUrl() {
  if (typeof window === "undefined") {
    return "https://mediajayarak.com/katalog-produk";
  }
  return window.location.href;
}

function controlButtonClass(active = false) {
  return cn(
    "inline-flex size-9 items-center justify-center rounded-lg border transition-colors",
    active
      ? "border-primary bg-primary text-primary-foreground shadow-sm"
      : "border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-primary",
  );
}

const PdfPage = forwardRef<HTMLDivElement, { src: string; alt: string }>(
  ({ src, alt }, ref) => (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center overflow-hidden bg-white"
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-full w-full select-none object-contain"
      />
    </div>
  ),
);

PdfPage.displayName = "PdfPage";

function LoadingState() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-2xl border border-primary/20 bg-white/70 backdrop-blur-sm">
      <Loader2 className="size-8 animate-spin text-primary" />
      <p className="text-sm font-medium text-muted-foreground">
        Memuat katalog…
      </p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-2xl border border-red-300 bg-red-50">
      <AlertCircle className="size-8 text-red-500" />
      <p className="text-sm font-semibold text-red-600">Gagal memuat katalog</p>
      <p className="max-w-sm text-center text-xs text-red-500">{message}</p>
    </div>
  );
}

export default function ProductCatalogFlipbook() {
  const bookRef = useRef<{ pageFlip(): PageFlipInstance } | null>(null);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const scaledRef = useRef<HTMLDivElement | null>(null);

  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [copied, setCopied] = useState(false);
  const [baseHeight, setBaseHeight] = useState<number | null>(null);

  const pageCount = pages.length;
  const bookWidth = pages[0]?.width ?? 353;
  const bookHeight = pages[0]?.height ?? BOOK_HEIGHT;

  const toc = useMemo(
    () =>
      Array.from({ length: pageCount }, (_, i) => ({
        page: i + 1,
        title: `Halaman ${i + 1}`,
      })),
    [pageCount],
  );

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const doc = await getDocument({ url: catalogPdfUrl }).promise;
        if (cancelled) return;

        const firstViewport = (await doc.getPage(1)).getViewport({ scale: 1 });
        const height = BOOK_HEIGHT;
        const width = Math.round(
          (firstViewport.width / firstViewport.height) * height,
        );
        const scale = RENDER_HEIGHT / firstViewport.height;

        const rendered: RenderedPage[] = [];
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          const context = canvas.getContext("2d");
          if (!context)
            throw new Error("Canvas 2D tidak didukung oleh browser.");
          await page.render({ canvasContext: context, viewport }).promise;
          rendered.push({
            src: canvas.toDataURL("image/jpeg", 0.92),
            width,
            height,
          });
        }

        if (!cancelled) setPages(rendered);
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error
              ? e.message
              : "Terjadi kesalahan saat memuat PDF.",
          );
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = scaledRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setBaseHeight(el.offsetHeight);
    });
    observer.observe(el);
    setBaseHeight(el.offsetHeight);

    return () => observer.disconnect();
  }, [pages.length]);

  useEffect(() => {
    const syncFromHash = () => {
      const page = parseHashPage();
      const flip = bookRef.current?.pageFlip();
      if (!flip || page === null) return;
      const target = Math.min(Math.max(page - 1, 0), pageCount - 1);
      if (target !== flip.getCurrentPageIndex()) flip.flip(target);
    };

    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [pageCount]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const updateHash = (pageIndex: number) => {
    const url = `${window.location.pathname}${window.location.search}#page/${pageIndex + 1}`;
    window.history.replaceState(null, "", url);
  };

  const goToPage = (pageIndex: number) => {
    const flip = bookRef.current?.pageFlip();
    if (!flip) return;
    const target = Math.min(Math.max(pageIndex, 0), pageCount - 1);
    flip.flip(target);
  };

  const goPrev = () => bookRef.current?.pageFlip().flipPrev();
  const goNext = () => bookRef.current?.pageFlip().flipNext();
  const goFirst = () => goToPage(0);
  const goLast = () => goToPage(pageCount - 1);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      const el = outerRef.current;
      if (el && el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      }
    }
  };

  const zoomIn = () => setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM));
  const zoomOut = () => setZoom((z) => Math.max(z - ZOOM_STEP, MIN_ZOOM));

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(buildShareUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const shareLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(buildShareUrl())}`,
      color: "#25D366",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(buildShareUrl())}`,
      color: "#1877F2",
    },
    {
      label: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(buildShareUrl())}&text=${encodeURIComponent("Katalog Produk Media Jaya Rak")}`,
      color: "#111827",
    },
  ];

  const currentLabel = currentPage + 1;

  if (error) return <ErrorState message={error} />;
  if (pageCount === 0) return <LoadingState />;

  return (
    <div
      ref={outerRef}
      className={cn(
        "flex flex-col items-center",
        isFullscreen &&
          "fixed inset-0 z-50 w-full justify-center overflow-auto bg-neutral-900 p-6",
      )}
    >
      <div
        className={cn(
          "w-full max-w-6xl rounded-2xl border border-primary/20 bg-white/70 p-3 shadow-lg backdrop-blur-sm sm:p-5",
          isFullscreen && "max-w-7xl bg-neutral-800/40",
        )}
      >
        <div
          className="mx-auto transition-[height] duration-200"
          style={{ height: baseHeight ? baseHeight * zoom : undefined }}
        >
          <div
            ref={scaledRef}
            className="mx-auto"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
            }}
          >
            <HTMLFlipBook
              ref={bookRef}
              width={bookWidth}
              height={bookHeight}
              size="stretch"
              minWidth={280}
              maxWidth={520}
              minHeight={400}
              maxHeight={720}
              showCover
              drawShadow
              flippingTime={700}
              mobileScrollSupport
              className="rounded-xl shadow-xl"
              style={{}}
              onInit={() => {
                const page = parseHashPage();
                if (page !== null && page !== 1) goToPage(page - 1);
              }}
              onFlip={(e) => {
                const index = e.data;
                setCurrentPage(index);
                updateHash(index);
              }}
            >
              {pages.map((page, i) => (
                <PdfPage
                  key={page.src}
                  src={page.src}
                  alt={`Halaman ${i + 1}`}
                />
              ))}
            </HTMLFlipBook>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setShowToc((v) => !v)}
              aria-label="Daftar isi"
              title="Daftar isi"
              className={controlButtonClass(showToc)}
            >
              <List className="size-4" />
            </button>

            <span className="mx-1 h-6 w-px bg-border" aria-hidden="true" />

            <button
              type="button"
              onClick={zoomOut}
              aria-label="Perkecil"
              title="Perkecil"
              className={controlButtonClass()}
            >
              <ZoomOut className="size-4" />
            </button>
            <button
              type="button"
              onClick={zoomIn}
              aria-label="Perbesar"
              title="Perbesar"
              className={controlButtonClass()}
            >
              <ZoomIn className="size-4" />
            </button>
            <span className="w-12 text-center text-xs font-medium text-muted-foreground">
              {Math.round(zoom * 100)}%
            </span>

            <span className="mx-1 h-6 w-px bg-border" aria-hidden="true" />

            <button
              type="button"
              onClick={goFirst}
              aria-label="Ke halaman pertama"
              title="Ke halaman pertama"
              className={controlButtonClass(currentPage === 0)}
            >
              <ChevronsLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Halaman sebelumnya"
              title="Halaman sebelumnya"
              className={controlButtonClass()}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Halaman berikutnya"
              title="Halaman berikutnya"
              className={controlButtonClass()}
            >
              <ChevronRight className="size-4" />
            </button>
            <button
              type="button"
              onClick={goLast}
              aria-label="Ke halaman terakhir"
              title="Ke halaman terakhir"
              className={controlButtonClass(currentPage === pageCount - 1)}
            >
              <ChevronsRight className="size-4" />
            </button>

            <span className="mx-1 h-6 w-px bg-border" aria-hidden="true" />

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-xs font-semibold text-foreground">
                Halaman <span className="text-primary">{currentLabel}</span> /{" "}
                {pageCount}
              </span>
              <input
                type="range"
                min={1}
                max={pageCount}
                value={currentLabel}
                onChange={(e) => goToPage(Number(e.target.value) - 1)}
                aria-label="Geser halaman"
                className="h-1.5 w-28 cursor-pointer appearance-none rounded-full bg-primary/30 accent-primary sm:w-40"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowShare((v) => !v)}
                aria-label="Bagikan katalog"
                title="Bagikan katalog"
                className={controlButtonClass(showShare)}
              >
                <Share2 className="size-4" />
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Mode layar penuh"
                title="Mode layar penuh"
                className={controlButtonClass(isFullscreen)}
              >
                {isFullscreen ? (
                  <Minimize className="size-4" />
                ) : (
                  <Maximize className="size-4" />
                )}
              </button>
            </div>
          </div>

          {showToc && (
            <div className="grid gap-1 rounded-xl border border-primary/20 bg-white p-3 sm:grid-cols-2">
              {toc.map((item) => {
                const active = item.page - 1 === currentPage;
                return (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => {
                      goToPage(item.page - 1);
                      setShowToc(false);
                    }}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      active
                        ? "bg-primary font-semibold text-primary-foreground"
                        : "text-foreground hover:bg-primary/10 hover:text-primary",
                    )}
                  >
                    <span className="truncate">{item.title}</span>
                    <span
                      className={cn(
                        "shrink-0 text-xs font-bold",
                        active ? "text-primary-foreground" : "text-primary",
                      )}
                    >
                      {item.page}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {showShare && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-primary/20 bg-white p-3">
              {shareLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: link.color }}
                    aria-hidden="true"
                  />
                  {link.label}
                  <ExternalLink className="size-3 text-muted-foreground" />
                </a>
              ))}
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {copied ? (
                  <Check className="size-3" />
                ) : (
                  <Copy className="size-3" />
                )}
                {copied ? "Tersalin!" : "Salin Tautan"}
              </button>
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground">
            Klik ujung halaman, gunakan tombol navigasi, atau tautan #page/N
            untuk membuka halaman tertentu.
          </p>
        </div>
      </div>
    </div>
  );
}
