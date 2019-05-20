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
        DB::table('plans')->insert(
            ['name' => 'Pro', 'users' => 100, 'projects' => 50]
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
        DB::table('industries')->insert(
            ['name' => 'Arts/Crafts']
        );
        DB::table('industries')->insert(
            ['name' => 'Automotive']
        );
        DB::table('industries')->insert(
            ['name' => 'Aviation/Aerospace	']
        );
        DB::table('industries')->insert(
        ['name' => 'Banking/Mortgage	']
        );
        DB::table('industries')->insert(
            ['name' => 'Biotechnology/Greentech	']
        );
        DB::table('industries')->insert(
            ['name' => 'Broadcast Media']
        );
        DB::table('industries')->insert(
            ['name' => 'Building Materials']
        );
        DB::table('industries')->insert(
            ['name' => 'Business Supplies/Equipment']
        );
        DB::table('industries')->insert(
            ['name' => 'Capital Markets/Hedge Fund/Private Equity	']
        );
        DB::table('industries')->insert(
            ['name' => 'Chemicals']
        );
        DB::table('industries')->insert(
            ['name' => 'Civic/Social Organization	']
        );
        DB::table('industries')->insert(
            ['name' => 'Civil Engineering	']
        );
        DB::table('industries')->insert(
            ['name' => 'Commercial Real Estate	']
        );
        DB::table('industries')->insert(
            ['name' => 'Computer Games	']
        );
        DB::table('industries')->insert(
            ['name' => 'Computer Hardware	']
        );
        DB::table('industries')->insert(
            ['name' => 'Computer Networking	']
        );
        DB::table('industries')->insert(
            ['name' => 'Computer Software/Engineering	']
        );
        DB::table('industries')->insert(
            ['name' => 'Computer/Network Security	']
        );
        DB::table('industries')->insert(
            ['name' => 'Construction']
        );
        DB::table('industries')->insert(
            ['name' => 'Consumer Electronics	']
        );
        DB::table('industries')->insert(
            ['name' => 'Consumer Goods	']
        );
        DB::table('industries')->insert(
            ['name' => 'Consumer Services	']
        );
        DB::table('industries')->insert(
            ['name' => 'Cosmetics']
        );
        DB::table('industries')->insert(
            ['name' => 'Dairy']
        );
        DB::table('industries')->insert(
            ['name' => 'Defense/Space	']
        );
        DB::table('industries')->insert(
            ['name' => 'Design']
        );
        DB::table('industries')->insert(
            ['name' => 'E-Learning	']
        );
        DB::table('industries')->insert(
            ['name' => 'Education Management	']
        );
        DB::table('industries')->insert(
            ['name' => 'Electrical/Electronic Manufacturing	']
        );
        DB::table('industries')->insert(
            ['name' => 'Entertainment/Movie Production	']
        );
        DB::table('industries')->insert(
            ['name' => 'Environmental Services	']
        );
        DB::table('industries')->insert(
            ['name' => 'Events Services	']
        );
        DB::table('industries')->insert(
            ['name' => 'Executive Office	']
        );
        DB::table('industries')->insert(
            ['name' => 'Facilities Services	']
        );
        DB::table('industries')->insert(
            ['name' => 'Farming']
        );
        DB::table('industries')->insert(
            ['name' => 'Financial Services	']
        );
        DB::table('industries')->insert(
            ['name' => 'Fine Art	']
        );
        DB::table('industries')->insert(
            ['name' => 'Fishery']
        );
        DB::table('industries')->insert(
            ['name' => 'Food Production	']
        );
        DB::table('industries')->insert(
            ['name' => 'Food/Beverages	']
        );
        DB::table('industries')->insert(
            ['name' => 'Fundraising	']
        );
        DB::table('industries')->insert(
            ['name' => 'Furniture']
        );
        DB::table('industries')->insert(
            ['name' => 'Gambling/Casinos	']
        );
        DB::table('industries')->insert(
            ['name' => 'Glass/Ceramics/Concrete	']
        );
        DB::table('industries')->insert(
            ['name' => 'Government Administration	']
        );
        DB::table('industries')->insert(
            ['name' => 'Government Relations	']
        );
        DB::table('industries')->insert(
            ['name' => 'Graphic Design/Web Design	']
        );
        DB::table('industries')->insert(
            ['name' => 'Health/Fitness	']
        );
        DB::table('industries')->insert(
            ['name' => 'Higher Education/Acadamia	']
        );
        DB::table('industries')->insert(
            ['name' => 'Hospital/Health Care	']
        );
        DB::table('industries')->insert(
            ['name' => 'Hospitality']
        );
        DB::table('industries')->insert(
            ['name' => 'Human Resources/HR	']
        );
        DB::table('industries')->insert(
            ['name' => 'Import/Export	']
        );
        DB::table('industries')->insert(
            ['name' => 'Individual/Family Services	']
        );
        DB::table('industries')->insert(
            ['name' => 'Industrial Automation	']
        );
        DB::table('industries')->insert(
            ['name' => 'Information Services	']
        );
        DB::table('industries')->insert(
            ['name' => 'Information Technology/IT	']
        );
        DB::table('industries')->insert(
            ['name' => 'Insurance']
        );
        DB::table('industries')->insert(
            ['name' => 'International Affairs	']
        );
        DB::table('industries')->insert(
            ['name' => 'International Trade/Development	']
        );
        DB::table('industries')->insert(
            ['name' => 'Internet']
        );
        DB::table('industries')->insert(
            ['name' => 'Investment Banking/Venture	']
        );
        DB::table('industries')->insert(
            ['name' => 'Investment Management/Hedge Fund/Private Equity	']
        );
        DB::table('industries')->insert(
            ['name' => 'Judiciary']
        );
        DB::table('industries')->insert(
            ['name' => 'Law Enforcement	']
        );
        DB::table('industries')->insert(
            ['name' => 'Law Practice/Law Firms	']
        );
        DB::table('industries')->insert(
            ['name' => 'Legal Services	']
        );
        DB::table('industries')->insert(
            ['name' => 'Legislative Office	']
        );
        DB::table('industries')->insert(
            ['name' => 'Leisure/Travel	']
        );
        DB::table('industries')->insert(
            ['name' => 'Library	']
        );
        DB::table('industries')->insert(
            ['name' => 'Logistics/Procurement	']
        );
        DB::table('industries')->insert(
            ['name' => 'Luxury Goods/Jewelry	']
        );
        DB::table('industries')->insert(
            ['name' => 'Machinery	']
        );
        DB::table('industries')->insert(
            ['name' => 'Management Consulting	']
        );
        DB::table('industries')->insert(
            ['name' => 'Maritime']
        );
        DB::table('industries')->insert(
            ['name' => 'Market Research	']
        );
        DB::table('industries')->insert(
            ['name' => 'Marketing/Advertising/Sales	']
        );
        DB::table('industries')->insert(
            ['name' => 'Mechanical or Industrial Engineering	']
        );
        DB::table('industries')->insert(
            ['name' => 'Media Production	']
        );
        DB::table('industries')->insert(
            ['name' => 'Medical Equipment	']
        );
        DB::table('industries')->insert(
            ['name' => 'Medical Practice	']
        );
        DB::table('industries')->insert(
            ['name' => 'Mental Health Care	']
        );
        DB::table('industries')->insert(
            ['name' => 'Military Industry	']
        );
        DB::table('industries')->insert(
            ['name' => 'Mining/Metals	']
        );
        DB::table('industries')->insert(
            ['name' => 'Motion Pictures/Film	']
        );
        DB::table('industries')->insert(
            ['name' => 'Museums/Institutions	']
        );
        DB::table('industries')->insert(
            ['name' => 'Music']
        );
        DB::table('industries')->insert(
            ['name' => 'Nanotechnology	']
        );
        DB::table('industries')->insert(
            ['name' => 'Newspapers/Journalism	']
        );
        DB::table('industries')->insert(
            ['name' => 'Non-Profit/Volunteering	']
        );
        DB::table('industries')->insert(
            ['name' => 'Oil/Energy/Solar/Greentech	']
        );
        DB::table('industries')->insert(
            ['name' => 'Online Publishing	']
        );
        DB::table('industries')->insert(
            ['name' => 'Other Industry	']
        );
        DB::table('industries')->insert(
            ['name' => 'Outsourcing/Offshoring	']
        );
        DB::table('industries')->insert(
            ['name' => 'Package/Freight Delivery	']
        );
        DB::table('industries')->insert(
            ['name' => 'Packaging/Containers	']
        );
        DB::table('industries')->insert(
            ['name' => 'Paper/Forest Products	']
        );
        DB::table('industries')->insert(
            ['name' => 'Performing Arts	']
        );
        DB::table('industries')->insert(
            ['name' => 'Pharmaceuticals	']
        );
        DB::table('industries')->insert(
            ['name' => 'Philanthropy']
        );
        DB::table('industries')->insert(
            ['name' => 'Photography']
        );
        DB::table('industries')->insert(
            ['name' => 'Plastics']
        );
        DB::table('industries')->insert(
            ['name' => 'Political Organization	']
        );
        DB::table('industries')->insert(
            ['name' => 'Primary/Secondary Education	']
        );
        DB::table('industries')->insert(
            ['name' => 'Printing']
        );
        DB::table('industries')->insert(
            ['name' => 'Professional Training	']
        );
        DB::table('industries')->insert(
            ['name' => 'Program Development	']
        );
        DB::table('industries')->insert(
            ['name' => 'Public Relations/PR	']
        );
        DB::table('industries')->insert(
            ['name' => 'Public Safety	']
        );
        DB::table('industries')->insert(
            ['name' => 'Publishing Industry	']
        );
        DB::table('industries')->insert(
            ['name' => 'Railroad Manufacture	']
        );
        DB::table('industries')->insert(
            ['name' => 'Ranching']
        );
        DB::table('industries')->insert(
            ['name' => 'Real Estate/Mortgage	']
        );
        DB::table('industries')->insert(
            ['name' => 'Recreational Facilities/Services	']
        );
        DB::table('industries')->insert(
            ['name' => 'Religious Institutions	']
        );
        DB::table('industries')->insert(
            ['name' => 'Renewables/Environment	']
        );
        DB::table('industries')->insert(
            ['name' => 'Research Industry	']
        );
        DB::table('industries')->insert(
            ['name' => 'Restaurants']
        );
        DB::table('industries')->insert(
            ['name' => 'Retail Industry	']
        );
        DB::table('industries')->insert(
            ['name' => 'Security/Investigations	']
        );
        DB::table('industries')->insert(
            ['name' => 'Semiconductors	']
        );
        DB::table('industries')->insert(
            ['name' => 'Shipbuilding']
        );
        DB::table('industries')->insert(
            ['name' => 'Sporting Goods	']
        );
        DB::table('industries')->insert(
            ['name' => 'Sports']
        );
        DB::table('industries')->insert(
            ['name' => 'Staffing/Recruiting	']
        );
        DB::table('industries')->insert(
            ['name' => 'Supermarkets	']
        );
        DB::table('industries')->insert(
            ['name' => 'Telecommunications']
        );
        DB::table('industries')->insert(
            ['name' => 'Textiles']
        );
        DB::table('industries')->insert(
            ['name' => 'Think Tanks	']
        );
        DB::table('industries')->insert(
            ['name' => 'Tobacco']
        );
        DB::table('industries')->insert(
            ['name' => 'Translation/Localization	']
        );
        DB::table('industries')->insert(
            ['name' => 'Transportation']
        );
        DB::table('industries')->insert(
            ['name' => 'Utilities']
        );
        DB::table('industries')->insert(
            ['name' => 'Venture Capital/VC	']
        );
        DB::table('industries')->insert(
            ['name' => 'Veterinary']
        );
        DB::table('industries')->insert(
            ['name' => 'Warehousing']
        );
        DB::table('industries')->insert(
            ['name' => 'Wholesale']
        );
        DB::table('industries')->insert(
            ['name' => 'Wine/Spirits	']
        );
        DB::table('industries')->insert(
            ['name' => 'Wireless']
        );
        DB::table('industries')->insert(
            ['name' => 'Writing/Editing	']
        );

    }
}
