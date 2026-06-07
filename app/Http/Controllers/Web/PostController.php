<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\PostTag;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::published()
            ->with('category', 'tags')
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'categories' => PostCategory::withCount(['posts' => fn($q) => $q->published()])->get(),
            'tags' => PostTag::all(),
            'featuredPost' => Post::published()->latest('published_at')->first(),
        ]);
    }

    public function show(string $slug)
    {
        $post = Post::where('slug', $slug)->published()->with('category', 'tags', 'author')->firstOrFail();
        $post->increment('views');

        $relatedPosts = Post::published()
            ->where('id', '!=', $post->id)
            ->where('category_id', $post->category_id)
            ->limit(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
