import { ChangeEvent, useContext, useState } from "react";
import { storage } from "../../../services/firebaseConnection";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../services/firebaseConnection";

import { Container } from "../../../Components/Container";
import { DashboardHeader } from "../../../Components/DashboardHeader";
import { Input } from "../../../Components/Inputs";
import { Loading } from "../../../Components/Loading";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { FiUpload, FiTrash } from "react-icons/fi";
import { authContext } from "../../../context";

import { v4 as uuidV4 } from "uuid";

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

interface ImageProps {
  name: string;
  uid: string;
  url: string;
}

export function NewCar() {
  const { user, loading, setLoading } = useContext(authContext);
  const [imageUrls, setImageUrls] = useState<ImageProps[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    console.log(data);
    const newCar = {
      uid: user?.uid,
      images: imageUrls,
      carName: data.carName,
      model: data.model,
      year: data.year,
      km: data.km,
      price: data.price,
      city: data.city,
      whatsapp: data.whatsapp,
      description: data.description,
    };

    const carRef = collection(db, "cars");
    await addDoc(carRef, newCar)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    reset();
  }

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0];
      if (image.type === "image/png" || image.type === "image/jpeg") {
        sendImage(image);
      } else {
        alert("Envie uma imagem do tipo PNG ou JPEG");
      }
    }
  }

  async function sendImage(image: File) {
    if (!user) {
      console.log("Usuário não autenticado");
      return;
    }

    const currentUser = user.uid;
    const imageName = uuidV4();
    const imageRef = ref(storage, `images/${currentUser}/${imageName}`);

    await uploadBytes(imageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const newImage = {
            name: imageName,
            uid: currentUser,
            url: url,
          };
          setImageUrls([...imageUrls, newImage]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleDelete(image: ImageProps) {
    const imageRef = ref(storage, `images/${image.uid}/${image.name}`);
    setLoading(true);
    await deleteObject(imageRef)
      .then(() => {
        setImageUrls(imageUrls.filter((img) => img.name !== image.name));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <Container>
      {loading && <Loading />}
      <DashboardHeader />

      <div className="bg-white rounded-lg mb-4 flex justify-start w-full p-3 gap-4">
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
              onChange={handleImage}
            />
          </div>
        </button>
        {imageUrls.map((image) => (
          <div
            key={image.name}
            className="relative flex justify-center items-center"
          >
            <button className="absolute" onClick={() => handleDelete(image)}>
              <FiTrash color="#FFF" size={20} />
            </button>
            <img src={image.url} className="w-48 h-32 object-cover" />
          </div>
        ))}
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
