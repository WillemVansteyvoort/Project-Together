<?php

namespace App\Http\Controllers\Application;
use App\Http\Controllers\Others\SlugifyController;
use App\User_invite;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\City;
use App\Country;
use App\Group;
use App\Two_step;
use App\Notification;
use App\User_right;
use Illuminate\Support\Facades\Auth;
use App\User_email;
use Illuminate\Support\Facades\Hash;
class UserController extends SlugifyController
{
    public function store(Request $request) {

    }

    public function checkEmail(Request $request) {

        $email_check = false;
        if (User::where([['email', '=', $request->user_email], ['company_id', '=', Auth::user()->company_id]])->count() > 0) {
            $email_check = true;
        }

        return response()->json([
            'email_check' => $email_check,
        ]);
    }

    public function createUser(Request $request) {

        //checken of username al bestaat
        $qUsername = User::where([['username', '=', strtolower($request->user_name) . strtolower($request->user_lastname[0])], ['company_id', '=', Auth::user()->company_id]])->orWhere([['username', '=', strtolower($request->username)], ['company_id', '=', Auth::user()->company_id]])->count();
        $username = "";
        if($qUsername > 0) {
            $username = $this->slugify($request->user_name . $request->user_lastname[0] . ($qUsername+1), false);
        } else {
            $username = $this->slugify($request->user_name . $request->user_lastname[0], false);
        }

        //creating user
        $user = User::create([
            'name' => $request->user_name,
            'lastname' => $request->user_lastname,
            'username' => $username,
            'email' => $request->user_email,
            'admin' => $request->right_admin,
            'password' => Hash::make($request->password_new),
            'avatar' => 'https://project-together.com/images/user.jpg',
            'company_id' => Auth::user()->company->id,
            'termsOfService' => 0,
            'privacyPolicy' => 0,
            'verified' => 1,
            'street' => $request->user_street,
            'phone' => $request->user_phone,
            'hide_data' => $request->user_hideInformation,
            'online' => !$request->user_online
        ]);

        //kijken naar city
        $city = City::where([['name', '=', $request->user_city], ['country_id', '=', $request->user_country_id], ['zipcode', '=', $request->user_zipcode]])->first();

        //checken of stad al bestaat
        if ((!empty($request->user_city)) && (City::where([['name', '=', $request->user_city], ['country_id', '=', $request->user_country_id], ['zipcode', '=', $request->user_zipcode]])->count() > 0)) {
            $user->city_id = $city->id;
            $user->save();
        } else {
            $new_city = City::create([
                'name' => $request->user_city,
                'country_id' => $request->user_country_id,
                'zipcode' => $request->user_zipcode,
            ]);
            $user->city_id = $new_city->id;
            $user->save();
        }

        //setting groups
        foreach ($request->selectedGroups as $name) {
            $group = Group::where([
                ['name', '=',$name],
                ['company_id', '=', Auth::user()->company_id],
            ])->first();

            $user->groups()->attach($group->id);
        }

        //rights
        $rights = User_right::create([
            'user_id' => $user->id,
            'create_members' => $request->right_createMembers,
            'create_groups' => $request->right_createGroups,
            'create_projects' => $request->right_createProject,
            'company_settings' => $request->right_companySettings,
            'upload_avatar' => $request->right_avatar,
            'change_online' => $request->right_online,
            'right_data' => $request->right_data,
        ]);
        //others
        Two_step::create([
            'user_id' => $user->id,
            'active' => $request->user_twostep,
            'email' => 1,
            'phone' => 1,
        ]);
        User_email::create([
            'user_id' => $user->id,
        ]);

        $notification = Notification::create([
            'user_id' => $user->id,
            'title' => 'Welcome to Project-Together!',
            'type' => 'fas fa-smile',
            'content' => 'Welcome to Project-Together. If you have any questions, be sure to check our documentation..',

        ]);

        return response()->json([
            'isLoading' => false,
        ]);
    }

    public function editUser(Request $request) {
        $user = User::findOrFail($request->user_id);

        //editting basic info
        $user->name = $request->user_name;
        $user->lastname = $request->user_lastname;
        $user->username = $request->user_username;
        $user->admin = $request->right_admin;
        $user->email = $request->user_email;
        $user->street = $request->user_street;
        $user->phone = $request->user_phone;
        $user->hide_data = $request->user_hideInformation;
        $user->online = $request->user_online;
        $user->two_step->active = $request->user_twostep;
        $user->two_step->save();
        //kijken naar city
        $city = City::where([['name', '=', $request->user_city], ['country_id', '=', $request->user_country_id], ['zipcode', '=', $request->user_zipcode]])->first();

        //checken of stad al bestaat
        if ((!empty($request->user_city)) && (City::where([['name', '=', $request->user_city], ['country_id', '=', $request->user_country_id], ['zipcode', '=', $request->user_zipcode]])->count() > 0)) {
            $user->city_id = $city->id;
        } else {
            $new_city = City::create([
                'name' => $request->user_city,
                'country_id' => $request->user_country_id,
                'zipcode' => $request->user_zipcode,
            ]);
            $user->city_id = $new_city->id;
        }
        $user->save();

        //editing the rights
        $user->rights->create_members = $request->right_createMembers;
        $user->rights->create_groups = $request->right_createGroups;
        $user->rights->create_projects = $request->right_createProject;
        $user->rights->company_settings = $request->right_companySettings;
        $user->rights->upload_avatar = $request->right_avatar;
        $user->rights->change_online = $request->right_online;
        $user->rights->right_data = $request->right_data;
        $user->rights->save();

        //returning new users
        $users = User::where([
            ['company_id', '=', Auth::user()->company_id],
        ])->with('city','city.country', 'two_step' ,'rights', 'two_step', 'groups')->get();


        return $users->toJson(JSON_PRETTY_PRINT);
    }

    public function deleteUser(Request $request) {
        User::destroy($request->id);
        $users = User::where([
            ['company_id', '=', Auth::user()->company_id],
        ])->with('city', 'rights', 'two_step')->get();

        return $users->toJson(JSON_PRETTY_PRINT);
    }
}
