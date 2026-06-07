<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use App\Mail\NewsletterWelcome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'name' => 'nullable|string|max:255',
        ]);

        $existing = NewsletterSubscriber::where('email', $validated['email'])->first();

        if ($existing) {
            if ($existing->status === 'unsubscribed') {
                $existing->update(['status' => 'active', 'subscribed_at' => now(), 'unsubscribed_at' => null]);
                return response()->json(['success' => true, 'message' => 'Welcome back! You\'ve been re-subscribed.']);
            }
            return response()->json(['success' => true, 'message' => 'You\'re already subscribed!']);
        }

        $subscriber = NewsletterSubscriber::create($validated);

        try {
            Mail::to($subscriber->email)->queue(new NewsletterWelcome($subscriber));
        } catch (\Exception $e) {
            \Log::error('Failed to send welcome email: ' . $e->getMessage());
        }

        return response()->json(['success' => true, 'message' => 'Successfully subscribed! Check your email for confirmation.']);
    }

    public function unsubscribe(string $token)
    {
        $subscriber = NewsletterSubscriber::where('token', $token)->firstOrFail();
        $subscriber->update(['status' => 'unsubscribed', 'unsubscribed_at' => now()]);

        return redirect('/')->with('message', 'You have been successfully unsubscribed.');
    }
}
