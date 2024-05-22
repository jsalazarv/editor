import { NavLink } from 'react-router-dom';
import LogoImg from '@assets/images/hormas-logo.svg';

interface ILogoProps {
  to?: string;
  logo?: string;
  width?: number;
  height?: number;
  alt?: string;
}

export default function Logo({
  to = '/',
  logo = LogoImg,
  width = 100,
  height = 100,
  alt = 'Hormas',
}: ILogoProps) {
  return (
    <NavLink className="inline-flex" to={to} aria-label="logo">
      <img
        className="max-w-none"
        src={logo}
        width={width}
        height={height}
        alt={alt}
      />
    </NavLink>
  );
}
