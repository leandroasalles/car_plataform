import { FaRegCopyright } from "react-icons/fa6";
import Logo from "../../assets/logo.svg";

export function Footer() {
  return (
    <div className="w-full shadow bg-white bottom-*">
      <footer className="w-full max-w-7xl m-auto h-20 flex flex-col	items-center justify-center	py-2.5">
        <img className="w-28 mb-2" src={Logo} alt="Imagem de logo" />
        <div className="flex items-center">
          <FaRegCopyright size={18} className="mr-2" />
          <span>2025 Webcarros - Todos os direitos reservados</span>
        </div>
      </footer>
    </div>
  );
}
