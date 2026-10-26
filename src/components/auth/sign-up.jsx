import { useId, useRef, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const WAVE = "M0,160 C240,80 480,240 720,160 C960,80 1200,240 1440,160 " +
  "C1680,80 1920,240 2160,160 C2400,80 2640,240 2880,160 V320 H0 Z";

const wavePattern = [
    { fill: "#dee2e6", opacity: 0.35, height: "h-[46vh]", duration: 22, reverse: false},
    { fill: "#f8f9fa", opacity: 0.18, height: "h-[38vh]", duration: 16, reverse: false},
    { fill: "#e9ecef", opacity: 0.9, height: "h-[18]", duration: 12, reverse: false},
]

const steps = ["Personal Info", "Security", "Additional Info"];
const title = ["Personal Information", "Set Password", "Additional Information"];
const genreGames = ["FPS", "Battle Royale", "MOBA", "Racing", "Open-World", "Survival Horror", "Adventure"];

const initial = {
    firstName: "", lastName: "", dateBirth: "", email: "", password: "", confirm: "", genres: [], terms: false,
};

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**Validator Per Step */
function validateStep(step, d) {
    const e = {};
    if ( e === 0 ) {
        if (!d.firstName.trim()) e.firstName = "Enter your firstname";
        if (!d.lastName.trim()) e.lastName = "Enter your firstname";
        if (!d.dateBirth) e.dateBirth = "Pick your date/birth";
        else if ((Date.now() - new Date(d.dateBirth)) / 31557600000 < 13) e.dateBirth = "You must be at least 13.";
        if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Enter a valid email, like name@example.com.";
    }
    if (step === 1) {
        if (d.password.length < 8 ) e.password = "Use at least 8 characters";
        if (d.confirm !== d.password ) e.confirm = "Password don't match ";
    }
    if ( step === 2 && !d.terms) e.terms = "Accept the terms to create your account.";
    return 0;
}

export default function SignUp(){
    const root = useRef(null);
    const dir = useRef(0);
    const navigate = useNavigate();


    const [step, setStep] = useState(0);
    const [data, setData] = useState(initial);
    const [errors, setErrors] = useState({});
    const [ showPasswrd, setShowPasswrd ] = useState(false);
    const last = step === step.length - 1;

    const update = (key, value) => {
        setData((d) => ({ ...d, [key]: value} ));
        if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined}));
    };
    const bind = (key) => ({
    value: data[key],
    error: errors[key],
    onChange: (e) => update(key, e.target.value),
  });
  const toggleGenre = (g) =>
    update("genres", data.genres.includes(g) ? data.genres.filter((x) => x !== g) : [...data.genres, g]);
 
  const next = (e) => {
    e.preventDefault();
    const found = validate(step, data);
    setErrors(found);
    if (Object.keys(found).length) return;
    if (last) {
      // call your sign-up API with `data` here, then:
      return navigate("/");
    }
    dir.current = 1;
    setStep((s) => s + 1);
  };
 
  const back = () => {
    dir.current = -1;
    setErrors({});
    setStep((s) => s - 1);
  };

    useGSAP(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        gsap.utils.toArray(".wave").forEach((el, i) => {
            const  { duration, reverse } = wavePattern[i];
            gsap.fromTo(
                el, 
                { xPercent: reverse ? -50 : 0},
                { xPercent: reverse ? 0 : -50, duration, repeat: -1, ease: "none"}
            );
            gsap.to(el, {
                y: 14,
                duration: 4 + i * 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut", 
            });
        });
    })
    
    useGSAP(
    () => {
      if (!dir.current || reducedMotion()) return;
      gsap.fromTo(
        ".step-panel",
        { x: dir.current * 28, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    },
    { dependencies: [step], scope: root }
  );
    return (
        
        <div 
        ref={root}
        className="relative flex min-h-screen items-center justify-center overflow-hidden 
        bg-linear-to-r from-[#495057] via-[#343a40] to-[#212529] px-4 text-white">
            
              <div className="pointer-events-none absolute inset-x-0 bottom-0" aria-hidden="true">
                       
                    </div>
            <main className="form-block grid w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b2b26] shadow-2xl md:grid-cols-[0.9fr_1.4fr]">
                <aside className="relative hidden overflow-hidden bg-[#051F20] md:block">
                    <div className="relative z-10 p-8">
                        <p className="text-lg font-black tracking-tight text-[#daf1de]">
                            <span className="text-[#8eb69b]"> xGRID - Store </span>
                        </p>
                        <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-white/60">
                            Your amount are every games.
                        </p>
                    </div>

                {/* Backdrop */}
                   <div className="pointer-events-none absolute inset-x-0 bottom-0" aria-hidden="true">
                         {wavePattern.map((w, i ) => (
                            <svg
                                key={i}
                                viewBox='0 0 2880 320'
                                preserveAspectRatio='none'
                                className={`wave absolute bottom-0 left-0 w-[200%] ${w.height}`}
                            >
                                <path d={WAVE} fill={w.fill} fillOpacity={w.opacity}/>
                            </svg>
                        ))}
                    </div>
                </aside>

                {/**Right Panel */}
                <form noValidate onSubmit={next} className="flex min-h-[540px] flex-col p-6 sm:p-10">
                    <ol className="flex items-center justify-between pb-5">
                        {steps.map((label, i) => {
                        const state = i < step ? "done" : i === step ? "active" : "todo";
                        return (
                            <li key={label} className="flex items-center gap-3" aria-current={state === "active" ? "step" : undefined}>
                            <span
                                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors duration-300 ${
                                state === "active"
                                    ? "bg-[#daf1de] text-[#051F20]"
                                    : state === "done"
                                    ? "bg-[#235347] text-[#daf1de]"
                                    : "bg-white/10 text-white/45"
                                }`}
                            >
                                {state === "done" ? <Check size={16} /> : i + 1}
                            </span>
                            <span className={`hidden text-sm sm:block ${state === "todo" ? "text-white/45" : "text-white"}`}>
                                {label}
                            </span>
                            </li>
                        );
                        })}
                    </ol>
                    <div className="h-px w-full bg-white/15">
                        <div className="h-full bg-[#8eb69b] transition-[width] duration-500"
                        style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                        />
                    </div>
                    <h1 className="mt-10 text-xl font-semibold"> 
                        {title[step]}
                    </h1>
                    <div className="step-panel mt-6">
                        {step === 0 && (
                            <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                                <Field label="First name" autoComplete="given-name" {...bind("firstName")} />
                                <Field label="FirLastst name" autoComplete="given-name" {...bind("lastName")} />
                                <Field label="Date Birth"  type="date" autoComplete="birth" {...bind("firstName")} />
                                <Field label="Email" type="email" autoComplete="email" {...bind("email")} />
                            </div>
                        )}

                        {step === 1 && (
                            <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                                <Field
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                {...bind("password")}
                                trailing={
                                    <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="ml-2 text-white/45 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                                    >
                                    {showPasswrd ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                }
                                />
                                <Field
                                label="Confirm password"
                                type={showPasswrd ? "text" : "password"}
                                autoComplete="new-password"
                                {...bind("confirm")}
                                />
                                <p className="text-xs text-white/45 sm:col-span-2">Use at least 8 characters.</p>
                            </div>
                            )}
                            
                             {step === 2 && (
              <div>
                <fieldset>
                  <legend className="text-sm text-white/70">Genres you play (optional)</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {genres.map((g) => {
                      const on = data.genres.includes(g);
                      return (
                        <button
                          key={g}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleGenre(g)}
                          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                            on
                              ? "border-[#8eb69b] bg-[#8eb69b]/15 text-[#daf1de]"
                              : "border-white/15 text-white/60 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <label className="mt-8 flex items-start gap-3 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={data.terms}
                    onChange={(e) => update("terms", e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[#8eb69b]"
                  />
                  <span>I agree to the terms of service and privacy policy.</span>
                </label>
                {errors.terms && (
                  <p role="alert" className="mt-1.5 text-xs text-red-300">
                    {errors.terms}
                  </p>
                )}
              </div>
            )}
          </div>
           <div className="mt-auto flex items-center justify-between pt-8">
            {step > 0 ? (
              <button type="button" onClick={back} className="text-sm text-white/60 transition-colors hover:text-white">
                Back
              </button>
            ) : (
              <p className="text-sm text-white/55">
                Have an account?{" "}
                <Link to="/" className="font-medium text-[#8eb69b] underline-offset-4 hover:underline">
                  Sign in
                </Link>
              </p>
            )}
            <button
              type="submit"
              className="h-11 rounded-lg bg-[#daf1de] px-6 text-sm font-semibold text-[#051F20] transition-transform
                hover:scale-[1.03] active:scale-[0.97]
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8eb69b]"
            >
              {last ? "Create account" : "Next step"}
            </button>
          </div>
                </form>
            </main>

        </div>
    )
}

function Field({ label, error, trailing, ...props }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={`text-sm transition-colors ${error ? "text-red-300" : "text-white/70"}`}>
        {label}
      </label>
      <div
        className={`mt-1.5 flex h-11 items-center rounded-lg border bg-white/5 px-3 transition-colors focus-within:border-[#8eb69b] ${
          error ? "border-red-400/70" : "border-white/15"
        }`}
      >
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
          className="h-full w-full bg-transparent text-sm text-white outline-none [color-scheme:dark] placeholder:text-white/30"
        />
        {error && <AlertCircle size={18} className="ml-2 shrink-0 text-red-300" />}
        {trailing}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}