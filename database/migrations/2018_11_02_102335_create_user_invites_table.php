<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserInvitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_invites', function (Blueprint $table) {
            //invite zelf
            $table->increments('id');
            $table->integer('company_id');
            $table->text('token');
            $table->timestamp('end_date')->nullable();
            $table->text('message')->nullable();
            $table->integer('user_id');
            $table->string('groups')->nullable();

            //rechten
            $table->integer('create_members')->default(0);
            $table->integer('create_groups')->default(0);
            $table->integer('create_projects')->default(0);
            $table->integer('company_settings')->default(0);
            $table->integer('upload_avatar')->default(0);
            $table->integer('change_online')->default(0);

            //gegevens
            $table->String('email');
            $table->string('name');
            $table->string('lastname');
            $table->string('username')->nullable();
            $table->string('password', 60)->nullable();
            $table->integer('owner')->default(0);
            $table->integer('admin')->default(0);
            $table->string('street')->nullable();
            $table->string('phone')->nullable();
            $table->integer('city_id')->default(1);
            $table->text('biografy')->nullable();
            $table->date('birthdate')->nullable();
            $table->string('function')->nullable();
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
        Schema::dropIfExists('user_invites');
    }
}
