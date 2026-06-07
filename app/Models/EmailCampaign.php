<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EmailCampaign extends Model
{
    protected $fillable = [
        'subject', 'content', 'template', 'status',
        'scheduled_at', 'sent_at', 'sent_count', 'open_count',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'sent_at' => 'datetime',
    ];

    public function recipients(): HasMany
    {
        return $this->hasMany(CampaignRecipient::class, 'campaign_id');
    }
}
