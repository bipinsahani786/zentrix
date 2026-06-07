<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    protected $fillable = [
        'slug', 'title', 'short_description', 'long_description',
        'icon', 'image', 'meta_title', 'meta_description', 'order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function features(): HasMany
    {
        return $this->hasMany(ServiceFeature::class)->orderBy('order');
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(ServiceFaq::class)->orderBy('order');
    }

    public function testimonials(): HasMany
    {
        return $this->hasMany(Testimonial::class);
    }
}
