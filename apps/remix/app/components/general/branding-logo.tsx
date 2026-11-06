import type { SVGAttributes } from 'react';

export type LogoProps = SVGAttributes<SVGSVGElement>;

/**
 * CodSign logo: app icon + wordmark. The wordmark uses `currentColor`
 * so it follows the text colour in light and dark mode.
 */
export const BrandingLogo = ({ ...props }: LogoProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1320 320" role="img" aria-label="CodSign" {...props}>
      <image href="/static/codsign-icon.png" x="0" y="0" width="320" height="320" />
      <text
        x="370"
        y="240"
        fill="currentColor"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        fontSize="230"
        fontWeight="700"
        letterSpacing="-6"
      >
        CodSign
      </text>
    </svg>
  );
};
