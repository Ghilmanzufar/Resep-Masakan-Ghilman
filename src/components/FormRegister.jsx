import { Card, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function RegisterComponent() {
    const [nama, setNama] = useState('');
    const [nomer, setNomer] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [agree, setAgree] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            toast.error("Password tidak cocok!", { position: "top-right", autoClose: 2000 });
            return;
        }

        if (!agree) {
            toast.warning("Anda harus menyetujui persyaratan!", { position: "top-right", autoClose: 2000 });
            return;
        }

        const data = {
            nama,
            nomer,
            email,
            password,
        };

        try {
            const response = await fetch("http://resepmasakanghilman.my.id/create_user.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);

            if (result.success) {
                toast.success("Registrasi berhasil! ✅", { position: "top-right", autoClose: 2000 });

                setTimeout(() => {
                    window.location.href = "/FormLogin";
                }, 2000); // Redirect setelah 2 detik
            } else {
                toast.error(`Registrasi gagal! ${result.message}`, { position: "top-right", autoClose: 2000 });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Terjadi kesalahan pada server!", { position: "top-right", autoClose: 2000 });
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
                        <h1 className="text-lg font-bold">Form Register</h1>
                    </div>
                    <div>
                        <Label htmlFor="nama" value="Nama" />
                        <TextInput id="nama" placeholder="Nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="nomer" value="Nomer Hp" />
                        <TextInput id="nomer" placeholder="Nomer Hp" required value={nomer} onChange={(e) => setNomer(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="email" value="Email" />
                        <TextInput id="email" type="email" placeholder="nama@domain.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="password" value="Password" />
                        <TextInput id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="repeat-password" value="Repeat Password" />
                        <TextInput id="repeat-password" type="password" required value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                        <Label htmlFor="agree">I agree to the terms and conditions</Label>
                    </div>
                    <Button type="submit">Register New Account</Button>
                </form>
            </Card>
        </div>
    );
}
