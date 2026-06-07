<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    public function subscribers()
    {
        return Inertia::render('Admin/Newsletter/Subscribers', [
            'subscribers' => NewsletterSubscriber::latest()->paginate(20),
        ]);
    }
}
