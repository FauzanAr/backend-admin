export const indonesianPhoneNumber = (val: string) => {
  let phoneNumber = val.replace(/\D/g, '');

  if (phoneNumber.startsWith('0')) {
    phoneNumber = '+62' + phoneNumber.slice(1);
  }

  if (phoneNumber.startsWith('62') && !phoneNumber.startsWith('+62')) {
    phoneNumber = '+' + phoneNumber;
  }

  if (phoneNumber.startsWith('8')) {
    phoneNumber = '+62' + phoneNumber;
  }

  if (!phoneNumber.startsWith('+62')) {
    phoneNumber = '+62' + phoneNumber;
  }

  return phoneNumber;
}

export const generate6DigitOtp = () => {
  let otp = Math.floor(Math.random() * 900000) + 100000;
  return otp.toString();
}

export const generateString = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
}