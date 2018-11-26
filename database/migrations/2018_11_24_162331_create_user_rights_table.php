<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserRightsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_rights', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('create_members')->default(0);
            $table->integer('create_groups')->default(0);
            $table->integer('create_projects')->default(0);
            $table->integer('company_settings')->default(0);
            $table->integer('upload_avatar')->default(0);
            $table->integer('change_online')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_rights');
    }
}
