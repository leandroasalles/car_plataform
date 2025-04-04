import { useEffect, useState, useContext } from "react";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

import { authContext } from "../../context";

import { Container } from "../../Components/Container";
import { CardCar } from "../../Components/CarCard";
import { ModalDetails } from "../../Components/ModalDetails";

export function Home() {
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

  const { openModal, setOpenModal } = useContext(authContext);
  const [listCar, setListCart] = useState<CarProps[]>([]);
  const [carClicked, setCarClicked] = useState<CarProps>();

  useEffect(() => {
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
        setListCart(carList);
      });
    }

    loadCars();
  });

  function handleCarClick(car: CarProps) {
    setCarClicked(car);
    setOpenModal(true);
  }

  return (
    <Container>
      {openModal && (
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
      <section className="w-full flex max-w-2xl m-auto my-5">
        <input
          className="h-9 p-2 bg-white rounded-lg outline-none w-full"
          type="text"
          placeholder="Digite o nome do carro..."
        />
        <button className="bg-red-500 h-9 px-3 rounded-lg text-white mx-2">
          Buscar
        </button>
      </section>
      <h1 className="text-center mb-5 font-bold text-xl">
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
