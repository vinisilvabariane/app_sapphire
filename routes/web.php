<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

$userPayload = static function ($user): ?array {
    if (! $user) {
        return null;
    }

    return [
        'name' => $user->name,
        'email' => $user->email,
        'created_at' => $user->created_at?->toIso8601String(),
        'onboarded_at' => $user->onboarded_at?->toIso8601String(),
        'last_login_at' => $user->last_login_at?->toIso8601String(),
    ];
};

$renderPublicLanding = static function (Request $request, string $component) {
    $response = Inertia::render($component)->toResponse($request);
    $response->headers->clearCookie('token', '/');
    return $response;
};

Route::get('/', function (Request $request) use ($renderPublicLanding) {
    return $renderPublicLanding($request, 'landing/LandingPage');
});

Route::get('/planos', function (Request $request) use ($renderPublicLanding) {
    return $renderPublicLanding($request, 'landing/PricingPage');
});

Route::get('/recursos', function (Request $request) use ($renderPublicLanding) {
    return $renderPublicLanding($request, 'landing/HowItWorksPage');
});

Route::redirect('/como-funciona', '/recursos');

Route::get('/perguntas-frequentes', function (Request $request) use ($renderPublicLanding) {
    return $renderPublicLanding($request, 'landing/FaqPage');
});

Route::get('/home', function () use ($userPayload) {
    $user = request()->attributes->get('jwt_user');

    return Inertia::render('home/HomePage', [
        'user' => $userPayload($user),
        'showOnboarding' => $user?->onboarded_at === null,
    ]);
})->middleware('jwt.auth');

Route::get('/workspaces', function () use ($userPayload) {
    $user = request()->attributes->get('jwt_user');

    return Inertia::render('workspaces/WorkspacesPage', [
        'user' => $userPayload($user),
    ]);
})->middleware('jwt.auth');

Route::get('/settings', function () use ($userPayload) {
    $user = request()->attributes->get('jwt_user');

    return Inertia::render('settings/SettingsPage', [
        'user' => $userPayload($user),
        'session' => [
            'auth_method' => $user?->google_id ? 'Google' : ($user?->facebook_id ? 'Facebook' : 'E-mail e senha'),
            'created_at' => $user?->created_at?->toIso8601String(),
            'last_login_at' => $user?->last_login_at?->toIso8601String(),
            'onboarded_at' => $user?->onboarded_at?->toIso8601String(),
        ],
    ]);
})->middleware('jwt.auth');

Route::post('/settings/profile', function (Request $request) {
    $user = $request->attributes->get('jwt_user');

    $data = $request->validate([
        'name' => ['required', 'string', 'max:120'],
        'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
    ]);

    $user->update($data);

    return back();
})->middleware('jwt.auth');

Route::post('/onboarding/complete', function (Request $request) {
    $request->attributes->get('jwt_user')?->forceFill([
        'onboarded_at' => now(),
    ])->save();

    return back();
})->middleware('jwt.auth');

Route::post('/settings/onboarding/reset', function (Request $request) {
    $request->attributes->get('jwt_user')?->forceFill([
        'onboarded_at' => null,
    ])->save();

    return redirect('/home');
})->middleware('jwt.auth');
