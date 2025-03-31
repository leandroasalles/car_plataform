import { useState } from "react";

interface Car {
  id: string;
  images: { url: string }[];
  carName: string;
  year: number;
  km: number;
  price: number;
  city: string;
}

export function CardCar({ car }: { car: Car }) {
  const [Ids, setIds] = useState<string[]>([]);

  function handleLoadImage(id: string) {
    setIds((Ids) => [...Ids, id]);
  }

  return (
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
  );
}
