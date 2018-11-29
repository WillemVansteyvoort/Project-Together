<?php

namespace App\Http\Controllers\Application;
use App\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Country;
use App\Notification;
use Auth;
use App\City;
use App\Plan;
use Illuminate\Support\Facades\Hash;
class AccountController extends Controller
{

    public function index() {

        return view('application.account');
    }

    public function getCountries() {
        $countries = Country::all();

        return $countries;
    }

    public function updateProfile(Request $request) {

        $user = Auth::user();
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

        //updaten
        $user->biografy = $request->user_biografy;
        $user->name = $request->user_name;
        $user->email = $request->user_email;
        $user->birthdate = $request->user_date;
        $user->phone = $request->user_phone;
        $user->street = $request->user_street;
        $user->function = $request->user_function;
        $user->twitter = $request->user_twitter;
        $user->facebook = $request->user_facebook;
        $user->google = $request->user_google;
        $user->website = $request->user_website;
        $user->save();

        return response()->json([
            'update' => 'ja',
        ]);
    }


    public function updatePassword(Request $request) {
        if (Hash::check($request->password_old, Auth::user()->password)) {

           $user =  Auth::user();
           $user->password = Hash::make($request->password_new);
           $user->save();
            return response()->json([
                'password_compare' => true,
            ]);
        } else {
            return response()->json([
                'password_compare' => false,
            ]);
        }
        }

}
