
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
        setLoading(false);
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

    </div>
  );
}

export default ForgotPassword;
