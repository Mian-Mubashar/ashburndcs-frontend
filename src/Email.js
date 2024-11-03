import emailjs from "@emailjs/browser";

export const Email = () => {
  //   e.preventDefault();

  // Define the template parameters as an object
  const templateParams = {
    to_name: "James",
    from_name: "abdulbasit99786+wahwah@gmail.com",
    message: "Email Sent Kindly confirm",
  };

  emailjs
    .send(
      process.env.REACT_APP_EMAIL_ID, // Service ID
      process.env.REACT_APP_EMAIL_TEMPLATE, // Template ID
      templateParams, // Template parameters
      process.env.REACT_APP_EMAIL_KEY // Public key (or User ID)
    )
    .then(
      () => {
        console.log("SUCCESS!");
        alert("Sent Email");
      },
      (error) => {
        alert("Failed");
        console.log("FAILED...", error.text);
      }
    );
};
