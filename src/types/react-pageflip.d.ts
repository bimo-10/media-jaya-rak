declare module "react-pageflip" {
  import { Component, CSSProperties, ReactNode, RefAttributes } from "react";

  export interface PageFlipInstance {
    getPageCount(): number;
    getCurrentPageIndex(): number;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    flip(pageNum: number, corner?: "top" | "bottom"): void;
  }

  export interface HTMLFlipBookProps {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    swipeDistance?: number;
    clickEventForward?: boolean;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    onFlip?: (e: { data: number }) => void;
    onChangeOrientation?: (e: { data: string }) => void;
    onChangeState?: (e: { data: string }) => void;
    onInit?: (e: { data: unknown }) => void;
    onUpdate?: (e: { data: unknown }) => void;
  }

  export default class HTMLFlipBook extends Component<
    HTMLFlipBookProps & RefAttributes<{ pageFlip(): PageFlipInstance }>
  > {}
}
