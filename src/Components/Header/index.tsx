import { FiUser, FiLogIn } from "react-icons/fi";
import Logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { authContext } from "../../context/index";

export function Header() {
  const { signed, setUser } = useContext(authContext);
  const isLoading = false;
  const navigate = useNavigate();

  async function logOut() {
    await signOut(auth).then(() => {
      setUser(null);
      navigate("/login");
    });
  }

  return (
    <div className="w-full shadow bg-white px-5">
      <header className="flex items-center justify-between w-full m-auto h-14">
        <Link to="/">
          <img
            className="max-w-24 md:max-w-none"
            src={Logo}
            alt="Imagem de Logo"
          />
        </Link>

        {!isLoading && signed && (
          <div className="flex gap-1 md:gap-4">
            <div className="border-black border-2	rounded-full">
              <Link to="/dashboard">
                <FiUser size={22} />
              </Link>
            </div>
            <span
              className="bg-red-600 hover:bg-red-700 duration-100 text-white px-5 rounded-lg cursor-pointer"
              onClick={logOut}
            >
              Sair
            </span>
          </div>
        )}

        {!isLoading && !signed && (
          <Link to="/login">
            <FiLogIn size={22} />
          </Link>
        )}
      </header>
    </div>
  );
}
