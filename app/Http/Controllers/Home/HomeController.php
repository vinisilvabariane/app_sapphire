<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Concerns\BuildsUserPayload;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    use BuildsUserPayload;

    public function index(Request $request)
    {
        $user = $request->attributes->get('jwt_user');

        return Inertia::render('home/HomePage', [
            'user' => $this->userPayload($user),
            'showTutorial' => (bool) $user?->show_tutorial,
        ]);
    }
}
