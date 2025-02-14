import { useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function FormLoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Email dan password harus diisi! ❌", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        try {
            const response = await fetch("https://resepmasakanghilman.my.id/login_user.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email, password }),
            });

            const data = await response.json();

            if (data.status === "success") {
                toast.success("Login berhasil! ✅", {
                    position: "top-center",
                    autoClose: 2000,
                });
                localStorage.setItem("loggedUser", JSON.stringify(data.data));
                localStorage.setItem("token", data.data.token);
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            } else {
                toast.error(data.message || "Login gagal! ❌", {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Terjadi kesalahan pada server. ❌", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cyan-900">
            <Card className="w-full max-w-md">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between mb-4">
                        <Button outline className="w-12" onClick={() => window.history.back()}>
                            <HiOutlineArrowLeft className="h-6 w-10" />
                        </Button>
                        <h1 className="text-lg font-bold">Form Login</h1>
                    </div>
                    <div>
                        <Label htmlFor="email1" value="Email" />
                        <TextInput
                            id="email1"
                            type="email"
                            placeholder="name@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password1" value="Password" />
                        <TextInput
                            id="password1"
                            type="password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="flex justify-end mt-2">
                            <a href="/FormRegister" className="text-sm text-blue-600 hover:underline">
                                Daftar Akun
                            </a>
                        </div>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Card>
        </div>
    );
}
