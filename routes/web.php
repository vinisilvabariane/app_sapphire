<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (Request $request) {
    $response = Inertia::render('landing/LandingPage')->toResponse($request);
    $response->headers->clearCookie('token', '/');
    return $response;
});

Route::get('/home', function () {
    $user = request()->attributes->get('jwt_user');
    return Inertia::render('home/HomePage', [
        'user' => $user ? [
            'name' => $user->name,
            'email' => $user->email,
        ] : null,
    ]);
})->middleware('jwt.auth');
