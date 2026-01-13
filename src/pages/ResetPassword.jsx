
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!token) {
            alert("Invalid or missing reset token");
            return;
        }

        if (!password || !confirmPassword) {
            alert("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
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

            alert("Password reset successful. Please login with new password.");
            navigate("/");

        } catch (error) {
            alert("Server not reachable. Please try again later.");
        } finally {
            setLoading(false);
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
                    placeholder="New Password"
                    className="border p-2 w-full mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border p-2 w-full mb-4"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    onClick={handleReset}
                    disabled={loading}
                    className="bg-green-600 text-white w-full py-2 rounded font-semibold hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </div>
        </div>
    );
}

export default ResetPassword;
