import { Email } from "Email";
import AppRoutes from "Routes";
import { Container } from "helpers/Alert";

export default function App() {
  // console.log("---------------------", window.localStorage.getItem("token"));
  // console.log("process.env.REACT_APP_API_KEY", process.env.REACT_APP_API_KEY);
  return (
    <>
      {/* <button onClick={Email}>Haayyee</button> */}
      <AppRoutes />
      <Container />
    </>
  );
}
