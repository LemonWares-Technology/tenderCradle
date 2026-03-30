import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Download, Mail, Phone, Calendar, Baby, MapPin, Heart, Shield, FileText } from "lucide-react";
import { getEnrollments, updateEnrollmentStatus, downloadDocument } from "@/lib/api/enrollments";

interface Enrollment {
  id: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  parentAddress: string;
  parentCity: string;
  parentState: string;
  childFirstName: string;
  childLastName: string;
  childDOB: string;
  childGender: string;
  allergies: string;
  medications: string;
  medicalConditions: string;
  doctorName: string;
  doctorPhone: string;
  programType: string;
  enrollmentType: string;
  startDate: string;
  emergencyName1: string;
  emergencyPhone1: string;
  emergencyRelation1: string;
  emergencyName2: string;
  emergencyPhone2: string;
  emergencyRelation2: string;
}

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const data = await getEnrollments();
      setEnrollments(data.data || []);
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.parentFirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.parentLastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.childFirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.childLastName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || enrollment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      await updateEnrollmentStatus(id, status);
      setEnrollments((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
      setSelectedEnrollment(null);
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update enrollment status");
    }
  };

  const handleDownloadDocument = async (id: string, type: "birthCertificate" | "immunizationRecords") => {
    try {
      const blob = await downloadDocument(id, type);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to download document:", error);
      alert("Failed to download document");
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };
    const icons = {
      pending: <Clock className="w-3 h-3" />,
      approved: <CheckCircle className="w-3 h-3" />,
      rejected: <XCircle className="w-3 h-3" />,
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {status}
      </span>
    );
  };

  const stats = {
    total: enrollments.length,
    pending: enrollments.filter((e) => e.status === "pending").length,
    approved: enrollments.filter((e) => e.status === "approved").length,
    rejected: enrollments.filter((e) => e.status === "rejected").length,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Enrollment Applications</h1>
        <p className="text-gray-600">Review and manage enrollment applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Total</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Baby className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Approved</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Rejected</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by parent or child name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading enrollments...</p>
          </div>
        ) : filteredEnrollments.length === 0 ? (
          <div className="p-12 text-center">
            <Baby className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No enrollment applications found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Parent</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Child</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{enrollment.parentFirstName} {enrollment.parentLastName}</p>
                        <p className="text-sm text-gray-500">{enrollment.parentEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{enrollment.childFirstName} {enrollment.childLastName}</p>
                        <p className="text-sm text-gray-500">DOB: {new Date(enrollment.childDOB).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{enrollment.programType}</p>
                        <p className="text-sm text-gray-500">{enrollment.enrollmentType}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{new Date(enrollment.startDate).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(enrollment.status)}</td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{new Date(enrollment.submittedAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedEnrollment(enrollment)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEnrollment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-8 flex items-center justify-between rounded-t-3xl">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Enrollment Application</h2>
                <p className="text-blue-100">Submitted on {new Date(selectedEnrollment.submittedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <XCircle className="w-7 h-7 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              {/* Status */}
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                <span className="font-bold text-gray-700 text-lg">Current Status:</span>
                <div className="scale-125">{getStatusBadge(selectedEnrollment.status)}</div>
              </div>

              {/* Parent Information */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-2xl border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  Parent Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Full Name
                    </p>
                    <p className="text-gray-900 font-semibold text-lg">{selectedEnrollment.parentFirstName} {selectedEnrollment.parentLastName}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email
                    </p>
                    <p className="text-gray-900 font-semibold">{selectedEnrollment.parentEmail}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Phone className="w-3 h-3" /> Phone
                    </p>
                    <p className="text-gray-900 font-semibold">{selectedEnrollment.parentPhone}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> Location
                    </p>
                    <p className="text-gray-900 font-semibold">{selectedEnrollment.parentCity}, {selectedEnrollment.parentState}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm md:col-span-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> Address
                    </p>
                    <p className="text-gray-900 font-semibold">{selectedEnrollment.parentAddress}</p>
                  </div>
                </div>
              </div>

              {/* Child Information */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 p-6 rounded-2xl border border-pink-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Baby className="w-5 h-5 text-white" />
                  </div>
                  Child Information
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</p>
                    <p className="text-gray-900 font-semibold text-lg">{selectedEnrollment.childFirstName} {selectedEnrollment.childLastName}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Date of Birth</p>
                    <p className="text-gray-900 font-semibold">{new Date(selectedEnrollment.childDOB).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Gender</p>
                    <p className="text-gray-900 font-semibold capitalize">{selectedEnrollment.childGender}</p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-2xl border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  Medical Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Allergies</p>
                    <p className="text-gray-900">{selectedEnrollment.allergies || "None reported"}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Medications</p>
                    <p className="text-gray-900">{selectedEnrollment.medications || "None"}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm md:col-span-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Medical Conditions</p>
                    <p className="text-gray-900">{selectedEnrollment.medicalConditions || "None reported"}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Doctor's Name</p>
                    <p className="text-gray-900 font-semibold">{selectedEnrollment.doctorName}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Doctor's Phone</p>
                    <p className="text-gray-900 font-semibold">{selectedEnrollment.doctorPhone}</p>
                  </div>
                </div>
              </div>

              {/* Program Details */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-6 rounded-2xl border border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  Program Details
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Program Type</p>
                    <p className="text-gray-900 font-semibold">{selectedEnrollment.programType}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Enrollment Type</p>
                    <p className="text-gray-900 font-semibold">{selectedEnrollment.enrollmentType}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Start Date</p>
                    <p className="text-gray-900 font-semibold">{new Date(selectedEnrollment.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-6 rounded-2xl border border-red-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  Emergency Contacts
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">Contact 1</p>
                    <div className="space-y-2">
                      <p className="text-gray-900 font-semibold">{selectedEnrollment.emergencyName1}</p>
                      <p className="text-sm text-gray-600">{selectedEnrollment.emergencyPhone1}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{selectedEnrollment.emergencyRelation1}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">Contact 2</p>
                    <div className="space-y-2">
                      <p className="text-gray-900 font-semibold">{selectedEnrollment.emergencyName2}</p>
                      <p className="text-sm text-gray-600">{selectedEnrollment.emergencyPhone2}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{selectedEnrollment.emergencyRelation2}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-2xl border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  Uploaded Documents
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleDownloadDocument(selectedEnrollment.id, "birthCertificate")}
                    className="flex items-center justify-between p-4 bg-white hover:bg-purple-50 rounded-xl transition-all shadow-sm hover:shadow-md border border-purple-100"
                  >
                    <span className="font-semibold text-gray-900">Birth Certificate</span>
                    <Download className="w-5 h-5 text-purple-600" />
                  </button>
                  <button
                    onClick={() => handleDownloadDocument(selectedEnrollment.id, "immunizationRecords")}
                    className="flex items-center justify-between p-4 bg-white hover:bg-purple-50 rounded-xl transition-all shadow-sm hover:shadow-md border border-purple-100"
                  >
                    <span className="font-semibold text-gray-900">Immunization Records</span>
                    <Download className="w-5 h-5 text-purple-600" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedEnrollment.status === "pending" && (
                <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
                  <button
                    onClick={() => updateStatus(selectedEnrollment.id, "approved")}
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl hover:from-green-700 hover:to-green-800 transition-all font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <CheckCircle className="w-6 h-6" />
                    Approve Application
                  </button>
                  <button
                    onClick={() => updateStatus(selectedEnrollment.id, "rejected")}
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl hover:from-red-700 hover:to-red-800 transition-all font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <XCircle className="w-6 h-6" />
                    Reject Application
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
