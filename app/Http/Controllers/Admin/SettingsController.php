<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => Setting::all()->groupBy('group'),
        ]);
    }

    public function update(Request $request)
    {
        foreach ($request->except('_token') as $key => $value) {
            Setting::set($key, $value);
        }
        return back()->with('success', 'Settings updated.');
    }

    public function testEmail()
    {
        try {
            Mail::raw('This is a test email from Zentrix IT Solutions admin panel.', function ($message) {
                $message->to(auth()->user()->email)->subject('Test Email - Zentrix IT Solutions');
            });
            return back()->with('success', 'Test email sent successfully!');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed: ' . $e->getMessage());
        }
    }
}
