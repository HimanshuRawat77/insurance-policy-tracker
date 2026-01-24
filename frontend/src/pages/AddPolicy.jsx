import React, { useState } from "react";
import { Bell, Search, Menu, X, ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddPolicy = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    policyNumber: "",
    policyHolder: "",
    provider: "",
    type: "Health",
    coverageAmount: "",
    premium: "",
    startDate: "",
    endDate: "",
    renewalFrequency: "Yearly",
    gracePeriodDays: "",
    nextPremiumDueDate: "",
    autoRenewal: false,
    reminderEnabled: true,
  });

  /* ---------------- INPUT HANDLER ---------------- */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ---------------- SUBMIT (REAL API) ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("loading");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const res = await fetch("/api/policies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          policyNumber: formData.policyNumber,
          policyHolder: formData.policyHolder,
          provider: formData.provider,
          type: formData.type,
          coverageAmount: Number(formData.coverageAmount),
          premium: Number(formData.premium),
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: "Active",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save policy");

      setSubmitStatus("success");

      // ✅ Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      alert(err.message);
    }
  };

  const policyTypes = [
    "Health",
    "Vehicle",
    "Life",
    "Home",
    "Travel",
    "Business",
  ];
  const renewalOptions = ["Monthly", "Quarterly", "Yearly"];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="bg-white border-r w-64 flex flex-col">
          <div className="p-6 border-b font-bold">Insurance</div>
          <nav className="p-4 space-y-2">
            {["Dashboard", "Policies", "Claims", "Documents", "Settings"].map(
              (item) => (
                <button
                  key={item}
                  className="w-full px-4 py-2 text-left rounded hover:bg-indigo-50"
                >
                  {item}
                </button>
              )
            )}
          </nav>
        </aside>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b flex justify-between items-center px-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <div className="flex items-center gap-4">
            <Search />
            <Bell />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8 max-w-4xl">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-indigo-600 mb-6"
          >
            <ArrowLeft className="mr-2" size={16} /> Back to Dashboard
          </button>

          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
              Policy saved successfully!
            </div>
          )}

          <div className="bg-white border rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* BASIC INFO */}
              <section>
                <h2 className="font-semibold mb-4">Basic Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    name="policyNumber"
                    label="Policy Number"
                    value={formData.policyNumber}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="policyHolder"
                    label="Policy Holder"
                    value={formData.policyHolder}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="provider"
                    label="Provider"
                    value={formData.provider}
                    onChange={handleInputChange}
                  />

                  <Select
                    name="type"
                    label="Policy Type"
                    value={formData.type}
                    options={policyTypes}
                    onChange={handleInputChange}
                  />
                </div>
              </section>

              {/* COVERAGE */}
              <section>
                <h2 className="font-semibold mb-4">Coverage & Premium</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    type="number"
                    name="coverageAmount"
                    label="Coverage Amount"
                    value={formData.coverageAmount}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="number"
                    name="premium"
                    label="Premium"
                    value={formData.premium}
                    onChange={handleInputChange}
                  />

                  <Select
                    name="renewalFrequency"
                    label="Renewal Frequency"
                    value={formData.renewalFrequency}
                    options={renewalOptions}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="number"
                    name="gracePeriodDays"
                    label="Grace Period (Days)"
                    value={formData.gracePeriodDays}
                    onChange={handleInputChange}
                  />
                </div>
              </section>

              {/* DATES */}
              <section>
                <h2 className="font-semibold mb-4">Policy Dates</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    type="date"
                    name="startDate"
                    label="Start Date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="date"
                    name="endDate"
                    label="End Date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </section>

              {/* ACTIONS */}
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="px-6 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="px-6 py-2 bg-indigo-600 text-white rounded flex items-center"
                >
                  {submitStatus === "loading" ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save size={16} className="mr-2" /> Save Policy
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

/* ---------------- SMALL COMPONENTS ---------------- */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm mb-2">{label}</label>
    <input {...props} required className="w-full border px-3 py-2 rounded" />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm mb-2">{label}</label>
    <select {...props} className="w-full border px-3 py-2 rounded">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default AddPolicy;
