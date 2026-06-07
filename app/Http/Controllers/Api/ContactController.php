<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use App\Mail\ContactConfirmation;
use App\Mail\ContactAdminNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'service_type' => 'nullable|string|max:100',
            'message' => 'nullable|string|max:5000',
            'urgency' => 'nullable|in:normal,urgent,emergency',
            'source_page' => 'nullable|string|max:100',
        ]);

        $submission = ContactSubmission::create(array_merge($validated, [
            'ip_address' => $request->ip(),
            'urgency' => $validated['urgency'] ?? 'normal',
        ]));

        // Queue emails
        try {
            Mail::to($submission->email)->queue(new ContactConfirmation($submission));
            Mail::to(config('mail.admin_email', 'admin@zentrixit.com'))->queue(new ContactAdminNotification($submission));
        } catch (\Exception $e) {
            // Log but don't fail the submission
            \Log::error('Failed to queue contact emails: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Your inquiry has been received. We will contact you shortly.',
            'urgency_response' => match ($submission->urgency) {
                'emergency' => 'We will respond within 30 minutes.',
                'urgent' => 'We will respond within 1 hour.',
                default => 'We will respond within 2 hours during business hours.',
            },
        ]);
    }
}
