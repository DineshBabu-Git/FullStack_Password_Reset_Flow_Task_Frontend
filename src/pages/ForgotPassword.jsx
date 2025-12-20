
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
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
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
      <div className="p-6 shadow-lg rounded-xl w-80 bg-gray-50 border border-gray-300">
        <h2 className="text-xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your Email"
          className="border p-2 w-full mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white w-full py-2 rounded cursor-pointer font-semibold hover:bg-purple-700 transition-colors"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
