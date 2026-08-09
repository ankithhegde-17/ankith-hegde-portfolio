import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

type RevealProps<T extends ElementType> = {
  as?: T;
  index?: number;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/**
 * Polymorphic wrapper that applies the same fade/slide-in-on-scroll
 * treatment the original design gave elements marked `data-reveal`.
 * Renders as `as` (default "div") with no extra DOM wrapper otherwise.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  index = 0,
  children,
  style,
  ...rest
}: RevealProps<T>) {
  const Tag = (as || "div") as ElementType;
  const { ref, style: revealStyle } = useReveal<HTMLElement>(index);

  return (
    <Tag ref={ref} style={{ ...revealStyle, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
