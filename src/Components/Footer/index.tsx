import { FaRegCopyright } from "react-icons/fa6";
import Logo from "../../assets/logo.svg";

export function Footer() {
  return (
    <div className="w-full shadow bg-white fixed bottom-0">
      <footer className="w-full max-w-7xl mx-auto h-10 md:h-20 flex flex-col items-center justify-center	">
        <img
          className="w-28 mb-2 hidden md:block"
          src={Logo}
          alt="Imagem de logo"
        />
        <div className="flex items-center">
          <FaRegCopyright size={18} className="mr-1 max-w-3 md:max-w-none" />
          <span className="text-xs md:text-base">
            2025 Webcarros - Todos os direitos reservados
          </span>
        </div>
      </footer>
    </div>
  );
}
