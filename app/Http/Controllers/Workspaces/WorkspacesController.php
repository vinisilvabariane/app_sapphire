<?php

namespace App\Http\Controllers\Workspaces;

use App\Http\Controllers\Concerns\BuildsUserPayload;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkspacesController extends Controller
{
    use BuildsUserPayload;

    public function index(Request $request)
    {
        $user = $request->attributes->get('jwt_user');

        return Inertia::render('workspaces/WorkspacesPage', [
            'user' => $this->userPayload($user),
        ]);
    }
}
