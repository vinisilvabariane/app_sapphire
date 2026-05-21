<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtAuthenticate
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken() ?: $request->cookie('token');

        if (! $token) {
            return redirect('/login');
        }

        try {
            $payload = JWT::decode($token, new Key($this->jwtSecret(), 'HS256'));
            $user = User::query()->find((int) $payload->sub);

            if (! $user) {
                return redirect('/login');
            }

            $request->attributes->set('jwt_user', $user);
        } catch (\Throwable) {
            return redirect('/login');
        }

        return $next($request);
    }

    private function jwtSecret(): string
    {
        $secret = (string) (config('services.jwt.secret') ?: config('app.key'));

        if (str_starts_with($secret, 'base64:')) {
            $decoded = base64_decode(substr($secret, 7), true);

            if ($decoded !== false) {
                return $decoded;
            }
        }

        return $secret;
    }
}
