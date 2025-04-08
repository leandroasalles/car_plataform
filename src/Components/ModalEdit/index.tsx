import { useContext, useState } from "react";
import { authContext } from "../../context";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { FiX } from "react-icons/fi";
import { Input } from "../Inputs";
import { TextArea } from "../Textarea";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CarProps {
  images: { url: string }[];
  carName: string;
  year: number;
  price: number;
  city: string;
  model: string;
  description: string;
}

const schema = yup.object().shape({
  carName: yup.string().required("Nome do carro é obrigatório!"),
  model: yup.string().required("Modelo do carro é obrigatório!"),
  year: yup
    .string()
    .required("O ano é obrigatório!")
    .min(4, "O ano deve ter 4 caracteres"),
  price: yup.string().required("Valor é obrigatório!"),
  city: yup.string().required("Cidade é obrigatória!"),
  description: yup
    .string()
    .required("Descrição é obrigatória!")
    .min(100, "Mínimo de 100 caracteres!"),
});

type FormData = yup.InferType<typeof schema>;

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  function closeModal() {
    setOpenEditModal(false);
  }

  function onsubmit(data: FormData) {
    console.log(data);
  }

  function handlerDelete() {
    console.log("deletou");
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-700/60 flex justify-center items-center z-10">
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
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="flex flex-col p-4">
            <div className="flex justify-between">
              <Input
                type="text"
                name="carName"
                register={register}
                error={errors.carName?.message}
                defaultValue={carName}
              />
              <Input
                type="text"
                name="price"
                register={register}
                error={errors.price?.message}
                defaultValue={price}
              />
            </div>
            <Input
              type="text"
              name="model"
              register={register}
              error={errors.model?.message}
              defaultValue={model}
            />
            <div className="flex gap-7">
              <div className="mb-5">
                <p className="font-bold">Cidade</p>
                <Input
                  type="text"
                  name="city"
                  register={register}
                  error={errors.city?.message}
                  defaultValue={city}
                />
              </div>
              <div>
                <p className="font-bold">Ano</p>
                <Input
                  type="text"
                  name="year"
                  register={register}
                  error={errors.year?.message}
                  defaultValue={year}
                />
              </div>
            </div>
            <div className="mb-2">
              <p className="font-bold">Descrição</p>
              <TextArea
                name="description"
                register={register}
                error={errors.description?.message}
                defaultValue={description}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 duration-100 grow rounded-lg h-9 text-white"
              >
                Atualizar informações
              </button>
              <button
                onClick={handlerDelete}
                className="grow-0 rounded-lg h-9 bg-red-600 hover:bg-red-700 duration-100 text-white px-6"
              >
                Excluir
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
