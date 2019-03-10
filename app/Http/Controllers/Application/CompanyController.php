<?php


namespace App\Http\Controllers\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Company;
use App\User;
use Auth;
use App\User_invite;
use App\Group;
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

    public function groups() {
        $groups = Group::where('company_id', Auth::user()->company_id)->with(['users'], ['owner'])->get();
        return $groups->toJson(JSON_PRETTY_PRINT);
    }


}
