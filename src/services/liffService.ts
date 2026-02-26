import liff from "@line/liff";

const LIFF_ID = import.meta.env.VITE_LIFF_ID as string;

export interface LiffProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

/* เรียก liff.init() — ต้องเรียกก่อนใช้ฟังก์ชันอื่นของ LIFF */
export async function initializeLiff(): Promise<void> {
  await liff.init({ liffId: LIFF_ID });
}

/* ตรวจว่า login แล้วหรือยัง ถ้ายัง → redirect ไป LINE Login */
export function ensureLoggedIn(): void {
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href });
  }
}

/* ดึง profile ผู้ใช้ LINE */
export async function getProfile(): Promise<LiffProfile> {
  return await liff.getProfile();
}

/* ตรวจว่าเปิดอยู่ใน LINE app หรือเปล่า */
export function isInClient(): boolean {
  return liff.isInClient();
}

/* ตรวจว่า login แล้วหรือยัง */
export function isLoggedIn(): boolean {
  return liff.isLoggedIn();
}

/* logout จาก LINE */
export function logout(): void {
  liff.logout();
  window.location.reload();
}
