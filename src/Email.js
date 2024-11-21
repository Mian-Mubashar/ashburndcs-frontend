import { Toast } from "helpers/Alert";

export const Email = (intent) => {
  console.log({ intent });
  const data = JSON.parse(window.localStorage.getItem("token"));
  if (data.email) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}myemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        amount: intent.amount / 100,
        transaction: intent.id,
      }),
    }).then((res) => console.log(res));
  } else {
    Toast({
      message: "Kindly Login first to perform transaction",
      type: "error",
    });
  }
};
