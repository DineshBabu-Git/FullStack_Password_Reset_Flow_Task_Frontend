
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Registration failed");
                return;
            }

            alert(data.message || "Registration successful");
        } catch (error) {
            alert("Server not reachable. Please try again later.");
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-200">
            <div className="p-6 shadow-lg rounded-xl w-80 bg-gray-50 border border-gray-300">
                <h2 className="text-xl font-bold mb-4 text-center">
                    Create Account
                </h2>

                <input
                    type="text"
                    placeholder="Add UserName"
                    className="border p-2 w-full mb-3"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Add Email"
                    className="border p-2 w-full mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Add Password"
                    className="border p-2 w-full mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleRegister}
                    className="bg-green-600 text-white w-full py-2 rounded mb-3 cursor-pointer font-semibold hover:bg-green-700 transition-colors"
                >
                    Register
                </button>

                <div className="text-sm text-center">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-600 underline font-semibold">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
