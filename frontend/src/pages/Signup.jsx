import { useState } from "react";
import { Shield, Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <p className="text-gray-600 text-sm">Create your account</p>
      </div>

      {/* Form */}
      <form className="w-full max-w-md space-y-4">
        {/* Full Name */}
        <div>
          <label className="text-sm text-gray-700">Full Name</label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="John Doe"
              className="w-full pl-11 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

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

        {/* Phone */}
        <div>
          <label className="text-sm text-gray-700">Phone</label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              placeholder="+91 98765 43210"
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

        {/* Confirm Password */}
        <div>
          <label className="text-sm text-gray-700">Confirm Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full pl-11 pr-11 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold mt-2"
        >
          Create Account
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <span className="text-blue-600 font-medium cursor-pointer">
          Sign in
        </span>
      </p>
    </div>
  );
}
