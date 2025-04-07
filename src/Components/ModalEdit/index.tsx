import { useContext, useState } from "react";
import { authContext } from "../../context";

import { FiX } from "react-icons/fi";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CarProps {
  images?: { url: string }[];
  carName?: string;
  year?: number;
  price?: number;
  city?: string;
  model?: string;
  description?: string;
}

export function ModalEdit({
  images,
  carName,
  year,
  price,
  city,
  model,
  description,
}: CarProps) {
  const { setOpenEditModal } = useContext(authContext);
  const [slidesPerView, setSlidesPerView] = useState<number>(2);

  function handleClick() {
    const message = `Olá, vi o anúncio do carro ${carName} e gostaria de mais informações!`;
    window.open(
      `https://api.whatsapp.com/send?phone=5531996101036&text=${message}`
    );
  }

  function closeModal() {
    setOpenEditModal(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-700/60 flex justify-center items-center">
      <div className="bg-slate-50 z-100 max-w-xl break-words rounded-lg relative">
        <FiX
          size={25}
          className="absolute m-1 right-0 cursor-pointer hover:text-red-500 z-10"
          onClick={closeModal}
        />
        <div>
          <Swiper
            pagination={true}
            navigation={true}
            modules={[Pagination]}
            slidesPerView={slidesPerView}
          >
            {images &&
              images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image.url}
                    className="w-full h-60 object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="flex flex-col p-4">
          <div className="flex justify-between">
            <input
              type="text"
              name=""
              id=""
              value={carName}
              className="border max-w-[40%] p-1"
            />
            {/* <span className="text-2xl font-bold">{carName}</span> */}
            {/* <span className="text-2xl font-bold">{price}</span> */}
            <input
              type="text"
              name=""
              id=""
              value={price}
              className="max-w-[40%] p-1"
            />
          </div>
          {/* <span className="mb-5">{model}</span> */}
          <input type="text" name="" id="" value={model} className="p-1 my-2" />
          <div className="flex gap-7">
            <div className="mb-5">
              <p className="font-bold">Cidade</p>
              <input type="text" name="" id="" value={city} className="p-1" />
              {/* <p>{city}</p> */}
            </div>
            <div>
              <p className="font-bold">Ano</p>
              {/* <p>{year}</p> */}
              <input type="text" name="" id="" value={year} className="p-1" />
            </div>
          </div>
          <div className="mb-2">
            <p className="font-bold">Descrição</p>
            <textarea
              name=""
              id=""
              value={description}
              className="p-1 w-full h-24 resize-none"
            ></textarea>
            {/* <p className="w-full">{description}</p> */}
          </div>
          <div className="flex gap-2">
            <button className="bg-green-600 grow rounded-lg h-9 text-white">
              Atualizar informações
            </button>
            <button className="grow-0 rounded-lg h-9 bg-red-600 text-white px-6">
              Excluir
            </button>
          </div>
          {/* <button
            onClick={() => handleClick()}
            className="bg-green-600 w-full rounded-lg h-9"
          >
            Enviar Whatsapp
          </button> */}
        </div>
      </div>
    </div>
  );
}
