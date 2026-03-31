// import api from "@/api/axiosClient";
// import defaultDB from "@/data/defaultDB.json";

// export async function getDanhSachMonHoc() {
//   const res = await api.get("/monHoc");
//   return res.data;
// }

// export async function resetMonHoc() {
//   const { data } = await api.get("/monHoc");
//   const { monHoc } = defaultDB;
//   for (const don of data) {
//     for (const mon of monHoc) {
//       if (mon.id === don.id) {
//         await api.put(`/monHoc/${don.id}`, mon);
//       }
//     }
//   }
// }

import api from "@/api/axiosClient";
import defaultDB from "@/data/defaultDB.json";

export async function getDanhSachKeHoach() {
  const res = await api.get("/monHoc");
  return res.data[0]; // { success, total, tongSoTiet, daDayTong, chuaDayTong, data[] }
}

export async function getChiTietKeHoach(id) {
  const res = await api.get(`/monHoc`);
  const data = res.data[0].data[id - 1];
  return data;
}

// Giữ lại các hàm cũ nếu vẫn dùng ở nơi khác
export async function getDanhSachMonHoc() {
  const res = await api.get("/monHoc");
  return res.data[0].data;
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

export async function updateNote(idMonHoc, tuan = "", text) {
  const { data } = await api.get("/monHoc");

  console.log(data);

  const findMonHoc = data[0].data.find((mon) => mon.id === Number(idMonHoc));
  const updateNote = findMonHoc.cacTuan.map((tuanHoc) => {
    if (tuanHoc.tuan === tuan) {
      return {
        ...tuanHoc,
        ghiChu: text,
      };
    }
    return tuanHoc;
  });

  const updateMonHoc = data[0].data.map((mon) => {
    if (mon.id === Number(idMonHoc)) {
      return {
        ...mon,
        cacTuan: updateNote,
      };
    }
    return mon;
  });

  const res = await api.put(`/monHoc/${data[0].id}`, {
    ...data[0],
    data: updateMonHoc,
  });

  return res.data.data.find((mon) => mon.id === Number(idMonHoc)).cacTuan;
}
