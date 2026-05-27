<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Concerns\RendersPublicLanding;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HowItWorksPageController extends Controller
{
    use RendersPublicLanding;

    public function index(Request $request)
    {
        return $this->renderPublicLanding($request, 'landing/HowItWorksPage');
    }
}
