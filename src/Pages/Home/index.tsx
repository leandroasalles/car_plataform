import { Container } from "../../Components/Container";

export function Home() {
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

      <main className="grid gap-6 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full">
        <section className="bg-white rounded-lg mb-4 max-w-80 w-full mx-auto">
          <img
            className="w-full rounded-lg max-h-72 hover:scale-105 transition-all"
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202410/20241029/volvo-xc40-p6-recharge-electric-plus-wmimagem09533140654.jpg?s=fill&w=249&h=186&q=70"
            alt="Carro elétrico"
          />
          <div className="p-3">
            <h1 className="font-bold">Carro elétrico</h1>
            <p className="text-zinc-400">Modelo: 2024 | 200.000 km</p>
            <div className="mt-4">
              <strong className="text-xl">R$ 190.000,00</strong>
              <div className="h-px bg-slate-300 my-2 w-full"></div>
              <p className="text-xs text-zinc-400">Belo Horizonte - MG</p>
            </div>
          </div>
        </section>
      </main>
    </Container>
  );
}
