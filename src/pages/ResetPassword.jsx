
import { useParams } from "react-router-dom";
import { useState } from "react";

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");

    const handleReset = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, newPassword: password })
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Password reset failed");
                return;
            }

            alert(data.message || "Password reset successful");
        } catch (error) {
            alert("Server not reachable. Please try again later.");
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-200">
            <div className="p-6 shadow-lg rounded-xl w-80 bg-gray-50 border border-gray-300">
                <h2 className="text-xl font-bold mb-4 text-center">
                    Reset Password
                </h2>

                <input
                    type="password"
                    placeholder="Enter New Password"
                    className="border p-2 w-full mb-4"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleReset}
                    className="bg-green-600 text-white w-full py-2 rounded cursor-pointer font-semibold hover:bg-green-700 transition-colors"
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
}

export default ResetPassword;
