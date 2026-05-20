<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\ForgotPasswordRequest;
use App\Http\Requests\Api\Auth\ResetPasswordRequest;
use Illuminate\Support\Facades\Password;

class PasswordResetController extends Controller
{
    public function forgotPassword(ForgotPasswordRequest $request)
    {
        try {
            $status = Password::sendResetLink(
                $request->only('email')
            );

            if ($status === Password::RESET_LINK_SENT) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Link reset password telah dikirim ke email Anda.'
                ], 200);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengirim link reset password. Silakan coba lagi.'
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan pada server.',
                'error_detail' => config('app.debug') ? $e->getMessage() : 'Server Error'
            ], 500);
        }
    }

    public function reset(ResetPasswordRequest $request)
    {
        try {
            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    $user->password = $password;
                    $user->save();
                }
            );

            if ($status === Password::PASSWORD_RESET) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Password berhasil direset. Silakan login dengan password baru Anda.'
                ], 200);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Token reset password tidak valid atau telah kedaluwarsa.'
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan pada server.',
                'error_detail' => config('app.debug') ? $e->getMessage() : 'Server Error'
            ], 500);
        }
    }
}
