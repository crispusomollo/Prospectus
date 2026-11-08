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
    Schema::create('deal_items', function (Blueprint $table) {
        $table->id();
        $table->foreignId('deal_id')->constrained()->onDelete('cascade');
        $table->foreignId('item_id')->constrained()->onDelete('cascade');
        $table->integer('quantity')->default(1);
        $table->decimal('price_per_unit', 12, 2); // Price locked for this specific transaction
        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deal_items');
    }
};
