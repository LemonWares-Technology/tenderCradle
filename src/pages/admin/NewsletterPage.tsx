import { useState, useEffect } from "react";
import { getSubscribers, deleteSubscriber } from "@/lib/api/newsletter";
import type { Subscriber } from "@/lib/api/newsletter";
import { Mail, Trash2, Loader2, AlertCircle, Search, Download, Calendar } from "lucide-react";

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filtered, setFiltered] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(subscribers);
    } else {
      const q = search.toLowerCase();
      setFiltered(subscribers.filter(s => s.email.toLowerCase().includes(q)));
    }
  }, [search, subscribers]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const data = await getSubscribers();
      setSubscribers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this subscriber?")) return;
    try {
      setDeleting(id);
      await deleteSubscriber(id);
      setSubscribers(prev => prev.filter(s => s.id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const exportCSV = () => {
    const csv = ["email,subscribed_at", ...subscribers.map(s => `${s.email},${s.createdAt}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#1A73E8] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-[#D93025] mx-auto mb-3" />
          <p className="text-sm text-[#5F6368]">{error}</p>
          <button onClick={fetchSubscribers} className="text-sm text-[#1A73E8] hover:underline mt-2">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-normal text-[#202124]">Newsletter Subscribers</h1>
          <p className="text-sm text-[#5F6368] mt-0.5">{subscribers.length} subscribers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA0A6]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search emails..."
              className="pl-10 pr-4 py-2 text-sm bg-white border border-[#DADCE0] rounded-lg outline-none focus:border-[#1A73E8] w-56 transition-colors"
            />
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#202124] bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#DADCE0] shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-[#F8F9FA]">
            <tr>
              {["Email Address", "Subscribed On", ""].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-bold text-[#5F6368] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F4]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-5 py-12 text-center">
                  <Mail className="w-10 h-10 text-[#DADCE0] mx-auto mb-3" />
                  <p className="text-sm text-[#5F6368]">{search ? "No matches found" : "No subscribers yet"}</p>
                </td>
              </tr>
            ) : (
              filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#F8F9FA] transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E8F0FE] flex items-center justify-center shrink-0">
                        <Mail className="w-3.5 h-3.5 text-[#1A73E8]" />
                      </div>
                      <span className="text-sm text-[#202124]">{sub.email}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#5F6368]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(sub.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => handleDelete(sub.id)}
                      disabled={deleting === sub.id}
                      className="p-2 text-[#9AA0A6] hover:text-[#D93025] hover:bg-[#FCE8E6] rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      title="Remove subscriber"
                    >
                      {deleting === sub.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
