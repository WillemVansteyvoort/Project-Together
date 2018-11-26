<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        //plans
        DB::table('plans')->insert(
            ['name' => 'Standard', 'users' => 25, 'projects' => 10]
        );


        //cities
        DB::table('cities')->insert(
            ['name' => '', 'country_id' => 1]
        );

        //countries
        DB::table('countries')->insert(
            ['name' => '']
        );
        DB::table('countries')->insert(
            ['name' => 'Afghanistan']
        );
        //countries
        DB::table('countries')->insert(
            ['name' => 'Albania']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Algeria']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Andorra']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Angola']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Argentina']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Armenia']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Australia']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Austria']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Azerbaijan']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Bahamas']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Bahrain']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Bangladesh']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Barbados']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Belarus']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Belgium']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Belize']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Benin']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Bhutan']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Bolivia']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Bosnia Herzegovina']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Botswana']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Brazil']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Brunei']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Bulgaria']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Burkina']
        ); //countries
        DB::table('countries')->insert(
            ['name' => 'Burundi']
        );


        //industries
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
