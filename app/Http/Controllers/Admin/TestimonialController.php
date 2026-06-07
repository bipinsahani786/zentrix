<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index() { return Inertia::render('Admin/Testimonials/Index', ['testimonials' => Testimonial::with('service')->orderBy('order')->get()]); }
    public function create() { return Inertia::render('Admin/Testimonials/Edit', ['testimonial' => null, 'services' => Service::all(['id', 'title'])]); }
    public function store(Request $request) {
        Testimonial::create($request->validate(['name' => 'required|string|max:255', 'designation' => 'nullable|string', 'company' => 'nullable|string', 'content' => 'required|string', 'rating' => 'integer|min:1|max:5', 'image' => 'nullable|string', 'service_id' => 'nullable|exists:services,id', 'is_featured' => 'boolean', 'order' => 'nullable|integer', 'is_active' => 'boolean']));
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial added.');
    }
    public function edit(Testimonial $testimonial) { return Inertia::render('Admin/Testimonials/Edit', ['testimonial' => $testimonial, 'services' => Service::all(['id', 'title'])]); }
    public function update(Request $request, Testimonial $testimonial) {
        $testimonial->update($request->validate(['name' => 'required|string|max:255', 'designation' => 'nullable|string', 'company' => 'nullable|string', 'content' => 'required|string', 'rating' => 'integer|min:1|max:5', 'image' => 'nullable|string', 'service_id' => 'nullable|exists:services,id', 'is_featured' => 'boolean', 'order' => 'nullable|integer', 'is_active' => 'boolean']));
        return back()->with('success', 'Testimonial updated.');
    }
    public function destroy(Testimonial $testimonial) { $testimonial->delete(); return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial removed.'); }
}
