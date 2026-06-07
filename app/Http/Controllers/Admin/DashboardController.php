<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use App\Models\NewsletterSubscriber;
use App\Models\Post;
use App\Models\Service;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_leads_today' => ContactSubmission::whereDate('created_at', today())->count(),
                'total_leads_week' => ContactSubmission::where('created_at', '>=', now()->startOfWeek())->count(),
                'total_leads_month' => ContactSubmission::where('created_at', '>=', now()->startOfMonth())->count(),
                'new_subscribers' => NewsletterSubscriber::active()->count(),
                'active_services' => Service::where('is_active', true)->count(),
                'published_posts' => Post::published()->count(),
            ],
            'recentLeads' => ContactSubmission::latest()->limit(5)->get(),
            'chartData' => ContactSubmission::selectRaw('DATE(created_at) as date, COUNT(*) as count')
                ->where('created_at', '>=', now()->subDays(30))
                ->groupByRaw('DATE(created_at)')
                ->orderBy('date')
                ->get(),
        ]);
    }
}
