import { useContext, useEffect, useState } from "react";

import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

import { Container } from "../../Components/Container";
import { DashboardHeader } from "../../Components/DashboardHeader";
import { CardCar } from "../../Components/CarCard";

import { authContext } from "../../context";

export function Dashboard() {
  const { user } = useContext(authContext);
  const [listCar, setListCart] = useState<CarProps[]>([]);

  interface CarProps {
    carName: string;
    year: number;
    city: string;
    images: [];
    km: number;
    price: number;
    id: string;
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
            id: doc.id,
          });
        });
        setListCart(carList);
      });
    }
    loadCars();
  }, []);

  return (
    <Container>
      <DashboardHeader />

      <main className="grid gap-6 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 w-full px-2">
        {listCar.map((car: any) => (
          <CardCar car={car} />
          // <section
          //   key={car.id}
          //   className="bg-white rounded-lg mb-4 max-w-80 w-full mx-auto cursor-pointer hover:scale-105 transition-all"
          // >

          //   <div
          //     className="w-full rounded-lg h-60 bg-slate-300"
          //     style={{ display: Ids.includes(car.id) ? "none" : "block" }}
          //   ></div>
          //   <img
          //     className="w-full rounded-lg max-h-72 "
          //     src={car.images[0].url}
          //     alt={car.carName}
          //     onLoad={() => handleLoadImage(car.id)}
          //   />
          //   <div className="p-3">
          //     <h1 className="font-bold">{car.carName}</h1>
          //     <p className="text-zinc-400">
          //       {car.year} | {car.km} km
          //     </p>
          //     <div className="mt-4">
          //       <strong className="text-xl">R$ {car.price}</strong>
          //       <div className="h-px bg-slate-300 my-2 w-full"></div>
          //       <p className="text-xs text-zinc-400">{car.city}</p>
          //     </div>
          //   </div>
          // </section>
        ))}
      </main>
    </Container>
  );
}
