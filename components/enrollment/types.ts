// Shared types for enrollment form

export interface EnrollmentFormData {
  // Parent Info
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  parentAddress: string;
  parentCity: string;
  parentState: string;
  
  // Child Info
  childFirstName: string;
  childLastName: string;
  childDOB: string;
  childGender: string;
  
  // Medical Info
  allergies: string;
  medications: string;
  medicalConditions: string;
  doctorName: string;
  doctorPhone: string;
  
  // Program Selection
  programType: string;
  enrollmentType: string;
  startDate: string;
  
  // Emergency Contacts
  emergencyName1: string;
  emergencyPhone1: string;
  emergencyRelation1: string;
  emergencyName2: string;
  emergencyPhone2: string;
  emergencyRelation2: string;
  
  // Documents
  birthCertificate: File | null;
  immunizationRecords: File | null;
}

export const initialFormData: EnrollmentFormData = {
  parentFirstName: "", parentLastName: "", parentEmail: "", parentPhone: "",
  parentAddress: "", parentCity: "", parentState: "",
  childFirstName: "", childLastName: "", childDOB: "", childGender: "",
  allergies: "", medications: "", medicalConditions: "", doctorName: "", doctorPhone: "",
  programType: "", enrollmentType: "", startDate: "",
  emergencyName1: "", emergencyPhone1: "", emergencyRelation1: "",
  emergencyName2: "", emergencyPhone2: "", emergencyRelation2: "",
  birthCertificate: null, immunizationRecords: null,
};

export interface StepProps {
  formData: EnrollmentFormData;
  errors: Record<string, string>;
  updateField: (field: keyof EnrollmentFormData, value: any) => void;
}
