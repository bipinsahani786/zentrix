<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Media/Index', [
            'media' => Media::latest()->paginate(30),
        ]);
    }

    public function upload(Request $request)
    {
        $request->validate(['file' => 'required|file|max:5120|mimes:jpg,jpeg,png,gif,webp,svg,pdf']);

        $file = $request->file('file');
        $filename = Str::random(32) . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('uploads', $filename, 'public');

        Media::create([
            'filename' => $filename,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'path' => $path,
            'alt_text' => $request->input('alt_text'),
            'uploaded_by' => auth()->id(),
        ]);

        return back()->with('success', 'File uploaded.');
    }

    public function destroy(Media $media)
    {
        \Storage::disk('public')->delete($media->path);
        $media->delete();
        return back()->with('success', 'File deleted.');
    }
}
