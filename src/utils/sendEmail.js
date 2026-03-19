import emailjs from "@emailjs/browser";
import { taoNoiDungEmail } from "./emailTemplate";

export const sendEmail = (don, emailDaoTao) => {
  const { to, subject } = taoNoiDungEmail(don, emailDaoTao);

  emailjs
    .send(
      "service_x9beim7",
      "template_6xl00bb",
      {
        to_email: to,
        subject: subject,
        tenGV: don.tenGV,
        tenMon: don.tenMon,
        lop: don.lop,
        tuan: don.tuan,
        lyDo: don.lyDo,
        ghiChuGV: don.ghiChuGV || "",
        ghiChuTK: don.ghiChuTK || "",
        year: new Date().getFullYear(),
      },
      "PNvsCQNISD_4sci6A",
    )
    .then((result) => console.log("Email sent!", result.text))
    .catch((error) => console.error("Error sending email:", error));
};
