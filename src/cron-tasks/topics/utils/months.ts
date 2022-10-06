export const getMonth = (month: string) => {
  switch (month) {
    case "Ocak":
      return "01";
    case "Şubat":
      return "02";
    case "Mart":
      return "03";
    case "Nisan":
      return "04";
    case "Mayıs":
      return "05";
    case "Haziran":
      return "06";
    case "Temmuz":
      return "07";
    case "Ağustos":
      return "08";
    case "Eylül":
      return "09";
    case "Ekim":
      return "10";
    case "Kasım":
      return "11";
    case "Aralık":
      return "12";
    default:
      return "01";
  }
}
