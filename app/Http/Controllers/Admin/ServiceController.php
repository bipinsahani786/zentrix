<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => Service::with('features', 'faqs')->orderBy('order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Services/Edit', ['service' => null]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:services',
            'short_description' => 'nullable|string',
            'long_description' => 'nullable|string',
            'icon' => 'nullable|string',
            'image' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['title']);
        Service::create($validated);

        return redirect()->route('admin.services.index')->with('success', 'Service created.');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Admin/Services/Edit', [
            'service' => $service->load('features', 'faqs'),
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'nullable|string',
            'long_description' => 'nullable|string',
            'icon' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $service->update($validated);
        return back()->with('success', 'Service updated.');
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->route('admin.services.index')->with('success', 'Service deleted.');
    }
}
