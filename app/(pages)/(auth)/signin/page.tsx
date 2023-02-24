import SignInForm from "../../../components/auth/forms/SignInForm";
import ProtectedRoute from "../../../components/auth/routes/ProtectedRoute";

const SignInPage = () => {
  return (
    <ProtectedRoute>
      <section className="px-4 xs:px-8 sm:px-12 max-w-[1400px] mx-auto w-screen">
        <header className="mt-1 ml-6">
          <h1 className="font-bold text-[1.5rem]">Sign in</h1>
          <h2 className="relative -top-2 text-[#67676d]">
            to access all features
          </h2>
        </header>
        <div className="h-[75vh] min-h-[450px] max-h-[900px]">
          <section className="h-full">
            <div className="flex h-full">
              <aside className="h-full lg:w-[50%] p-2 hidden lg:flex items-center pointer-events-none">
                <picture>
                  <img src="/Frame1.svg" alt="rocket" className="w-[90%]" />
                </picture>
              </aside>
              <article className="w-full h-full lg:w-[50%]">
                <div className="bg-white rounded-lg shadow-md h-full w-full flex flex-col justify-center items-center">
                  <div className="w-[75%] xs:w-[65%]">
                    <SignInForm />
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

export default SignInPage;
