import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "../../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import Logo from "../../assets/logo.svg";
import { Input } from "../../Components/Inputs";

const validation = yup.object().shape({
  email: yup
    .string()
    .email("Digite um e-mail válido!")
    .required("O campo de e-mail é obrigatório!"),
  name: yup
    .string()
    .required("O campo de nome é obrigatório!")
    .min(10, "Digite no mínimo 10 letras!"),
  password: yup
    .string()
    .required("O campo de Senha é obrigatório!")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
      "Senha deve contar no mínimo 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial!"
    ),
});

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        navigate("/dashboard", { replace: true });
        updateProfile(user.user, {
          displayName: data.name,
        });
        console.log("User criado com sucesso");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
  }),
    [];

  return (
    <div>
      <main className="flex flex-col justify-center items-center w-full min-h-screen gap-4">
        <Link to="/">
          <img
            className="max-w-52 sm:w-96 sm:max-w-96"
            src={Logo}
            alt="Imagem de logo"
          />
        </Link>
        <section className="  w-full flex items-center justify-center mb-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-2xl flex flex-col p-5 rounded-lg items-center justify-center gap-3 bg-white"
          >
            <div className="w-full">
              <Input
                type="text"
                placeholder="Digite seu nome completo..."
                name="name"
                register={register}
                error={errors.name?.message}
              />
            </div>
            <div className="w-full">
              <Input
                type="email"
                placeholder="Digite seu e-mail..."
                name="email"
                register={register}
                error={errors.email?.message}
              />
            </div>
            <div className="w-full">
              <Input
                type="´password"
                placeholder="Digite sua senha..."
                name="password"
                register={register}
                error={errors.password?.message}
              />
            </div>
            <button
              className="rounded-lg h-11 bg-black text-white w-full"
              type="submit"
            >
              Cadastrar
            </button>
          </form>
        </section>
        <Link to="/login">Ja possui uma conta? Acesse</Link>
      </main>
    </div>
  );
}
