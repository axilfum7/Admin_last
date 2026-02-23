import React, { useState, type SubmitEvent } from "react";
import { Input, Loading, PATH } from "../../components";
import { EmailIcon, NameIcon, PasswordIcon } from "../../assets/icons";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { RegisterFn } from "../../services";

export interface RegisterDataType {
  name:string,
  email:string,
  password:string,
  avatar:string
}

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  function handleSubmit(evt: SubmitEvent<HTMLFormElement>) {
    setLoading(true)
    evt.preventDefault()
    const data:RegisterDataType = {
      name: evt.target.firstname.value,
      email: evt.target.email.value,
      password: evt.target.password.value,
      avatar: "https://c.files.bbci.co.uk/F8D4/production/_94000736_homunweb2.jpg"
    }
    RegisterFn(data, navigate, setLoading)
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#071427] flex items-center justify-center p-6 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(255,106,0,0.28),transparent_55%), radial-gradient(900px_500px_at_110%_10%,rgba(255,46,81,0.22),transparent_55%), radial-gradient(900px_700px_at_50%_115%,rgba(255,106,0,0.18),transparent_55%)]"
      style={{ "--darkBlue": "#071427", "--darsRed": "#FF2E51", "--darsOrange": "#FF6A00" } as React.CSSProperties}>
      <div className="pointer-events-none overflow-hidden absolute inset-0">
        <div className="absolute -left-24 top-14 h-72 w-72 rounded-full bg-(--darsOrange)/20 blur-3xl" />
        <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-(--darsRed)/18 blur-3xl" />
        <div className="absolute left-1/2 -bottom-28 h-96 w-96 -translate-x-1/2 rounded-full bg-(--darsOrange)/14 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_30%,rgba(255,255,255,0.03))]" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-140">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_80px_-30px_rgba(0,0,0,0.8)]">
          <div className="relative p-7 sm:p-10">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,106,0,0.7),rgba(255,46,81,0.65),transparent)]" />
            <div className="mb-7">
              <h2 className="text-3xl font-bold text-white">Ro&apos;yxatdan o&apos;tish</h2>
              <p className="mt-2 text-sm text-white/60">Yangi akkaunt yaratish uchun ma’lumotlarni kiriting.</p>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-wide text-white/70">ISM</label>
                <div className="group relative rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition focus-within:border-white/20 focus-within:bg-white/7">
                  <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center opacity-80">
                    <NameIcon />
                  </div>
                  <Input type="text" name="firstname" placeholder="Ism familiya" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,106,0,0.75),rgba(255,46,81,0.65),transparent)] opacity-0 transition group-focus-within:opacity-100" />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-wide text-white/70">EMAIL</label>
                <div className="group relative rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition focus-within:border-white/20 focus-within:bg-white/7">
                  <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                    <EmailIcon />
                  </div>
                  <Input type="email" name="email" placeholder="misol@gmail.com" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,106,0,0.75),rgba(255,46,81,0.65),transparent)] opacity-0 transition group-focus-within:opacity-100" />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-wide text-white/70">PAROL</label>
                <div className="group relative rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition focus-within:border-white/20 focus-within:bg-white/7">
                  <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                    <PasswordIcon />
                  </div>
                  <Input type="password" name="password" placeholder="••••••••" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,106,0,0.75),rgba(255,46,81,0.65),transparent)] opacity-0 transition group-focus-within:opacity-100" />
                </div>
              </div>
              <Button extraClass="!h-[48px]" type="submit">{loading ?  <Loading/> : "Ro'yxatdan o'tish"}</Button>
             
              {/* footer */}
              <div className="pt-2 text-center text-xs text-white/55">
                Akkauntingiz bormi?
                <Link to={PATH.login} className="font-semibold text-white/80 hover:text-white cursor-pointer transition">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register