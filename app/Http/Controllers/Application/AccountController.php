<?php

namespace App\Http\Controllers\Application;
use App\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Country;
use App\Notification;
use Illuminate\Support\Facades\Auth;
use App\City;
use Faker\Provider\Image;
use Validator;
use App\User_email;
use Carbon\Carbon;
use App\User;
class AccountController extends Controller
{

    public function index() {

        return view('application.account');
    }

    public function getCountries() {
        $countries = Country::all();

        return $countries;
    }

    public function checkEmail(Request $request) {

        $exists = "no";
        if (User::where([['email', '=', $request->user_email], ['company_id', '=', Auth::user()->company_id]])->count() > 0 && (Auth::user()->email != $request->user_email)) {
            $exists = "yes";
        }

        return $exists;
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
        $user->lastname = $request->user_lastname;
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

    public function updateSettings(Request $request) {
        $user = Auth::user();

        $user->online = $request->online;
        $user->hide_data = $request->hide_data;
        $user->notifications = $request->notifications;
        $user->save();

        $mails = User_email::where('user_id', $user->id)->first();
        $mails->invites = $request->mail_invites;
        $mails->sessions = $request->mail_sessions;
        $mails->notifications = $request->mail_notifications;
        $mails->overview = $request->mail_overview;
        $mails->save();
    }


    public function changeAvatar(Request $request){

        $image = $request->get('file');
        $validator = Validator::make($request->all(), [
            'file' => 'required',
        ]);

        $isFile = false;
        //https://stackoverflow.com/questions/33283993/laravel-check-if-image-path-string-is-image
        $allowedMimeTypes = ['image/jpeg','image/gif','image/png','image/bmp','image/svg+xml'];
        $contentType = mime_content_type($image);

        if(!in_array($contentType, $allowedMimeTypes) ){
            $isFile = true;
        }

        if ($validator->fails() || $isFile) {
            return response()->json([
                'uploaded' => false,
                'message' => 'You have to upload an image'
            ]);

        } else {
            if($request->get('file')) {
                //https://appdividend.com/2018/03/23/react-js-laravel-file-upload-tutorial/
                $name = time() . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                \Image::make($request->get('file'))->save(public_path('images/users/') . $name);
                $user = Auth::user();
                $user->avatar = '/images/users/' . $name;
                $user->save();
                return response()->json([
                    'uploaded' => true,
                    'message' => 'Your avatar is succesfully updated',
                    'avatar' => $user->avatar,
                ]);
            }
        }


    }

    public function getLogs() {
      return  Auth::user()->authentications;

    }

    public function getStats() {
        $userProjects = Auth::user()->projects->count();
        $totalProjects = Auth::user()->company->projects->count();
        $totalNotifications = Auth::user()->notifcationsAll->count();
        $totalActivities = Auth::user()->activities->count();

        return response()->json([
            'memberSince' => Auth::user()->created_at,
            'userProjects' => $userProjects,
            'totalEvents' => Auth::user()->company->events->count(),
            'totalProjects' => $totalProjects,
            'totalNotifications' => $totalNotifications,
            'totalActivities' => $totalActivities,

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
