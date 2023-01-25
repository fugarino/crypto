import Image from "next/image";
import SignUpForm from "../../../components/auth/forms/SignUpForm";
import ProtectedRoute from "../../../components/auth/routes/ProtectedRoute";

const SignUpPage = () => {
  return (
    <ProtectedRoute>
      <section className="px-12 max-w-[1400px] mx-auto w-screen">
        <header className="mt-1 ml-6">
          <h1 className="font-bold text-[1.5rem]">Sign in</h1>
          <h2 className="relative -top-2 text-[#67676d]">
            to access all features
          </h2>
        </header>
        <div className="h-[75vh] min-h-[450px] max-h-[900px]">
          <section className="h-full">
            <div className="flex h-full">
              <aside className="h-full bg-black rounded-l-lg overflow-hidden lg:w-[50%] hidden lg:flex items-center pointer-events-none">
                <Image
                  src="/bt.jpg"
                  width={1280}
                  height={1918}
                  alt="community picture"
                  className="h-full w-full object-cover"
                />
                {/* <picture>
                  <img
                    src="/bt.jpg"
                    alt="community picture"
                    className="h-full w-full object-cover"
                  />
                </picture> */}
              </aside>
              <article className="w-full h-full lg:w-[50%]">
                <div className="bg-white rounded-lg lg:rounded-r-lg lg:rounded-l-none shadow-md h-full w-full flex flex-col justify-center items-center">
                  <div className="w-[65%]">
                    <SignUpForm />
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default SignUpPage;
