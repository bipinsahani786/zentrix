<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('case_studies', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('industry')->nullable();
            $table->text('challenge')->nullable();
            $table->text('solution')->nullable();
            $table->text('outcome')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_confidential')->default(true);
            $table->string('thumbnail')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('case_studies');
    }
};
