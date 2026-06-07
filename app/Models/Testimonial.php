<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Testimonial extends Model
{
    protected $fillable = [
        'name', 'designation', 'company', 'content', 'rating',
        'image', 'service_id', 'is_featured', 'order', 'is_active',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true)->where('is_active', true);
    }
}
