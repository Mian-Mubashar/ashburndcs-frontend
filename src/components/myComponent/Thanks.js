export default function ThankYou() {
  return (
    <div className="thank-you-page min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="thank-you-code text-lg font-semibold text-green-600">
          Thank You!
        </p>
        <h1 className="thank-you-title mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">
          Payment Successful
        </h1>
        <p
          className="thank-you-message mt-6 text-base text-gray-600"
          style={{ maxWidth: "600px" }}
        >
          We appreciate your trust in us. Your payment has been successfully
          received. Please check your email for confirmation and further
          details. If you don’t see it, kindly check your spam or junk folder.
          Our team will contact you shortly to assist you with the next steps.
          If you have any questions or need immediate assistance, feel free to
          reach out at support@yourapp.com. We look forward to serving you!
        </p>

        <div className="action-buttons mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/"
            className="home-link rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300"
          >
            Go Back Home
          </a>
          {/* <a
            href="/profile"
            className="view-profile text-sm font-medium text-gray-900 hover:underline"
          >
            View Your Profile <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </div>
    </div>
  );
}
