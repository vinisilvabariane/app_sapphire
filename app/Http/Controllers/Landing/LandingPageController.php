<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Concerns\RendersPublicLanding;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LandingPageController extends Controller
{
    use RendersPublicLanding;

    public function index(Request $request)
    {
        return $this->renderPublicLanding($request, 'landing/LandingPage');
    }
}
