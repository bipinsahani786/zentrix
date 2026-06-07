<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CampaignRecipient extends Model
{
    protected $fillable = ['campaign_id', 'subscriber_id', 'status', 'opened_at', 'clicked_at'];

    protected $casts = [
        'opened_at' => 'datetime',
        'clicked_at' => 'datetime',
    ];

    public function campaign(): BelongsTo
    {
        return $this->belongsTo(EmailCampaign::class, 'campaign_id');
    }

    public function subscriber(): BelongsTo
    {
        return $this->belongsTo(NewsletterSubscriber::class, 'subscriber_id');
    }
}
