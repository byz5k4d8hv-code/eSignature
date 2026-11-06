import type { SVGAttributes } from 'react';

export type LogoProps = SVGAttributes<SVGSVGElement>;

export const BrandingLogoIcon = ({ ...props }: LogoProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84" role="img" aria-label="CodSign" {...props}>
      <image href="/static/codsign-icon.png" x="0" y="0" width="84" height="84" />
    </svg>
  );
};
