<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePollsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('polls', function (Blueprint $table) {
            $table->increments('id');
            $table->string("title");
            $table->text("content")->nullable();
            $table->integer("multiple")->default(0);
            $table->integer('change')->default(1);
            $table->integer('project_id');
            $table->timestamp("end_date")->nullable();
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
        Schema::dropIfExists('polls');
    }
}
