import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchProductCategories } from "../services/product.service";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const Collection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchProductCategories();
        console.log("Fetched categories:", data);
        setCategories(data?.payload);
      } catch (error) {
        setCategories([]);
        toast.error(error?.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  return (
    <section className="w-full bg-white md:px-10 px-4 py-20">
      <h1 className="font-[Publicko] font-[300] text-[#242222] text-5xl">
        Our Collections
      </h1>

      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-x-6 md:gap-y-12 gap-y-12 mt-10">
        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="overflow-hidden group relative cursor-pointer animate-pulse"
            >
              <div className="relative h-100 overflow-hidden px-10 flex items-center justify-center bg-gray-200 rounded-md min-h-[220px]">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-skeleton" />
              </div>
              <div className="flex flex-col w-[90%] absolute bottom-5 py-2 items-center justify-center bg-white/80">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : categories.length > 0 ? (
          categories.map((cat, idx) => (
            <div
              key={cat._id || idx}
              className="overflow-hidden group relative cursor-pointer"
            >
              <div className="relative h-100 overflow-hidden px-10 flex items-center justify-center">
                <Image
                  src={cat?.image || "/tiles.png"}
                  alt={cat?.name || "Category"}
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
                <div className="flex flex-col w-[90%] absolute bottom-5 py-2 items-center justify-center bg-white/80">
                  <p className="relative text-center font-semibold text-[#242222]">
                    {cat?.name}
                  </p>
                  <p className="relative text-center text-sm font-semibold text-[#424242]">
                    {cat?.productCount} product(s)
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No categories found.
          </p>
        )}
      </div>
    </section>
  );
};

export default Collection;
