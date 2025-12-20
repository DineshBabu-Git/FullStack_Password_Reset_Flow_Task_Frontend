
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Login failed");
                return;
            }

            alert(data.message || "Login successful");
        } catch (error) {
            alert("Server not reachable. Please try again later.");
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-200">
            <div className="p-6 rounded-xl w-80 border border-gray-300 shadow-xl bg-gray-50">
                <h2 className="text-xl font-bold mb-4 text-center">User Login</h2>

                <input
                    type="email"
                    placeholder="Your Email"
                    className="border p-2 w-full mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Your Password"
                    className="border p-2 w-full mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white w-full py-2 rounded mb-3 cursor-pointer font-semibold hover:bg-blue-700 transition-colors"
                >
                    Login
                </button>

                <div className="text-sm text-center">
                    <Link to="/forgot-password" className="text-red-600 underline font-semibold">
                        Forgot Password?
                    </Link>
                </div>

                <div className="text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 underline font-semibold">
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
