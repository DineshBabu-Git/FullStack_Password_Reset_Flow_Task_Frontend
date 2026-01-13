
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send reset link");
        return;
      }

      alert(data.message || "Reset link sent successfully");

    } catch (error) {
      alert("Server not reachable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-200 flex-col gap-4">

      <div className="p-6 shadow-lg rounded-xl w-80 bg-gray-50 border border-gray-300">
        <h2 className="text-xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your Email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-purple-600 text-white w-full py-2 rounded font-semibold hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Email"}
        </button>

        {/* Loading Animation */}
        {loading && (
          <div className="flex flex-col items-center mt-4">
            <div className="w-6 h-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600 mt-2">
              Please Wait...
            </p>
          </div>
        )}
      </div>

      <div className="p-6 shadow-lg w-3/4 rounded-xl bg-gray-50 border border-gray-300">
        <p className="text-sm text-gray-600 text-center font-bold">
          ⚠️ Email Service Note :
        </p>
        <p className="mt-4 text-sm text-gray-600 text-center break-all">
          <u>
            Check Received Emails in
            <a
              href="https://mailtrap.io/"
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 font-semibold"
            >
              https://mailtrap.io/
            </a>{" "}. Instead of Gmail,{" "}
            <a
              href="https://mailtrap.io/"
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 font-semibold"
            >
              Mailtrap SMTP
            </a>{" "}
            is used for this project for reliable testing since Gmail SMTP is blocked on Render free tier due to updated policies.
          </u>
          <br />
          (Mentioned in GitHub README)
        </p>
      </div>

    </div>
  );
}

export default ForgotPassword;
