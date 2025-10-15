import { Banners } from "@/components/home/banners";
import { data } from "@/data";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Banners list={data.banners} />
      <section className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6 md:mt-12">
        <div className=" flex flex-1 py-6 border border-gray-200 rounded-sm">
          <div className="w-32 border-r border-gray-200 flex justify-center items-center">
            <Image src="/ui/truck-line.png" width={40} height={40} alt="Frete grátis" />
          </div>
          <div className="flex-1 pl-8">
            <p className="font-bold text-xl">Frete grátis</p>
            <span className="text-gray-500 text-sm">Para todo o Nordeste.</span>
          </div>
        </div>

        <div className=" flex flex-1 py-6 border border-gray-200 rounded-sm">
          <div className="w-32 border-r border-gray-200 flex justify-center items-center">
            <Image src="/ui/discount-percent-line.png" width={40} height={40} alt="Muitas ofertas" />
          </div>
          <div className="flex-1 pl-8">
            <p className="font-bold text-xl">Muitas ofertas</p>
            <span className="text-gray-500 text-sm">Ofertas imbatíveis.</span>
          </div>
        </div>

        <div className=" flex flex-1 py-6 border border-gray-200 rounded-sm">
          <div className="w-32 border-r border-gray-200 flex justify-center items-center">
            <Image src="/ui/arrow-left-right-line.png" width={40} height={40} alt="Troca fácil" />
          </div>
          <div className="flex-1 pl-8">
            <p className="font-bold text-xl">Troca fácil</p>
            <span className="text-gray-500 text-sm">No período de 30 dias.</span>
          </div>
        </div>
      </section>
    </>
  );
}
