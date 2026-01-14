import { useState } from "react";
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex flex-col items-center justify-center px-4">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-blue-600 p-3 rounded-xl">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-3">
          Insurance Tracker
        </h1>
        <p className="text-gray-600 text-sm">Sign in to continue</p>
      </div>

      {/* Form */}
      <form className="w-full max-w-md space-y-4">
        {/* Email */}
        <div>
          <label className="text-sm text-gray-700">Email</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full pl-11 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-700">Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 text-blue-600" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button type="button" className="text-sm text-blue-600 font-medium">
            Forgot password?
          </button>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold"
        >
          Sign In
        </button>
      </form>

      {/* footer */}
      <p className="text-sm text-gray-600 mt-6">
        Don’t have an account?{" "}
        <span className="text-blue-600 font-medium cursor-pointer">
          Sign up
        </span>
      </p>
    </div>
  );
}
