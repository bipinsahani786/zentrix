<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('service_type')->nullable();
            $table->text('message')->nullable();
            $table->enum('urgency', ['normal', 'urgent', 'emergency'])->default('normal');
            $table->string('source_page')->nullable();
            $table->string('ip_address')->nullable();
            $table->enum('status', ['new', 'in_review', 'contacted', 'closed'])->default('new');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_submissions');
    }
};
