<?php

namespace App\Http\Controllers\Concerns;

trait BuildsUserPayload
{
    protected function userPayload($user): ?array
    {
        if (! $user) {
            return null;
        }

        return [
            'name' => $user->name,
            'email' => $user->email,
            'created_at' => $user->created_at?->toIso8601String(),
            'onboarded_at' => $user->onboarded_at?->toIso8601String(),
            'show_tutorial' => (bool) $user->show_tutorial,
            'last_login_at' => $user->last_login_at?->toIso8601String(),
        ];
    }
}
