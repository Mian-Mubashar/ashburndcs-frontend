import { Toast } from "helpers/Alert";

import { getAuthToken } from "services/authApi";

export const Email = (intent) => {
  const data = getAuthToken();
  if (!data?.email) {
    Toast({
      message: "Kindly Login first to perform transaction",
      type: "error",
    });
    return;
  }

  const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";

  fetch(`${apiUrl}myemail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      amount: intent.amount / 100,
      transaction: intent.id,
    }),
  }).catch((err) => console.error("Payment email error:", err));
};
