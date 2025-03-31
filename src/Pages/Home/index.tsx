import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

import { Container } from "../../Components/Container";
import { useEffect, useState } from "react";

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
  const [Ids, setIds] = useState<string[]>([]);

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

  function handleLoadImage(id: string) {
    setIds((Ids) => [...Ids, id]);
  }

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
          <section
            key={car.id}
            className="bg-white rounded-lg mb-4 max-w-80 w-full mx-auto cursor-pointer hover:scale-105 transition-all"
          >
            <div
              className="w-full rounded-lg h-60 bg-slate-300"
              style={{ display: Ids.includes(car.id) ? "none" : "block" }}
            ></div>
            <img
              className="w-full rounded-lg max-h-72 "
              src={car.images[0].url}
              alt={car.carName}
              onLoad={() => handleLoadImage(car.id)}
            />
            <div className="p-3">
              <h1 className="font-bold">{car.carName}</h1>
              <p className="text-zinc-400">
                {car.year} | {car.km} km
              </p>
              <div className="mt-4">
                <strong className="text-xl">R$ {car.price}</strong>
                <div className="h-px bg-slate-300 my-2 w-full"></div>
                <p className="text-xs text-zinc-400">{car.city}</p>
              </div>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
}
