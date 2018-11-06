<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IndustriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('industries')->insert(
            ['name' => 'Accounting']
        );
        DB::table('industries')->insert(
            ['name' => 'Airlines/Aviation']
        );
        DB::table('industries')->insert(
            ['name' => 'Alternative Dispute Resolution']
        );
        DB::table('industries')->insert(
            ['name' => 'Alternative Medicine']
        ); DB::table('industries')->insert(
        ['name' => 'Animation']
    );
        DB::table('industries')->insert(
            ['name' => 'Apparel/Fashion']
        );
        DB::table('industries')->insert(
            ['name' => 'Architecture/Planning']
        );

    }
}
