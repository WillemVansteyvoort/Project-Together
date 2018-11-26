<?php

namespace App\Http\Controllers\Application;


use App\Events\Notifications;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;
use App\Company;
use App\Notification;
use DateTime;
use Carbon\CarbonInterval;
use Carbon\Carbon;
use Auth;
class DashboardController extends Controller
{

    public function index($company) {
        return view('application.dashboard');
        }


    public function test() {
        $notification = Auth::user()->notifcationsAll()->create([
            'user_id' => 1,
            'title' => 'dfdfd df',
            'type' => 'fas fa-bell',
            'content' => 'dfdfdf',
        ]);
        // broadcast
        broadcast(new Notifications($notification, Auth::user()))->toOthers();
    }

    public function notifcationsToday() {
        $notifcations = Notification::where([
            ['user_id', '=', Auth::user()->id],
            ['created_at', '>=', Carbon::today()],
        ])->orderBy('id', 'DESC')->get();


        return $notifcations;
    }


    public function notificationsYesterday() {
        $notifcations = Notification::where([
            ['user_id', '=', Auth::user()->id],
            ['created_at', '>=', Carbon::yesterday()],
            ['created_at', '<=', Carbon::today()]
        ])->get();

        return $notifcations;
    }

    public function noticationsOlder() {
        $notifcations = Notification::where([
            ['user_id', '=', Auth::user()->id],
            ['created_at', '<=', Carbon::today()->subDays(3)],
        ])->get();

        return $notifcations;
    }


}
