<?php


namespace App\Http\Controllers\Application;
use App\Mail\Invite;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User_invite;
use App\User;
use App\User_right;
use App\Group;
use App\Two_step;
use App\Events\Notifications;
use App\Notification;
use App\City;
use Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
class InviteController extends Controller
{
    public function index($company, $token) {
        $invite = User_invite::where([
            ['token', $token],
        ])->firstOrFail();

        if($invite->company->url === $company) {
            $companyName = $invite->company->name;
            $companyUrl = $invite->company->url;
            $companyLogo = $invite->company->logo;
            $companyId = $invite->company_id;

            if(!empty($invite->end_date) && ($invite->end_date <= Carbon::now())) {
                session()->flash("invitation_overdate", "This invitation link has been expired.");
                return view('front.invite', compact('companyLogo', 'companyName', 'companyUrl', 'companyId', 'invite'));

            } else {
                return view('front.invite', compact('companyLogo', 'companyName', 'companyUrl', 'companyId', 'invite'));
            }
        } else {
            return abort(404, 'Unauthorized action.');
        }
    }

    public function createUser(Request $request) {
        //creating user
        $invite = User_invite::where('id', $request->invite_id)->first();
        $user = User::create([
            'name' => $invite->name,
            'lastname' => $invite->lastname,
            'username' => $invite->username,
            'email' => $invite->email,
            'admin' => $invite->admin,
            'password' => Hash::make($request->password),
            'avatar' => 'user.jpg',
            'company_id' => $invite->company_id,
            'termsOfService' => 1,
            'privacyPolicy' => 1,
            'verified' => 1,
            'street' => $invite->street,
            'phone' => $invite->phone,
            'hide_data' => $request->hide_data,
            'online' => !$request->online,
            'city_id' => $invite->city_id,
        ]);


        //setting groups
        if(!empty($invite->groups)) {
            foreach (str_split($invite->groups) as $group) {
                $user->groups()->attach($group);
            }
        }

        //rights
        $rights = User_right::create([
            'user_id' => $user->id,
            'create_members' => $invite->create_members,
            'create_groups' => $invite->create_groups,
            'create_projects' => $invite->create_projects,
            'company_settings' => $invite->company_settings,
            'upload_avatar' => $invite->upload_avatar,
            'change_online' => $invite->change_online,

        ]);
        //others
        Two_step::create([
            'user_id' => $user->id,
            'active' => $request->twostep,
            'email' => 1,
            'phone' => 0,
        ]);

        $notification = Notification::create([
            'user_id' => $user->id,
            'title' => 'Welcome to Project-Together!',
            'type' => 'fas fa-smile',
            'content' => 'Welcome to Project-Together. If you have any questions, be sure to check our documentation.',

        ]);
        $creator = User::where([['id', '=', $invite->user_id]])->first();
       $noti =  Notification::create([
            'user_id' => $invite->user_id,
            'title' => 'Invitation accepted',
            'type' => 'fas fa-user-check',
            'content' => $invite->name . ' has accepted your invitation. ' . $invite->name . ' has now access to the company.',

        ]);
        // broadcast
        Auth::loginUsingId($user->id);
        broadcast(new Notifications($noti,$creator))->toOthers();

        $invite->delete();
        return response()->json([
            'isLoading' => false,
        ]);
    }

    public function createInvite(Request $request) {

        //invite aanmaken
        $invite = User_invite::create([
            'company_id' => Auth::user()->company_id,
            'token' =>  str_random(80),
            'end_date' => $request->endData,
            'message' => $request->costumMessage,
            'user_id' => Auth::user()->id,
            'name' => $request->user_name,
            'lastname' => $request->user_lastname,
            'username' => $request->user_username,
            'email' => $request->user_email,
            'admin' => $request->right_admin,
            'street' => $request->user_street,
            'phone' => $request->user_phone,
            'create_members' => $request->right_createMembers,
            'create_groups' => $request->right_createGroups,
            'create_projects' => $request->right_createProject,
            'company_settings' => $request->right_companySettings,
            'upload_avatar' => $request->right_avatar,
            'change_online' => $request->right_online,
        ]);

        //kijken naar city
        $city = City::where([['name', '=', $request->user_city], ['country_id', '=', $request->user_country_id], ['zipcode', '=', $request->user_zipcode]])->first();

        //checken of stad al bestaat
        if ((!empty($request->user_city)) && (City::where([['name', '=', $request->user_city], ['country_id', '=', $request->user_country_id], ['zipcode', '=', $request->user_zipcode]])->count() > 0)) {
            $invite->city_id = $city->id;
            $invite->save();
        } else {
            $new_city = City::create([
                'name' => $request->user_city,
                'country_id' => $request->user_country_id,
                'zipcode' => $request->user_zipcode,
            ]);
            $invite->city_id = $new_city->id;
            $invite->save();
        }

        //groepen
        foreach ($request->selectedGroups as $name) {
            $group = Group::where([
                ['name', '=',$name],
            ])->first();

            $invite->groups =  $invite->groups . $group->id;
            $invite->save();
        }

        //mail
        Mail::to($invite->email)->send(new Invite($invite));
    }


    public function checkEmail(Request $request) {
        $email_check = false;
        if (User_invite::where([['email', '=', $request->user_email], ['company_id', '=', Auth::user()->company_id]])->count() > 0) {
            $email_check = true;
        }

        return response()->json([
            'email_check' => $email_check,
        ]);
    }
}
