<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Setting;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact', [
            'services' => Service::where('is_active', true)->orderBy('order')->get(['id', 'title', 'slug']),
            'settings' => Setting::getGroup('general'),
            'googleMaps' => Setting::get('google_maps_embed'),
        ]);
    }
}
