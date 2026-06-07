<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EmailCampaign;
use App\Models\NewsletterSubscriber;
use App\Models\CampaignRecipient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class CampaignController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Newsletter/Campaigns', [
            'campaigns' => EmailCampaign::latest()->paginate(20),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Newsletter/Create', [
            'subscriberCount' => NewsletterSubscriber::active()->count(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
            'scheduled_at' => 'nullable|date|after:now',
        ]);

        $campaign = EmailCampaign::create(array_merge($validated, [
            'status' => $validated['scheduled_at'] ? 'scheduled' : 'draft',
        ]));

        return redirect()->route('admin.newsletter.campaigns')->with('success', 'Campaign created.');
    }

    public function send(EmailCampaign $campaign)
    {
        $subscribers = NewsletterSubscriber::active()->get();
        foreach ($subscribers as $subscriber) {
            CampaignRecipient::create([
                'campaign_id' => $campaign->id,
                'subscriber_id' => $subscriber->id,
            ]);
        }

        $campaign->update(['status' => 'sent', 'sent_at' => now(), 'sent_count' => $subscribers->count()]);
        return back()->with('success', 'Campaign sent to ' . $subscribers->count() . ' subscribers.');
    }

    public function test(EmailCampaign $campaign)
    {
        try {
            Mail::raw($campaign->content, function ($message) use ($campaign) {
                $message->to(config('mail.admin_email', 'admin@zentrixit.com'))
                        ->subject('[TEST] ' . $campaign->subject);
            });
            return back()->with('success', 'Test email sent to admin.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to send test email: ' . $e->getMessage());
        }
    }
}
