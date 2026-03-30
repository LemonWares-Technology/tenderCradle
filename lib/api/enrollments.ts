import apiClient from "./client";

export interface EnrollmentData {
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

export const submitEnrollment = async (data: EnrollmentData, files: { birthCertificate: File | null; immunizationRecords: File | null }) => {
  const formData = new FormData();
  
  // Append all form fields
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  
  // Append files
  if (files.birthCertificate) {
    formData.append("birthCertificate", files.birthCertificate);
  }
  if (files.immunizationRecords) {
    formData.append("immunizationRecords", files.immunizationRecords);
  }
  
  const response = await apiClient.post("/enrollments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getEnrollments = async () => {
  const response = await apiClient.get("/enrollments");
  return response.data;
};

export const getEnrollment = async (id: string) => {
  const response = await apiClient.get(`/enrollments/${id}`);
  return response.data;
};

export const updateEnrollmentStatus = async (id: string, status: "approved" | "rejected") => {
  const response = await apiClient.patch(`/enrollments/${id}/status`, { status });
  return response.data;
};

export const downloadDocument = async (id: string, documentType: "birthCertificate" | "immunizationRecords") => {
  const response = await apiClient.get(`/enrollments/${id}/documents/${documentType}`, {
    responseType: "blob",
  });
  return response.data;
};
