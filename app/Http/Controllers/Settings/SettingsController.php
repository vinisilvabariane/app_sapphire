<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Concerns\BuildsUserPayload;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SettingsController extends Controller
{
    use BuildsUserPayload;

    public function index(Request $request)
    {
        $user = $request->attributes->get('jwt_user');

        return Inertia::render('settings/SettingsPage', [
            'user' => $this->userPayload($user),
            'session' => [
                'auth_method' => $user?->google_id ? 'Google' : ($user?->facebook_id ? 'Facebook' : 'E-mail e senha'),
                'created_at' => $user?->created_at?->toIso8601String(),
                'last_login_at' => $user?->last_login_at?->toIso8601String(),
                'onboarded_at' => $user?->onboarded_at?->toIso8601String(),
                'show_tutorial' => (bool) $user?->show_tutorial,
            ],
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->attributes->get('jwt_user');

        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
        ]);

        $user->update($data);

        return back();
    }

    public function resetOnboarding(Request $request)
    {
        $request->attributes->get('jwt_user')?->forceFill([
            'onboarded_at' => null,
            'show_tutorial' => true,
        ])->save();

        return redirect('/home');
    }
}
