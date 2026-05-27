<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OnboardingController extends Controller
{
    public function complete(Request $request)
    {
        $request->attributes->get('jwt_user')?->forceFill([
            'onboarded_at' => now(),
            'show_tutorial' => false,
        ])->save();

        return back();
    }
}
