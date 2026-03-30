import { useState, useEffect } from "react";
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/api/team";
import type { TeamMember, CreateTeamData } from "@/lib/api/team";
import { Users, Plus, Pencil, Trash2, Loader2, AlertCircle, X, Save } from "lucide-react";

const emptyForm: CreateTeamData = { name: "", role: "", bio: "", order: 0 };

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<CreateTeamData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await getTeamMembers();
      setMembers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.role || !form.bio) return alert("Please fill all fields.");
    try {
      setSaving(true);
      if (editing) {
        const updated = await updateTeamMember(editing, form);
        setMembers(prev => prev.map(m => m.id === editing ? { ...m, ...updated } : m));
      } else {
        const created = await createTeamMember(form);
        setMembers(prev => [...prev, created]);
      }
      resetForm();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setForm({ name: member.name, role: member.role, bio: member.bio, order: member.order });
    setEditing(member.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this team member?")) return;
    try {
      setDeleting(id);
      await deleteTeamMember(id);
      setMembers(prev => prev.filter(m => m.id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
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
          <button onClick={fetchMembers} className="text-sm text-[#1A73E8] hover:underline mt-2">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-normal text-[#202124]">Team Members</h1>
          <p className="text-sm text-[#5F6368] mt-0.5">{members.length} members</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#185ABC] rounded shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-[#DADCE0] shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-medium text-[#202124]">{editing ? "Edit Member" : "Add New Member"}</h2>
            <button onClick={resetForm} className="p-1.5 text-[#5F6368] hover:bg-[#F1F3F4] rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-1.5">Name</label>
              <input
                type="text" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-3 py-2 text-sm bg-white border border-[#DADCE0] rounded-lg outline-none focus:border-[#1A73E8] transition-colors"
                placeholder="Mrs. Ngozi Okafor"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-1.5">Role</label>
              <input
                type="text" value={form.role} onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))}
                className="w-full px-3 py-2 text-sm bg-white border border-[#DADCE0] rounded-lg outline-none focus:border-[#1A73E8] transition-colors"
                placeholder="Head of School"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-1.5">Bio</label>
            <textarea
              value={form.bio} onChange={(e) => setForm(f => ({ ...f, bio: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 text-sm bg-white border border-[#DADCE0] rounded-lg outline-none focus:border-[#1A73E8] resize-none transition-colors"
              placeholder="Brief biography of the team member..."
            />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-24">
              <label className="block text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-1.5">Order</label>
              <input
                type="number" value={form.order} onChange={(e) => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 text-sm bg-white border border-[#DADCE0] rounded-lg outline-none focus:border-[#1A73E8] transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#185ABC] rounded shadow-sm disabled:opacity-50 transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {editing ? "Update" : "Add"} Member
            </button>
            <button onClick={resetForm} className="px-4 py-2 text-sm text-[#5F6368] hover:bg-[#F1F3F4] rounded transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Members List */}
      <div className="space-y-3">
        {members.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#DADCE0] p-12 text-center">
            <Users className="w-10 h-10 text-[#DADCE0] mx-auto mb-3" />
            <p className="text-sm text-[#5F6368]">No team members yet</p>
          </div>
        ) : (
          members.sort((a, b) => a.order - b.order).map((member) => (
            <div key={member.id} className="bg-white rounded-lg border border-[#DADCE0] shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E8F0FE] flex items-center justify-center shrink-0 text-[#1A73E8] font-bold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#202124]">{member.name}</h3>
                    <p className="text-xs text-[#1A73E8] font-medium mt-0.5">{member.role}</p>
                    <p className="text-sm text-[#5F6368] mt-2 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => handleEdit(member)} className="p-2 text-[#9AA0A6] hover:text-[#1A73E8] hover:bg-[#E8F0FE] rounded-lg transition-all" title="Edit">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    disabled={deleting === member.id}
                    className="p-2 text-[#9AA0A6] hover:text-[#D93025] hover:bg-[#FCE8E6] rounded-lg transition-all"
                    title="Delete"
                  >
                    {deleting === member.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
