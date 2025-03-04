import { FiUser, FiLogIn } from "react-icons/fi";
import Logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { authContext } from "../../context/index";

export function Header() {
  const { signed } = useContext(authContext);
  const isLoading = false;
  const navigate = useNavigate();

  async function logOut() {
    await signOut(auth).then(() => {
      navigate("/login");
    });
  }

  return (
    <div className="w-full shadow bg-white px-5">
      <header className="flex items-center justify-between w-full m-auto h-14">
        <Link to="/">
          <img src={Logo} alt="Imagem de Logo" />
        </Link>

        {!isLoading && signed && (
          <div className="flex gap-4">
            <div className="border-black border-2	rounded-full">
              <Link to="/dashboard">
                <FiUser size={22} />
              </Link>
            </div>
            <span
              className="bg-red-600 text-white px-2 rounded-lg cursor-pointer"
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
