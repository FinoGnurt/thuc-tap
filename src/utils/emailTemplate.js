export const taoNoiDungEmail = (don, emailDaoTao) => {
  const subject = `[Thông báo] GV ${don.tenGV} báo nghỉ dạy - ${don.tenMon} - ${don.lop} - Tuần ${don.tuan}`;

  const body = `Kính gửi Phòng Đào Tạo,

Trưởng khoa vừa duyệt đơn báo nghỉ dạy:

- Giảng viên: ${don.tenGV}
- Môn học: ${don.tenMon}
- Lớp: ${don.lop}
- Tuần: ${don.tuan}
- Lý do: ${don.lyDo}
${don.ghiChuGV ? `- Ghi chú của giảng viên: ${don.ghiChuGV}` : ""}
${don.ghiChuTK ? `- Ghi chú của trưởng khoa: ${don.ghiChuTK}` : ""}

Trân trọng.`;

  return { to: emailDaoTao, subject, body };
};
