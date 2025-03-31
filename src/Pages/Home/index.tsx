import { useEffect, useState } from "react";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

import { Container } from "../../Components/Container";
import { CardCar } from "../../Components/CarCard";

export function Home() {
  interface CarProps {
    carName: string;
    year: number;
    city: string;
    images: [];
    km: number;
    price: number;
    id: string;
  }

  const [listCar, setListCart] = useState<CarProps[]>([]);

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
            id: doc.id,
          });
        });
        setListCart(carList);
      });
    }

    loadCars();
  });

  return (
    <Container>
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
        {listCar.map((car: any) => (
          <CardCar car={car} />
        ))}
      </main>
    </Container>
  );
}
