<?php


namespace App\Http\Controllers\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Company;
use App\User;
use Auth;
use App\User_invite;
use App\Group;
use App\Task;
use App\Notification;
use App\Events\Notifications;
use App\Country;
class CompanyController extends Controller {

    public function index($company) {
        return view('application.company');
    }

    public function users() {
        $users = User::where([
            ['company_id', '=', Auth::user()->company_id],
        ])->with('city','city.country', 'two_step' ,'rights', 'two_step', 'groups')->get();


        return $users->toJson(JSON_PRETTY_PRINT);
    }


    public function invites() {
        $invites = User_invite::where([
            ['company_id', '=', Auth::user()->company_id],
        ])->get();

        return $invites->toJson(JSON_PRETTY_PRINT);

    }

    public function allInOne() {
        $users = User::where([
            ['company_id', '=', Auth::user()->company_id],
        ])->with('city','city.country', 'two_step' ,'rights', 'two_step', 'groups')->get();
        $invites = User_invite::where([
            ['company_id', '=', Auth::user()->company_id],
        ])->get();
        $groups = Group::where('company_id', Auth::user()->company_id)->with(['users'], ['owner'])->get();
        $countries = Country::all();
        return response()->json([
            'users' => $users,
            'invites' => $invites,
            'groups' => $groups,
            'countries' => $countries
        ]);
    }

    public function groups() {
        $groups = Group::where('company_id', Auth::user()->company_id)->with(['users'], ['owner'])->get();
        return $groups->toJson(JSON_PRETTY_PRINT);
    }

    public function stats() {
        $doneTasks = Task::where([['company_id', Auth::user()->company_id], ['status', true]])->count();
        $buzzyTasks = Task::where([['company_id', Auth::user()->company_id], ['status', false]])->count();
        $companyLogo = Auth::user()->company->logo;
        return response()->json([
            'doneTasks' => $doneTasks,
            'buzzyTasks' => $buzzyTasks,
            'logo' => $companyLogo
        ]);
    }

    public function saveSettings(Request $request) {
        $company = Auth::user()->company;
        $company->message = $request->message;

        foreach ($company->users as $user) {
            $noti =  Notification::create([
                'user_id' => $user->id,
                'title' => 'Company message is changed',
                'type' => 'fas fa-building',
                'content' => Auth::user()->name . " " . Auth::user()->lastname . " has changed the company message on your dashboard",
            ]);
            broadcast(new Notifications($noti,$user))->toOthers();
        }
        $company->save();
    }


}
