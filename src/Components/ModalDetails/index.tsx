import { useContext } from "react";
import { authContext } from "../../context";

import { FiX } from "react-icons/fi";

interface CarProps {
  images?: { url: string }[];
  carName?: string;
  year?: number;
  price?: number;
  city?: string;
  model?: string;
  description?: string;
}

export function ModalDetails({
  images,
  carName,
  year,
  price,
  city,
  model,
  description,
}: CarProps) {
  const { setOpenModal } = useContext(authContext);

  function handleClick() {
    const message = `Olá, vi o anúncio do carro ${carName} e gostaria de mais informações!`;
    window.open(
      `https://api.whatsapp.com/send?phone=5531996101036&text=${message}`
    );
  }

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <div className="fixed bg-slate-300 z-50 max-w-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 break-words rounded-lg">
      <FiX
        size={25}
        className="absolute right-0 m-1 cursor-pointer hover:text-red-500"
        onClick={closeModal}
      />
      <div>
        <img
          src={images && images ? images[0].url : ""}
          className="max-h-60 rounded-lg"
        />
      </div>
      <div className="flex flex-col p-4">
        <div className="flex justify-between">
          <span className="text-2xl font-bold">{carName}</span>
          <span className="text-2xl font-bold">{price}</span>
        </div>
        <span className="mb-5">{model}</span>
        <div className="flex gap-7">
          <div className="mb-5">
            <p className="font-bold">Cidade</p>
            <p>{city}</p>
          </div>
          <div>
            <p className="font-bold">Ano</p>
            <p>{year}</p>
          </div>
        </div>
        <div className="mb-5">
          <p className="font-bold">Descrição</p>
          <p className="w-full">{description}</p>
        </div>
        <button
          onClick={() => handleClick()}
          className="bg-green-600 w-full rounded-lg h-9"
        >
          Enviar Whatsapp
        </button>
      </div>
    </div>
  );
}
