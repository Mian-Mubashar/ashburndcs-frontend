import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);
export const Stripe = async (selectedAmount = "10") => {
  console.log("calllledddd");
  if (!selectedAmount) {
    alert("Please select an amount to proceed.");
    return;
  }
  const stripe = await stripePromise;
  await stripe.redirectToCheckout({
    // payment_method_types: ["card"],
    // line_items: [
    //   {
    //     price_data: {
    //       currency: "usd",
    //       product_data: { name: "Custom Item" },
    //       unit_amount: "20",
    //     },
    //     quantity: 1,
    //   },
    // ],
    //   lineItems: [
    //     {
    //       price_data: {
    //         currency: "usd",
    //         product_data: {
    //           name: `Payment of $${selectedAmount}`,
    //         },
    //         unit_amount: selectedAmount * 100, // Stripe expects the amount in cents
    //       },
    //       quantity: 1,
    //     },
    //   ],
    lineItems: [
      {
        price: "price_1QDhQdJsvhlE6wo7lCNZrtbp", // Use the Price ID for the selected amount
        quantity: 1,
      },
    ],
    mode: "payment",
    successUrl: window.location.origin + "/success",
    cancelUrl: window.location.origin + "/cancel",
  });
};
