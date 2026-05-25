<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller as BaseController;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends BaseController
{
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(): RedirectResponse
    {
        return $this->handleCallback('google', 'google_id');
    }

    public function redirectToFacebook(): RedirectResponse
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function handleFacebookCallback(): RedirectResponse
    {
        return $this->handleCallback('facebook', 'facebook_id');
    }

    private function handleCallback(string $driver, string $idField): RedirectResponse
    {
        try {
            $socialUser = Socialite::driver($driver)->user();
        } catch (\Throwable) {
            return redirect('/login')->withErrors(['email' => 'Falha na autenticação. Tente novamente.']);
        }

        $user = User::query()->where($idField, $socialUser->getId())->first()
            ?? User::query()->where('email', $socialUser->getEmail())->first();

        if ($user) {
            if ($user->$idField === null) {
                $user->update([$idField => $socialUser->getId()]);
            }
        } else {
            $user = User::query()->create([
                'name'    => $socialUser->getName(),
                'email'   => $socialUser->getEmail(),
                $idField  => $socialUser->getId(),
                'password' => null,
            ]);
        }

        $user->forceFill(['last_login_at' => now()])->save();

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
