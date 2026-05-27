<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\Request;
use Inertia\Inertia;

trait RendersPublicLanding
{
    protected function renderPublicLanding(Request $request, string $component)
    {
        $response = Inertia::render($component)->toResponse($request);
        $response->headers->clearCookie('token', '/');

        return $response;
    }
}
