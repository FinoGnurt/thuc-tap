import examData from "@/data/examSchedule.json";

export const giangVienList = [...new Set(examData.map((d) => d.giangVien))];
export const maLopList = [...new Set(examData.map((d) => d.maLop))];
