import React, { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Plus,
  Eye,
  Edit2,
  MoreVertical,
  Upload,
  FileText,
  AlertCircle,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- FETCH POLICIES ---------------- */
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Please login again");

        const res = await fetch("/api/policies", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch policies");

        setPolicies(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  /* ---------------- KPIs ---------------- */
  const kpis = useMemo(() => {
    const now = new Date();
    const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const active = policies.filter((p) => p.status === "Active");
    const expiring = active.filter(
      (p) => new Date(p.endDate) <= in30Days && new Date(p.endDate) > now
    );

    return {
      active: active.length,
      expiring: expiring.length,
      premium: policies.reduce((s, p) => s + (p.premium || 0), 0),
    };
  }, [policies]);

  /* ---------------- FILTER ---------------- */
  const filteredPolicies = useMemo(() => {
    let data = [...policies];

    if (selectedFilter === "active")
      data = data.filter((p) => p.status === "Active");
    if (selectedFilter === "expired")
      data = data.filter((p) => p.status === "Expired");

    if (searchQuery)
      data = data.filter(
        (p) =>
          p.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.provider.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return data;
  }, [policies, selectedFilter, searchQuery]);

  const money = (n = 0) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  if (loading) return <p className="p-8">Loading dashboard…</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      {sidebarOpen && (
        <aside className="w-64 bg-white border-r">
          <div className="p-6 font-bold">Insurance Tracker</div>
          <nav className="p-4 space-y-2">
            {["Dashboard", "Policies", "Claims", "Documents", "Settings"].map(
              (i) => (
                <button
                  key={i}
                  className="w-full text-left px-4 py-2 rounded hover:bg-indigo-50"
                >
                  {i}
                </button>
              )
            )}
          </nav>
        </aside>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b flex justify-between px-6 items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>

          <div className="flex items-center gap-4">
            <Search />
            <Bell />
            <ChevronDown />
          </div>
        </header>

        <main className="p-8 space-y-8 overflow-auto">
          {/* KPIs */}
          <div className="grid md:grid-cols-3 gap-6">
            <KPI
              title="Active Policies"
              value={kpis.active}
              icon={CheckCircle}
            />
            <KPI
              title="Expiring Soon"
              value={kpis.expiring}
              icon={AlertCircle}
            />
            <KPI
              title="Total Premium"
              value={money(kpis.premium)}
              icon={DollarSign}
            />
          </div>

          {/* ACTION BAR */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Policies</h2>
            <button
              onClick={() => navigate("/policies/new")}
              className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Plus size={16} /> Add Policy
            </button>
          </div>

          {/* POLICY TABLE */}
          <div className="bg-white border rounded-lg overflow-hidden">
            {filteredPolicies.map((p) => (
              <div
                key={p._id}
                className="flex justify-between items-center p-4 border-b last:border-none"
              >
                <div>
                  <p className="font-medium">{p.policyNumber}</p>
                  <p className="text-sm text-gray-500">
                    {p.type} • {p.provider}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => navigate(`/policies/${p._id}`)}>
                    <Eye size={16} />
                  </button>
                  <button onClick={() => navigate(`/policies/edit/${p._id}`)}>
                    <Edit2 size={16} />
                  </button>
                  <MoreVertical size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <section>
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <Action
                label="Add Policy"
                icon={Plus}
                onClick={() => navigate("/policies/new")}
              />
              <Action label="File Claim" icon={FileText} />
              <Action label="Upload Document" icon={Upload} />
              <Action label="Manage Reminders" icon={Bell} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

/* COMPONENTS */
const KPI = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded border flex justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className="bg-indigo-100 p-3 rounded">
      <Icon className="text-indigo-600" />
    </div>
  </div>
);

const Action = ({ label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white border p-4 rounded hover:shadow flex flex-col gap-2"
  >
    <Icon className="text-indigo-600" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default Dashboard;
