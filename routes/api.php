<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\NewsletterController;

Route::middleware('throttle:5,1')->group(function () {
    Route::post('/contact', [ContactController::class, 'store']);
});

Route::middleware('throttle:3,1')->group(function () {
    Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
});

Route::get('/newsletter/unsubscribe/{token}', [NewsletterController::class, 'unsubscribe']);
