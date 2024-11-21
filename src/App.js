import AppRoutes from "Routes";
import { Container } from "helpers/Alert";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
export default function App() {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);
  return (
    <Elements stripe={stripePromise}>
      <AppRoutes />
      <Container />
    </Elements>
  );
}
