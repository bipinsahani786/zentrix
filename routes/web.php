<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\ServiceController;
use App\Http\Controllers\Web\PostController;
use App\Http\Controllers\Web\AboutController;
use App\Http\Controllers\Web\ContactController;

// ─── Public Pages ────────────────────────────────
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/blog', [PostController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [PostController::class, 'show'])->name('blog.show');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');

// ─── Admin Routes ────────────────────────────────
Route::prefix('admin')->name('admin.')->group(function () {
    // Guest admin routes
    Route::middleware('guest')->group(function () {
        Route::get('/login', [\App\Http\Controllers\Admin\AuthController::class, 'showLogin'])->name('login');
        Route::post('/login', [\App\Http\Controllers\Admin\AuthController::class, 'login'])->name('login.submit');
    });

    // Authenticated admin routes
    Route::middleware('auth')->group(function () {
        Route::post('/logout', [\App\Http\Controllers\Admin\AuthController::class, 'logout'])->name('logout');
        Route::get('/', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

        // FAQs
        Route::resource('faqs', \App\Http\Controllers\Admin\FaqController::class);

        // Services
        Route::resource('services', \App\Http\Controllers\Admin\ServiceController::class);

        // Posts
        Route::resource('posts', \App\Http\Controllers\Admin\PostController::class);

        // Contact Submissions
        Route::get('contact-submissions', [\App\Http\Controllers\Admin\ContactSubmissionController::class, 'index'])->name('contact-submissions.index');
        Route::get('contact-submissions/{submission}', [\App\Http\Controllers\Admin\ContactSubmissionController::class, 'show'])->name('contact-submissions.show');
        Route::put('contact-submissions/{submission}', [\App\Http\Controllers\Admin\ContactSubmissionController::class, 'update'])->name('contact-submissions.update');
        Route::get('contact-submissions-export', [\App\Http\Controllers\Admin\ContactSubmissionController::class, 'export'])->name('contact-submissions.export');

        // Newsletter
        Route::get('newsletter/subscribers', [\App\Http\Controllers\Admin\NewsletterController::class, 'subscribers'])->name('newsletter.subscribers');
        Route::get('newsletter/campaigns', [\App\Http\Controllers\Admin\CampaignController::class, 'index'])->name('newsletter.campaigns');
        Route::get('newsletter/campaigns/create', [\App\Http\Controllers\Admin\CampaignController::class, 'create'])->name('newsletter.campaigns.create');
        Route::post('newsletter/campaigns', [\App\Http\Controllers\Admin\CampaignController::class, 'store'])->name('newsletter.campaigns.store');
        Route::post('newsletter/campaigns/{campaign}/send', [\App\Http\Controllers\Admin\CampaignController::class, 'send'])->name('newsletter.campaigns.send');
        Route::post('newsletter/campaigns/{campaign}/test', [\App\Http\Controllers\Admin\CampaignController::class, 'test'])->name('newsletter.campaigns.test');

        // Team
        Route::resource('team', \App\Http\Controllers\Admin\TeamController::class);

        // Testimonials
        Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class);

        // Media
        Route::get('media', [\App\Http\Controllers\Admin\MediaController::class, 'index'])->name('media.index');
        Route::post('media/upload', [\App\Http\Controllers\Admin\MediaController::class, 'upload'])->name('media.upload');
        Route::delete('media/{media}', [\App\Http\Controllers\Admin\MediaController::class, 'destroy'])->name('media.destroy');

        // Settings
        Route::get('settings', [\App\Http\Controllers\Admin\SettingsController::class, 'index'])->name('settings.index');
        Route::post('settings', [\App\Http\Controllers\Admin\SettingsController::class, 'update'])->name('settings.update');
        Route::post('email/test', [\App\Http\Controllers\Admin\SettingsController::class, 'testEmail'])->name('email.test');
    });
});

// ─── SEO Routes ──────────────────────────────────
Route::get('/sitemap.xml', [\App\Http\Controllers\Web\SitemapController::class, 'index']);
