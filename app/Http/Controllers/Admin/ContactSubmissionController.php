<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactSubmissionController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactSubmission::latest();

        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('urgency')) $query->where('urgency', $request->urgency);
        if ($request->filled('service_type')) $query->where('service_type', $request->service_type);
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%")
                  ->orWhere('phone', 'like', "%{$request->search}%");
            });
        }

        return Inertia::render('Admin/Contact/Index', [
            'submissions' => $query->paginate(20),
            'filters' => $request->only(['status', 'urgency', 'service_type', 'search']),
        ]);
    }

    public function show(ContactSubmission $submission)
    {
        return Inertia::render('Admin/Contact/Show', ['submission' => $submission]);
    }

    public function update(Request $request, ContactSubmission $submission)
    {
        $validated = $request->validate([
            'status' => 'nullable|in:new,in_review,contacted,closed',
            'notes' => 'nullable|string',
        ]);

        $submission->update($validated);
        return back()->with('success', 'Submission updated.');
    }

    public function export()
    {
        $submissions = ContactSubmission::all();
        $csv = "Date,Name,Email,Phone,Service,Urgency,Status,Message\n";
        foreach ($submissions as $s) {
            $csv .= "\"{$s->created_at}\",\"{$s->name}\",\"{$s->email}\",\"{$s->phone}\",\"{$s->service_type}\",\"{$s->urgency}\",\"{$s->status}\",\"" . str_replace('"', '""', $s->message) . "\"\n";
        }

        return response($csv)->header('Content-Type', 'text/csv')->header('Content-Disposition', 'attachment; filename="leads-export.csv"');
    }
}
