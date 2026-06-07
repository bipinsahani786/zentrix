<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\PostTag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Posts/Index', [
            'posts' => Post::with('category')->latest()->paginate(20),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => null,
            'categories' => PostCategory::all(),
            'tags' => PostTag::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:posts',
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'category_id' => 'nullable|exists:post_categories,id',
            'post_type' => 'required|in:blog,case_study,guide,news',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'tags' => 'nullable|array',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['title']);
        $validated['author_id'] = auth()->id();

        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $tags = $validated['tags'] ?? [];
        unset($validated['tags']);

        $post = Post::create($validated);
        $post->tags()->sync($tags);

        return redirect()->route('admin.posts.index')->with('success', 'Post created.');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post->load('tags'),
            'categories' => PostCategory::all(),
            'tags' => PostTag::all(),
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'category_id' => 'nullable|exists:post_categories,id',
            'post_type' => 'required|in:blog,case_study,guide,news',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'tags' => 'nullable|array',
        ]);

        $tags = $validated['tags'] ?? [];
        unset($validated['tags']);

        $post->update($validated);
        $post->tags()->sync($tags);

        return back()->with('success', 'Post updated.');
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->route('admin.posts.index')->with('success', 'Post deleted.');
    }
}
