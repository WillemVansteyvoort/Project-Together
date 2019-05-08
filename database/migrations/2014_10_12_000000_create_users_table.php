<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(/**
         * @param Blueprint $table
         */
            'users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('lastname');
            $table->string('username')->nullable();
            $table->string('email');
            $table->string('password', 60)->nullable();
            $table->text('avatar')->nullable();
            $table->string('provider')->nullable();
            $table->string('provider_id')->nullable();
            $table->integer('company_id')->nullable();
            $table->integer('owner')->default(0);
            $table->integer('admin')->default(0);
            $table->integer('termsOfService')->nullable();
            $table->integer('privacyPolicy')->nullable();
            $table->integer('verified')->default(0);
            $table->string('street')->nullable();
            $table->string('phone')->nullable();
            $table->string('website')->nullable();
            $table->integer('city_id')->default(1);
            $table->string('twitter')->nullable();
            $table->string('facebook')->nullable();
            $table->string('google')->nullable();
            $table->text('biografy')->nullable();
            $table->date('birthdate')->nullable();
            $table->integer('status')->default(0);
            $table->integer('welcome')->default(0);
            $table->string('function')->nullable();
            $table->timestamp('last_activity')->default(date(now()));
            $table->integer('online')->default(1);
            $table->integer('newsletter')->default(0);
            $table->integer('hide_data')->default(0);
            $table->integer('notifications')->default(1);
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
