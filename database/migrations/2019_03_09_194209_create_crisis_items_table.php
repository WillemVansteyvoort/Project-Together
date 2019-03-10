<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCrisisItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('crisis_items', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id');
            $table->integer('user_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('priority')->default(0);
            $table->integer('solved')->default(0);
            $table->timestamp('solvedTime')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crisis_items');
    }
}
