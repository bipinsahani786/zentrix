<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CaseStudy extends Model
{
    protected $fillable = [
        'slug', 'title', 'industry', 'challenge', 'solution',
        'outcome', 'is_featured', 'is_confidential', 'thumbnail', 'order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_confidential' => 'boolean',
    ];

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
