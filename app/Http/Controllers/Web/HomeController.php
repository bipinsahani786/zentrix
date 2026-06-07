<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Post;
use App\Models\Testimonial;
use App\Models\CaseStudy;
use App\Models\TeamMember;
use App\Models\Setting;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'services' => Service::where('is_active', true)->orderBy('order')->get(),
            'testimonials' => Testimonial::featured()->orderBy('order')->limit(6)->get(),
            'posts' => Post::published()->with('category')->latest('published_at')->limit(3)->get(),
            'caseStudy' => CaseStudy::featured()->first(),
            'teamMembers' => TeamMember::publicMembers()->limit(3)->get(),
            'faqs' => \App\Models\Faq::where('is_active', true)->orderBy('sort_order')->get(),
            'settings' => Setting::getGroup('general'),
        ]);
    }
}
