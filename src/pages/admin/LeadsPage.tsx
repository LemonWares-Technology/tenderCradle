import { useState, useEffect } from "react";
import { getLeads, deleteLead } from "@/lib/api/leads";
import type { Lead } from "@/lib/api/leads";
import {
  MessageSquare, Mail, Phone, Trash2, Loader2,
  AlertCircle, Calendar, Search, ChevronDown
} from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filtered, setFiltered] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(leads);
    } else {
      const q = search.toLowerCase();
      setFiltered(leads.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.subject?.toLowerCase().includes(q) ||
        l.message.toLowerCase().includes(q)
      ));
    }
  }, [search, leads]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await getLeads();
      setLeads(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      setDeleting(id);
      await deleteLead(id);
      setLeads(prev => prev.filter(l => l.id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#1A73E8] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-[#D93025] mx-auto mb-3" />
          <p className="text-sm text-[#5F6368]">{error}</p>
          <button onClick={fetchLeads} className="text-sm text-[#1A73E8] hover:underline mt-2">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-normal text-[#202124]">Contact Form Leads</h1>
          <p className="text-sm text-[#5F6368] mt-0.5">{leads.length} total submissions</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA0A6]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="pl-10 pr-4 py-2 text-sm bg-white border border-[#DADCE0] rounded-lg outline-none focus:border-[#1A73E8] w-64 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#DADCE0] p-12 text-center">
            <MessageSquare className="w-10 h-10 text-[#DADCE0] mx-auto mb-3" />
            <p className="text-sm text-[#5F6368]">{search ? "No leads match your search" : "No leads yet"}</p>
          </div>
        ) : (
          filtered.map((lead) => (
            <div key={lead.id} className="bg-white rounded-lg border border-[#DADCE0] shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-semibold text-[#202124]">{lead.name}</h3>
                    {lead.subject && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#E8F0FE] text-[#1A73E8] rounded-full">
                        {lead.subject}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#5F6368] mb-3">
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{lead.email}</span>
                    {lead.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{lead.phone}</span>}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(lead.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <p className="text-sm text-[#5F6368] leading-relaxed">{lead.message}</p>
                </div>
                <button
                  onClick={() => handleDelete(lead.id)}
                  disabled={deleting === lead.id}
                  className="p-2 text-[#9AA0A6] hover:text-[#D93025] hover:bg-[#FCE8E6] rounded-lg transition-all shrink-0"
                  title="Delete lead"
                >
                  {deleting === lead.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
