<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTwoStepsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('two_steps', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('active')->default(0);
            $table->integer('email')->default(0);
            $table->integer('phone')->default(0);
            $table->string('code')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('two_steps');
    }
}
