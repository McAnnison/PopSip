export function generateOTP(length = 6) {
  const digits = "1234567890";
  return Array.from(
    { length },
    () => digits[Math.floor(Math.random() * 10)]
  ).join("");
}