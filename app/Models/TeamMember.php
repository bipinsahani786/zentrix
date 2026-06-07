<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = ['name', 'designation', 'bio', 'image', 'order', 'is_active', 'show_public'];

    protected $casts = [
        'is_active' => 'boolean',
        'show_public' => 'boolean',
    ];

    public function scopePublicMembers($query)
    {
        return $query->where('is_active', true)->orderBy('order');
    }
}
