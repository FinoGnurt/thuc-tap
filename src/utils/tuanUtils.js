/**
 * Parse chuỗi ngày dạng "dd/mm/yy" → Date (20xx)
 */
export function parseDateVN(str) {
  const [d, m, y] = str.split("/");
  return new Date(`20${y}-${m}-${d}`);
}

/**
 * Tìm tuần hiện tại dựa vào ngày hôm nay.
 * Nếu không rơi vào tuần nào → lấy tuần gần nhất đã qua.
 */
export function getTuanHienTai(cacTuan) {
  const today = new Date();

  for (const t of cacTuan) {
    const start = parseDateVN(t.batDau);
    const end = parseDateVN(t.ketThuc);
    end.setHours(23, 59, 59);
    if (today >= start && today <= end) return t.tuan;
  }

  for (let i = cacTuan.length - 1; i >= 0; i--) {
    const end = parseDateVN(cacTuan[i].ketThuc);
    if (today > end) return cacTuan[i].tuan;
  }

  return cacTuan[0]?.tuan ?? 1;
}

/**
 * Chia mảng thành các nhóm tối đa `size` phần tử.
 * @param {Array} arr
 * @param {number} size
 * @returns {Array[]}
 */
export function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Tính tổng đã dạy / tổng dự kiến tính đến tuần `denTuan` (bao gồm).
 */
export function tinhTongDenTuan(cacTuan, denTuan) {
  const filtered = cacTuan.filter((t) => t.tuan <= denTuan);
  return {
    tongDaDay: filtered.reduce((s, t) => s + (t.daDay ?? 0), 0),
    tongDuKien: filtered.reduce((s, t) => s + (t.duKien ?? 0), 0),
  };
}
