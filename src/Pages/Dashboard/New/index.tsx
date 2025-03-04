import { Container } from "../../../Components/Container";
import { DashboardHeader } from "../../../Components/DashboardHeader";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../../Components/Inputs";

const schema = yup.object().shape({
  carName: yup.string().required("Nome do carro é obrigatório!"),
  model: yup.string().required("Modelo do carro é obrigatório!"),
  year: yup
    .string()
    .required("O ano é obrigatório!")
    .min(4, "O ano deve ter 4 caracteres"),
  km: yup.string().required("KM é obrigatório!"),
  price: yup.string().required("Valor é obrigatório!"),
  city: yup.string().required("Cidade é obrigatória!"),
  whatsapp: yup.string().required("Whatsapp é obrigatório!"),
  description: yup
    .string()
    .required("Descrição é obrigatória!")
    .min(100, "Mínimo de 100 caracteres!"),
});

type FormData = yup.InferType<typeof schema>;

export function NewCar() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
    reset();
  }

  return (
    <Container>
      <DashboardHeader />

      <div className="bg-white rounded-lg mb-4 flex flex-col justify-center w-full p-3 gap-4">
        <button className="w-48 cursor-pointer flex items-center justify-center border-2 border-gray-500 h-32 rounded-lg">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              type="file"
              name=""
              id=""
              className=" opacity-0 cursor-pointer"
            />
          </div>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg mb-4 flex flex-col justify-center w-full p-3 gap-4">
          <div className="flex flex-col">
            <label htmlFor="carName" className="font-semibold">
              Nome do carro
            </label>
            <Input
              type="text"
              name="carName"
              register={register}
              error={errors.carName?.message}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="model" className="font-semibold">
              Modelo
            </label>
            <Input
              type="text"
              name="model"
              register={register}
              error={errors.model?.message}
            />
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col w-full max-w-3xl">
              <label htmlFor="year" className="font-semibold">
                Ano
              </label>
              <Input
                type="text"
                name="year"
                register={register}
                error={errors.year?.message}
              />
            </div>
            <div className="flex flex-col w-full max-w-3xl">
              <label htmlFor="km" className="font-semibold">
                Km rodados
              </label>
              <Input
                type="text"
                name="km"
                register={register}
                error={errors.km?.message}
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="price" className="font-semibold">
              Valor em R$
            </label>
            <Input
              type="text"
              name="price"
              register={register}
              error={errors.price?.message}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="city" className="font-semibold">
              Cidade
            </label>
            <Input
              type="text"
              name="city"
              register={register}
              error={errors.city?.message}
            />
          </div>
          <div className="flex flex-col w-full max-w-3xl">
            <label htmlFor="Whatsapp" className="font-semibold">
              Whatsapp
            </label>
            <Input
              type="text"
              name="whatsapp"
              register={register}
              error={errors.whatsapp?.message}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="city" className="font-semibold">
              Descrição
            </label>
            <input
              type="text"
              id="description"
              className="rounded-lg w-full p-2 outline-none border-2 border-slate-200 h-20"
              {...register("description")}
            />
            {errors.description && (
              <p className="w-full text-red-600	text-xs	">
                {errors.description?.message}
              </p>
            )}
          </div>
          <button
            className="bg-black text-white py-2 rounded-lg mt-4"
            type="submit"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </Container>
  );
}
