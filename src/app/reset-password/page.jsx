import Link from "next/link";
import MainLayout from "../../components/MainLayout";

const SignIn = () => {
  return (
    <MainLayout>
      <section className="w-full md:px-25 px-5 bg-[#F0F0F0] pt-60 pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="md:text-5xl text-3xl !font-[300] text-[#242222] font-[Publicko] text-center leading-18">
            Reset Password
          </h1>

          <div className="w-full flex items-center justify-center py-10">
            <form className="flex flex-col gap-8 bg-[#F8F8F8] p-8 md:p-12 w-[650px]">
              <h2 className="text-xl md:text-3xl font-[Publicko] text-[#242222]">
                Reset Password
              </h2>
              <div className="border-b border-[#242222]/20 my-2"></div>
              <p className="text-[#242222] -mt-6">
                Enter your new password to reset it.
              </p>

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  required
                  className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                  placeholder="Enter password"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-2 text-sm text-[#777] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#aaa] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#242222]"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  required
                  className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                  placeholder="Re-enter password"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-2 text-sm text-[#777] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#aaa] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#242222]"
                >
                  Confirm Password
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#242222] text-white py-3 px-6 rounded-xl hover:bg-[#3a3838] transition-all duration-200 text-base font-medium shadow-md"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default SignIn;
