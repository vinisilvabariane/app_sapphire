<?php

use App\Http\Controllers\Docs\DocsController;
use App\Http\Controllers\Home\HomeController;
use App\Http\Controllers\Landing\FaqPageController;
use App\Http\Controllers\Landing\HowItWorksPageController;
use App\Http\Controllers\Landing\LandingPageController;
use App\Http\Controllers\Landing\PricingPageController;
use App\Http\Controllers\Onboarding\OnboardingController;
use App\Http\Controllers\Settings\SettingsController;
use App\Http\Controllers\Workspaces\WorkspacesController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'index']);
Route::get('/planos', [PricingPageController::class, 'index']);
Route::get('/recursos', [HowItWorksPageController::class, 'index']);

Route::redirect('/como-funciona', '/recursos');

Route::get('/perguntas-frequentes', [FaqPageController::class, 'index']);

Route::middleware('jwt.auth')->group(function () {
    Route::get('/home', [HomeController::class, 'index']);
    Route::get('/workspaces', [WorkspacesController::class, 'index']);
    Route::get('/documentos', [DocsController::class, 'index']);
    Route::get('/settings', [SettingsController::class, 'index']);

    Route::post('/settings/profile', [SettingsController::class, 'updateProfile']);
    Route::post('/onboarding/complete', [OnboardingController::class, 'complete']);
    Route::post('/settings/onboarding/reset', [SettingsController::class, 'resetOnboarding']);
});
