import api from "@/api/axiosClient";
import defaultDB from "@/data/defaultDB.json";

export async function getDanhSachMonHoc() {
  const res = await api.get("/monHoc");
  return res.data;
}

export async function resetMonHoc() {
  const { data } = await api.get("/monHoc");
  const { monHoc } = defaultDB;
  for (const don of data) {
    for (const mon of monHoc) {
      if (mon.id === don.id) {
        await api.put(`/monHoc/${don.id}`, mon);
      }
    }
  }
}
