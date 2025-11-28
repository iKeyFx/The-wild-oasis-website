import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  return (
    <div className="grid md:grid-cols-[3fr_4fr] gap-3 md:gap-20 border border-primary-800 py-3 px-10 mb-24">
      {/* <div className="relative md:scale-[1.15] md:-translate-x-3">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover"
        />
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-contain"
        />
      </div> */}
      <div className="relative w-full scale-[1.4] aspect-video md:aspect-auto  md:scale-[1.15] md:-translate-x-3">
        <Image src={image} alt={`Cabin ${name}`} fill className="w-full" />
      </div>

      <div>
        <h3 className="text-accent-100 font-black text-2xl translate-y-[-2px] p-2 w-[120%] md:text-7xl mb-5 md:translate-x-[-254px] bg-primary-950 md:p-6 pb-1 md:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
