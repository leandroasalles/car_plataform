import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import Logo from "../../assets/logo.svg";
import { Input } from "../../Components/Inputs";
import Car from "../../assets/car.jpg";

export function Login() {
  const validation = yup.object().shape({
    email: yup
      .string()
      .email("Digite um e-mail válido!")
      .required("O campo de e-mail é obrigatório!"),
    password: yup.string().required("O campo de Senha é obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        toast.success("Login realizado com sucesso!");
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        if (err.code === "auth/invalid-credential") {
          toast.error("Usuário ou senha inválida!");
        }
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard", { replace: true });
      }
    });
  }),
    [];

  return (
    <div className="flex">
      <main className="flex flex-col justify-center items-center w-full min-h-screen gap-4 p-3">
        <Link to="/">
          <img
            className="max-w-52 sm:w-96 sm:max-w-96"
            src={Logo}
            alt="Imagem de logo"
          />
        </Link>
        <section className="w-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-2xl flex flex-col p-5 rounded-lg items-center justify-center gap-3 bg-white"
          >
            <div className="w-full">
              <Input
                type="email"
                placeholder="Digite seu e-mail..."
                id="email"
                error={errors.email?.message}
                register={register}
              />
            </div>
            <div className="w-full">
              <Input
                type="password"
                placeholder="Digite sua senha..."
                id="password"
                error={errors.password?.message}
                register={register}
              />
            </div>
            <button
              className="rounded-lg h-11 bg-black text-white w-full"
              type="submit"
            >
              Acessar
            </button>
          </form>
        </section>
        <Link to="/register">
          Ainda não possui uma conta?{" "}
          <strong className="text-blue-500">Cadastre-se!</strong>
        </Link>
      </main>
      <div className="hidden md:block bg-black h-screen w-full">
        <img
          className="h-full max-h-screen w-full object-cover"
          src={Car}
          alt=""
        />
      </div>
    </div>
  );
}
