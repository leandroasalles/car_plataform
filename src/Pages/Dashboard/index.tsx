import { useContext, useEffect, useState } from "react";

import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

import { Container } from "../../Components/Container";
import { DashboardHeader } from "../../Components/DashboardHeader";
// import { CardCar } from "../../Components/CarCard";
import { ModalEdit } from "../../Components/ModalEdit";

import { authContext } from "../../context";

export function Dashboard() {
  const { user, openEditModal, setOpenEditModal } = useContext(authContext);
  const [listCar, setListCart] = useState<CarProps[]>([]);
  const [Ids, setIds] = useState<string[]>([]);
  const [carClicked, setCarClicked] = useState<CarProps>();

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

  useEffect(() => {
    function loadCars() {
      let carList: CarProps[] = [];

      const q = query(collection(db, "cars"), where("uid", "==", user?.uid));
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
  }, []);

  function handleLoadImage(id: string) {
    setIds((Ids) => [...Ids, id]);
  }

  function handleCarClick(car: CarProps) {
    setCarClicked(car);
    setOpenEditModal(true);
  }

  return (
    <Container>
      <DashboardHeader />

      <main className="grid gap-6 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 w-full px-2">
        {openEditModal && (
          <ModalEdit
            images={carClicked?.images}
            carName={carClicked?.carName}
            year={carClicked?.year}
            price={carClicked?.price}
            city={carClicked?.city}
            model={carClicked?.model}
            description={carClicked?.description}
            id={carClicked?.id}
          />
        )}
        {listCar.map((car: any) => (
          <section
            key={car.id}
            className="bg-white rounded-lg mb-4 max-w-80 w-full mx-auto cursor-pointer hover:scale-105 transition-all"
            onClick={() => handleCarClick(car)}
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
