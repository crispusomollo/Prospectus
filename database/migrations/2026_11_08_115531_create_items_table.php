<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('items', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('sku')->unique();
        // Categorizes your billable assets and professional service layers
        $table->enum('type', ['hardware', 'software', 'consultancy']); 
        $table->decimal('cost_price', 12, 2)->default(0.00); // Your internal cost
        $table->decimal('unit_price', 12, 2); // Your selling price to the client
        $table->integer('stock_level')->default(0); // For physical hardware or retail licenses
        $table->text('description')->nullable();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
