import Image from "next/image";

const Collection = () => {
  return (
    <section className="w-full bg-white md:px-10 px-4 py-20">
      <h1 className="font-[Publicko] font-[300] text-[#242222] text-5xl">
        Our Collections
      </h1>

      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-x-5 md:gap-y-10 gap-y-12 mt-20">
        <div className="overflow-hidden group relative cursor-pointer">
          <div className="relative h-100 overflow-hidden">
            <Image
              src="/NYC Lobby - Terrazzo Flooring.jpeg"
              alt="image"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
            />
          </div>
          <p
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="relative mt-4 text-left text-2xl text-[#242222] font-[Publicko] "
          >
            Tiles – Glossy, Matte, Wood-Effect, Carving
          </p>
        </div>

        <div className="overflow-hidden group relative cursor-pointer">
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="relative h-100 overflow-hidden"
          >
            <Image
              src="/WC-S.jpg"
              alt="image"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <p
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="relative mt-4 text-left text-2xl text-[#242222] font-[Publicko] "
          >
            Sanitary Ware – WCs, Washbasins, Bidets
          </p>
        </div>

        <div className="overflow-hidden group relative cursor-pointer">
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="relative h-100 overflow-hidden"
          >
            <Image
              src="/shower.jpg"
              alt="image"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <p
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="relative mt-4 text-left text-2xl text-[#242222] font-[Publicko] "
          >
            Bathroom Fittings – Faucets, Accessories, Shower Systems
          </p>
        </div>

        <div className="overflow-hidden group relative cursor-pointer">
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="relative h-100 overflow-hidden"
          >
            <Image
              src="/bathroom-fittings.jpg"
              alt="image"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <p
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="relative mt-4 text-left text-2xl text-[#242222] font-[Publicko] "
          >
            Bathroom Furniture – Cabinets, Mirrors, Vanities
          </p>
        </div>

        <div className="overflow-hidden group relative cursor-pointer">
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="relative h-100 overflow-hidden"
          >
            <Image
              src="/bathtub.jpg"
              alt="image"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <p
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="relative mt-4 text-left text-2xl text-[#242222] font-[Publicko] "
          >
            Bathtubs & Jacuzzi – Luxury soaking and spa solutions
          </p>
        </div>

        <div className="overflow-hidden group relative cursor-pointer">
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="relative h-100 overflow-hidden"
          >
            <Image
              src="/kitchen.jpeg"
              alt="image"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <p
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="relative mt-4 text-left text-2xl text-[#242222] font-[Publicko] "
          >
            Kitchen Designs – Fully fitted modular kitchens with elegant
            finishings
          </p>
        </div>
      </div>
    </section>
  );
};

export default Collection;
