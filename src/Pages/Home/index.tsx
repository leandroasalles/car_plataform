import { useEffect, useState, useContext } from "react";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

import { authContext } from "../../context";

import { Container } from "../../Components/Container";
import { CardCar } from "../../Components/CarCard";
import { ModalDetails } from "../../Components/ModalDetails";
import { FiX } from "react-icons/fi";

interface CarProps {
  carName: string;
  year: number;
  city: string;
  images: [];
  km: number;
  price: number;
  id: string;
  model: string;
  description: string;
}

export function Home() {
  const { openDetailModal, setOpenDetailModal } = useContext(authContext);
  const [listCar, setListCar] = useState<CarProps[]>([]);
  const [carClicked, setCarClicked] = useState<CarProps>();
  const [searchText, setSearchText] = useState<string>("");
  const [showTag, setShowTag] = useState<boolean>(false);

  useEffect(() => {
    loadCars();
  }, []);

  function loadCars() {
    let carList: CarProps[] = [];

    const q = query(collection(db, "cars"));
    const querySnapshot = getDocs(q);
    querySnapshot.then((snapshot) => {
      snapshot.forEach((doc) => {
        carList.push({
          carName: doc.data().carName,
          year: doc.data().year,
          city: doc.data().city,
          images: doc.data().images,
          km: doc.data().km,
          price: doc.data().price,
          model: doc.data().model,
          description: doc.data().description,
          id: doc.id,
        });
      });
      setListCar(carList);
      setShowTag(false);
      setSearchText("");
    });
  }

  function handleCarClick(car: CarProps) {
    setCarClicked(car);
    setOpenDetailModal(true);
  }

  function searchCar(searchText: string) {
    if (searchText === "") {
      loadCars();
      return;
    }
    const filteredCars = listCar.filter((car) =>
      car.carName.toLowerCase().includes(searchText.toLowerCase())
    );
    setListCar(filteredCars);
    setShowTag(true);
  }

  return (
    <Container>
      {openDetailModal && (
        <ModalDetails
          images={carClicked?.images}
          carName={carClicked?.carName}
          year={carClicked?.year}
          price={carClicked?.price}
          city={carClicked?.city}
          model={carClicked?.model}
          description={carClicked?.description}
        />
      )}
      <div className="flex flex-col items-center justify-center w-full max-w-2xl m-auto my-5">
        <section className="w-full flex">
          <input
            className="h-7 md:h-9 p-2 bg-white rounded-lg outline-none w-full mr-2 text-sm md:text-base"
            type="text"
            placeholder="Digite o nome do carro..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-red-500 h-7 md:h-9 px-3 rounded-lg text-white mx-2"
            onClick={() => searchCar(searchText)}
          >
            Buscar
          </button>
        </section>
        {showTag && (
          <div className="mr-auto flex items-center justify-center gap-1 mt-2 bg-slate-400 px-2 rounded-xl text-sm h-5">
            <p className="text-white">{searchText}</p>
            <FiX
              className="cursor-pointer text-white"
              size={14}
              onClick={() => loadCars()}
            />
          </div>
        )}
      </div>
      <h1 className="text-center mb-5 font-bold text-lg md:text-xl">
        Carros novos e usados em todo Brasil
      </h1>

      <main className="grid gap-6 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 w-full px-2">
        {listCar.map((car: CarProps) => (
          <CardCar
            key={car.id}
            car={{ ...car, onclick: () => handleCarClick(car) }}
          />
        ))}
      </main>
    </Container>
  );
}
