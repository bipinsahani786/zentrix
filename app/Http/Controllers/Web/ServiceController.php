<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\CaseStudy;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Services/Index', [
            'services' => Service::where('is_active', true)->with(['features', 'faqs'])->orderBy('order')->get(),
            'caseStudies' => CaseStudy::featured()->limit(3)->get(),
        ]);
    }

    public function show(string $slug)
    {
        $service = Service::where('slug', $slug)->where('is_active', true)->with(['features', 'faqs', 'testimonials' => function ($q) {
            $q->where('is_active', true)->limit(3);
        }])->firstOrFail();

        $relatedServices = Service::where('slug', '!=', $slug)->where('is_active', true)->orderBy('order')->limit(3)->get();

        return Inertia::render('Services/Show', [
            'service' => $service,
            'relatedServices' => $relatedServices,
        ]);
    }
}
