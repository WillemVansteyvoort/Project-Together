<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id');
            $table->string('name');
            $table->integer('user_id');
            $table->text('description')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('public');
            $table->integer('status')->default(0);
            $table->integer('tasks');
            $table->integer('notes');
            $table->integer('forum');
            $table->integer('presences');
            $table->integer('polls');
            $table->integer('activities');
            $table->integer('crisiscenter');
            $table->integer('logs');
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
        Schema::dropIfExists('projects');
    }
}
