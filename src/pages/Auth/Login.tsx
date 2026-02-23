import React, { useContext, useState, type SubmitEvent } from "react";
import { EmailIcon, PasswordIcon } from "../../assets/icons";
import { Input, Loading, PATH } from "../../components";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginFn } from "../../services";
import { Context } from "../../context/Context";

const Login = () => {
  const navigate = useNavigate()
  const {setToken} = useContext(Context)
  const [loading, setLoading] = useState<boolean>(false)
  
  function handleSubmit(evt:SubmitEvent<HTMLFormElement>){
    setLoading(true)
    evt.preventDefault()
    const data = {
      email:evt.target.email.value,
      password:evt.target.password.value
    }
    LoginFn(data, setLoading, setToken, navigate)
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(255,106,0,0.28),transparent_55%) radial-gradient(900px_500px_at_110%_10%,rgba(255,46,81,0.22),transparent_55%), radial-gradient(900px_700px_at_50%_115%,rgba(255,106,0,0.18),transparent_55%)] bg-[#071427] flex items-center justify-center p-6" style={{ "--darkBlue": "#071427", "--darsRed": "#FF2E51", "--darsOrange": "#FF6A00", } as React.CSSProperties}>
      <div className="pointer-events-none overflow-hidden absolute inset-0">
        <div className="absolute -left-24 top-14 h-72 w-72 rounded-full bg-(--darsOrange)/20 blur-3xl" />
        <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-(--darsRed)/18 blur-3xl" />
        <div className="absolute left-1/2 -bottom-28 h-96 w-96 -translate-x-1/2 rounded-full bg-(--darsOrange)/14 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_30%,rgba(255,255,255,0.03))]" />
      </div>
      {/* Card */}
      <div className="relative w-150">
        <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_80px_-30px_rgba(0,0,0,0.8)]">
          <div className="relative p-7 sm:p-10">
            {/* Top glow line */}
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,106,0,0.7),rgba(255,46,81,0.65),transparent)]" />
            <div className="mx-auto w-full max-w-md">
              {/* Desktop header */}
              <div className="hidden w-full lg:block">
                <h2 className="text-3xl font-bold text-white"> Kirish <span className="ml-2 text-white/60">•</span>
                  <span className="ml-2 text-base font-medium text-white/60"> Email & Parol</span>
                </h2>
                <p className="mt-2 text-sm text-white/60"> Hisobingizga kirish uchun ma’lumotlarni kiriting.</p>
              </div>
              {/* Form */}
              <form autoComplete="off" onSubmit={handleSubmit} className="mt-8 space-y-4">
                {/* Email */}
                <div>
                  <label className="mb-2 block text-xs font-semibold tracking-wide text-white/70">EMAIL</label>
                  <div className="group relative rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition focus-within:border-white/20 focus-within:bg-white/7">
                    <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                      <EmailIcon />
                    </div>
                    <Input extraClass="w-full pl-10" type="email" name="email" placeholder="misol@gmail.com "/>
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
                    <Input extraClass="w-full pl-10" type="password" placeholder="••••••••" name="password"/>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,106,0,0.75),rgba(255,46,81,0.65),transparent)] opacity-0 transition group-focus-within:opacity-100" />
                  </div>
                </div>
                {/* Button */}
                <Button type="submit">{loading ? <Loading/> : "Kirish"}</Button>
                {/* Divider */}
                <div className="relative py-4">
                  <div className="h-px w-full bg-white/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full border border-white/10 bg-(--darkBlue)/60 px-3 py-1 text-[11px] font-medium text-white/50">
                      Birinchi marta?
                    </span>
                  </div>
                </div>
                {/* Footer */}
                <Link to={PATH.register} className="block pt-4 text-center text-xs text-white/55">
                  <span className="font-semibold text-white/80 hover:text-white cursor-pointer transition">
                    Ro'yxatdan o'tish
                  </span>
                </Link>
              </form>
            </div>
            {/* Right side decorative */}
            <div className="pointer-events-none absolute -right-24 -top-24 hidden h-64 w-64 rounded-full bg-(--darkRed)/12 blur-3xl lg:block" />
            <div className="pointer-events-none absolute -right-20 bottom-10 hidden h-60 w-60 rounded-full bg-(--darkOrange)/10 blur-3xl lg:block" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login