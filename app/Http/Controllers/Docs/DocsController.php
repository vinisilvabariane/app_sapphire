<?php

namespace App\Http\Controllers\Docs;

use App\Http\Controllers\Concerns\BuildsUserPayload;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocsController extends Controller
{
    use BuildsUserPayload;

    public function index(Request $request)
    {
        $user = $request->attributes->get('jwt_user');

        return Inertia::render('docs/DocsPage', [
            'user' => $this->userPayload($user),
        ]);
    }
}
