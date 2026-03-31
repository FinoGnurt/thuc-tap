import api from "@/api/axiosClient";

export async function getDanhSachBaoNghi() {
  const res = await api.get("/baoNghi");
  return res.data;
}

export async function themBaoNghi(data) {
  const id = "BN" + Date.now();
  const don = {
    ...data,
    idBaoNghi: id,
    trangThai: "cho_duyet",
    ngayGui: new Date().toLocaleDateString("vi-VN"),
    emailDaGui: false,
  };
  const res = await api.post("/baoNghi", don);
  return res.data;
}

export async function duyetBaoNghi(donId, data, ghiChuTK = "") {
  try {
    // 1. Duyệt đơn
    const { data: donBaoNghi } = await api.put(`/baoNghi/${donId}`, {
      ...data,
      trangThai: "da_duyet",
      ghiChuTK,
      ngayDuyet: new Date().toLocaleDateString("vi-VN"),
    });

    // 2. Lấy danh sách môn học
    const { data: monHocRes } = await api.get(`/monHoc`);

    const response = monHocRes[0]; // object chứa data
    const danhSachMon = response.data;

    // 3. Update đúng môn học theo id
    const danhSachUpdated = danhSachMon.map((mon) => {
      if (mon.id === Number(donBaoNghi.idMonHoc)) {
        return {
          ...mon,
          cacTuan: mon.cacTuan.map((tuan) => {
            if (tuan.tuan === donBaoNghi.tuan) {
              return {
                ...tuan,
                daDay: 0,
                trangThai: "da_duyet",
              };
            }
            return tuan;
          }),
        };
      }
      return mon;
    });

    // 4. Gửi lại API (tuỳ backend của bạn)
    await api.put(`/monHoc/${response.id}`, {
      ...response,
      data: danhSachUpdated,
    });

    return donBaoNghi;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function tuChoiBaoNghi(donId, data, ghiChuTK = "") {
  const res = await api.put(`/baoNghi/${donId}`, {
    ...data,
    ghiChuTK,
    trangThai: "tu_choi",
  });
  return res.data;
}

export async function danhDauDaGuiEmail(donId) {
  try {
    const res = await api.put(`/baoNghi/${donId}`, {
      emailDaGui: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function resetBaoNghi() {
  const { data } = await api.get("/baoNghi");

  const deletes = data.map((don) => api.delete(`/baoNghi/${don.id}`));

  await Promise.all(deletes);
}
