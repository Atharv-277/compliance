import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [stage, setStage] = useState("enterMobile"); // enterMobile | enterOtp
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  // OTP specific
  const OTP_LENGTH = 6;
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef(Array.from({ length: OTP_LENGTH }, () => React.createRef()));
  const [sentOtp, setSentOtp] = useState(null); // demo only

  useEffect(() => {
    // clear interval when reaches 0
    if (timer === 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [timer]);

  useEffect(() => {
    // cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  function validateMobile(m) {
    return /^([6-9]\d{9})$/.test(m);
  }

  async function requestOtp(e) {
    e?.preventDefault();
    setError("");

    if (!validateMobile(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    // mock API delay
    await new Promise((r) => setTimeout(r, 700));
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(mockOtp);

    setStage("enterOtp");
    setOtpValues(Array(OTP_LENGTH).fill(""));
    setTimer(30);

    // start countdown
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimer((t) => Math.max(0, t - 1));
      }, 1000);
    }

    // focus first OTP box slightly after rendering
    setTimeout(() => {
      const ref = otpRefs.current[0];
      if (ref && ref.current) ref.current.focus();
    }, 120);

    setLoading(false);
  }

  async function verifyOtp(e) {
    e?.preventDefault();
    setError("");

    const otp = otpValues.join("");
    if (otp.length < OTP_LENGTH) {
      setError("Enter the 6-digit code sent to your mobile.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    // demo verification against mock OTP
    if (otp === sentOtp) {
      // success: navigate to dashboard (or set real auth token)
      navigate("/user/dashboard");
    } else {
      setError("Incorrect OTP. Please try again.");
      // shake animation could be added via CSS class toggle
    }

    setLoading(false);
  }

  function resendOtp() {
    if (timer > 0) return;
    setError("");
    setLoading(true);

    setTimeout(() => {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setSentOtp(newOtp);
      setTimer(30);
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setTimer((t) => Math.max(0, t - 1));
        }, 1000);
      }
      // focus first OTP box after resend
      setTimeout(() => {
        const ref = otpRefs.current[0];
        if (ref && ref.current) ref.current.focus();
      }, 120);
      setLoading(false);
    }, 700);
  }

  // OTP input handlers
  function handleOtpChange(idx, val) {
    if (!/^\d*$/.test(val)) return;
    const v = val.slice(0, 1); // only single digit per box
    const next = [...otpValues];
    next[idx] = v;
    setOtpValues(next);

    if (v && idx < OTP_LENGTH - 1) {
      const nextRef = otpRefs.current[idx + 1];
      if (nextRef && nextRef.current) nextRef.current.focus();
    }
  }

  function handleOtpKeyDown(idx, ev) {
    if (ev.key === "Backspace") {
      if (otpValues[idx] === "") {
        if (idx > 0) {
          const prevRef = otpRefs.current[idx - 1];
          if (prevRef && prevRef.current) {
            const next = [...otpValues];
            next[idx - 1] = "";
            setOtpValues(next);
            prevRef.current.focus();
          }
        }
      } else {
        const next = [...otpValues];
        next[idx] = "";
        setOtpValues(next);
      }
    } else if (ev.key === "ArrowLeft" && idx > 0) {
      const prevRef = otpRefs.current[idx - 1];
      if (prevRef && prevRef.current) prevRef.current.focus();
    } else if (ev.key === "ArrowRight" && idx < OTP_LENGTH - 1) {
      const nextRef = otpRefs.current[idx + 1];
      if (nextRef && nextRef.current) nextRef.current.focus();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Brand / Illustration */}
        <div className="hidden md:flex flex-col justify-center items-start p-10 bg-gradient-to-b from-sky-600 to-indigo-600 text-white gap-6">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">VerifyX</h2>
            <p className="mt-1 text-sm opacity-90">
              Automate KYC & AML checks. Secure, fast onboarding for your users.
            </p>
          </div>

          <div className="mt-4">
            <p className="text-sm max-w-xs">
              Sign in with your mobile. We will send a one-time code to verify your identity.
            </p>
          </div>

          <div className="mt-auto w-full">
            {/* Simple decorative card */}
            <div className="bg-white/10 p-4 rounded-lg border border-white/10">
              <p className="text-xs opacity-95">Secure · Fast · Compliant</p>
              <p className="mt-2 text-xs opacity-80">No passwords. No hassle.</p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Login</h1>
          <p className="text-sm text-gray-600 mb-6">
            Enter your phone number to receive a one-time verification code.
          </p>

          {stage === "enterMobile" && (
            <form onSubmit={requestOtp} className="space-y-4">
              <div>
                <label htmlFor="mobile" className="block text-xs font-medium text-gray-600 mb-1">
                  Mobile number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-700">
                    +91
                  </span>
                  <input
                    id="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                    placeholder="9876543210"
                    maxLength={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-sky-300"
                    aria-label="Mobile number"
                  />
                </div>
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <div className="flex items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 rounded-md bg-sky-600 text-white font-semibold hover:bg-sky-700 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Request OTP"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-3 py-2 rounded-md text-sm text-gray-500 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>

              <div className="text-xs text-gray-400">
                By continuing you agree to our privacy policy. We only use your number to send a verification code.
              </div>
            </form>
          )}

          {stage === "enterOtp" && (
            <form onSubmit={verifyOtp} className="space-y-4">
              <p className="text-sm text-gray-600">Code sent to +91 {mobile}. Enter the 6-digit code below.</p>

              <div className="flex gap-2 justify-start mt-2">
                {otpValues.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpRefs.current[idx]}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    maxLength={1}
                    className="w-12 h-12 text-center rounded-md border border-gray-300 focus:outline-none text-lg"
                    aria-label={`OTP digit ${idx + 1}`}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="text-sm text-gray-600">
                  {timer > 0 ? (
                    <span>Resend in {timer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={resendOtp}
                      className="text-sky-600 underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStage("enterMobile");
                    setError("");
                    setOtpValues(Array(OTP_LENGTH).fill(""));
                    // clear timer if any
                    if (timerRef.current) {
                      clearInterval(timerRef.current);
                      timerRef.current = null;
                    }
                    setTimer(0);
                  }}
                  className="text-sm text-gray-500"
                >
                  Change mobile number
                </button>
              </div>

              <div className="mt-2 text-xs text-gray-400">
                Demo OTP (remove in prod): {sentOtp || "—"}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
