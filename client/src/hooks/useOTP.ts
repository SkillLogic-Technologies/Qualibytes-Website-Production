// src/services/OTPService.ts

export interface OTPResponse {
  success: boolean;
  message: string;
  sessionId?: string;
  remainingAttempts?: number;
}

const sessions: Record<string, { otp: string; attempts: number }> = {};

export const OTPService = {
  async sendOTP(phone: string, countryCode: string): Promise<OTPResponse> {
    const sessionId = Math.random().toString(36).slice(2);
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();

    sessions[sessionId] = {
      otp,
      attempts: 3,
    };

    console.log("OTP SENT:", otp);

    return {
      success: true,
      message: "OTP sent successfully",
      sessionId,
      remainingAttempts: 3,
    };
  },

  async verifyOTP(sessionId: string, inputOTP: string): Promise<OTPResponse> {
    const session = sessions[sessionId];

    if (!session) {
      return { success: false, message: "Invalid Session" };
    }

    if (session.attempts <= 0) {
      return { success: false, message: "No attempts left", remainingAttempts: 0 };
    }

    if (inputOTP === session.otp) {
      delete sessions[sessionId];
      return { success: true, message: "OTP Verified Successfully" };
    }

    session.attempts -= 1;

    return {
      success: false,
      message: "Incorrect OTP",
      remainingAttempts: session.attempts,
    };
  },

  async resendOTP(phone: string, countryCode: string): Promise<OTPResponse> {
    const sessionId = Math.random().toString(36).slice(2);
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();

    sessions[sessionId] = {
      otp,
      attempts: 3,
    };

    console.log("OTP RESENT:", otp);

    return {
      success: true,
      message: "OTP resent successfully",
      sessionId,
      remainingAttempts: 3,
    };
  },

  getRemainingAttempts(sessionId: string): number {
    return sessions[sessionId]?.attempts ?? 0;
  }
};
