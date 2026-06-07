<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('newsletter_subscribers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('name')->nullable();
            $table->enum('status', ['active', 'unsubscribed'])->default('active');
            $table->timestamp('subscribed_at')->nullable();
            $table->timestamp('unsubscribed_at')->nullable();
            $table->string('token')->unique();
            $table->timestamps();
        });

        Schema::create('email_campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('subject');
            $table->longText('content')->nullable();
            $table->string('template')->default('newsletter_campaign');
            $table->enum('status', ['draft', 'scheduled', 'sending', 'sent'])->default('draft');
            $table->timestamp('scheduled_at')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->unsignedInteger('sent_count')->default(0);
            $table->unsignedInteger('open_count')->default(0);
            $table->timestamps();
        });

        Schema::create('campaign_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->constrained('email_campaigns')->cascadeOnDelete();
            $table->foreignId('subscriber_id')->constrained('newsletter_subscribers')->cascadeOnDelete();
            $table->enum('status', ['pending', 'sent', 'failed'])->default('pending');
            $table->timestamp('opened_at')->nullable();
            $table->timestamp('clicked_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('campaign_recipients');
        Schema::dropIfExists('email_campaigns');
        Schema::dropIfExists('newsletter_subscribers');
    }
};
