<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Pastikan user sudah login dan memiliki role
        if (!$request->user() || !$request->user()->role) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        // Cek apakah name role user ada dalam parameter middleware
        if (!in_array($request->user()->role->name, $roles)) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses (Akses khusus: ' . implode(', ', $roles) . ').'
            ], 403);
        }

        return $next($request);
    }
}