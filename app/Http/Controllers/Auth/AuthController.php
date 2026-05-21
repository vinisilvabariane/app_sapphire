<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends BaseController
{
    public function index(Request $request): RedirectResponse|Response
    {
        if ($this->resolveUserFromToken($request) !== null) {
            return redirect('/home');
        }
        return Inertia::render('auth/Login');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);
        $user = User::query()->where('email', $credentials['email'])->first();
        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return back()->withErrors([
                'email' => 'Credenciais invalidas.',
            ]);
        }
        $ttl = (int) config('services.jwt.ttl', 3600);
        $token = $this->generateToken($user, $ttl);
        return redirect('/home')->cookie(
            'token',
            $token,
            max(1, (int) ceil($ttl / 60)),
            '/',
            null,
            false,
            true,
            false,
            'Lax'
        );
    }

    public function register(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name'                  => ['required', 'string', 'max:255'],
            'email'                 => ['required', 'email', 'unique:users,email'],
            'password'              => ['required', 'confirmed', Password::min(8)],
        ]);

        $user = User::query()->create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $ttl = (int) config('services.jwt.ttl', 3600);
        $token = $this->generateToken($user, $ttl);

        return redirect('/home')->cookie(
            'token',
            $token,
            max(1, (int) ceil($ttl / 60)),
            '/',
            null,
            false,
            true,
            false,
            'Lax'
        );
    }

    public function logout(): RedirectResponse
    {
        return redirect('/login')->withoutCookie('token');
    }

    private function generateToken(User $user, int $ttl): string
    {
        $now = time();

        $payload = [
            'iss' => config('app.url'),
            'iat' => $now,
            'exp' => $now + $ttl,
            'sub' => $user->id,
            'email' => $user->email,
            'name' => $user->name,
        ];

        return JWT::encode($payload, $this->jwtSecret(), 'HS256');
    }

    private function resolveUserFromToken(Request $request): ?User
    {
        $token = $request->cookie('token');
        if (! $token) {
            return null;
        }

        try {
            $payload = JWT::decode($token, new Key($this->jwtSecret(), 'HS256'));
            return User::query()->find((int) $payload->sub);
        } catch (\Throwable) {
            return null;
        }
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
