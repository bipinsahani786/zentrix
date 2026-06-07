<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'service_type', 'message',
        'urgency', 'source_page', 'ip_address', 'status', 'notes',
    ];

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    public function scopeUrgent($query)
    {
        return $query->where('urgency', 'urgent')->orWhere('urgency', 'emergency');
    }
}
