import SignUpForm from "../../components/auth/forms/SignUpForm";
import ProtectedRoute from "../../components/auth/routes/ProtectedRoute";
import FormCard from "../../components/cards/FormCard";

const SignUpPage = () => {
  return (
    <ProtectedRoute>
      <main
        className="h-[calc(100vh-113px)] sm:h-[calc(100vh-56px)]
        py-4 px-6 overflow-y-scroll"
      >
        <FormCard>
          <SignUpForm />
        </FormCard>
      </main>
    </ProtectedRoute>
  );
};

export default SignUpPage;
