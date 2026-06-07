<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\Setting;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        return Inertia::render('About', [
            'teamMembers' => TeamMember::publicMembers()->get(),
            'testimonials' => Testimonial::featured()->orderBy('order')->limit(3)->get(),
            'settings' => Setting::getGroup('general'),
        ]);
    }
}
