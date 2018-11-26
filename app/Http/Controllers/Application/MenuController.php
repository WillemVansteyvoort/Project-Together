<?php

namespace App\Http\Controllers\Application;

use App\Events\Notifications;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Auth;
use App\Notification;
class MenuController extends Controller
{
    public function online() {

        $currentCompany =  Auth::user()->company_id;

        $users = User::where([
            ['company_id', '=', $currentCompany],
            ['last_activity', '>', new \DateTime('-13 seconds')],
            ['online', '=', 1],
            ])->get();


        return $users->toJson(JSON_PRETTY_PRINT);

    }

    public function notifications() {

        $notifications = Notification::where([
            ['user_id', '=', Auth::user()->id],
            ['read', '=',0],
        ])->get();



        if($notifications->count() > 0) {
            return response()->json([
                'notifications' => $notifications,
                'empty' => false
            ]);
        } else {
            return response()->json([
                'notifications' => $notifications,
                'empty' => true
            ]);
        }


    }

    public function notificationsRead() {
        Notification::where([['read', '=', 0], ['user_id', '=', Auth::user()->id]])->update(['read' => 1]);
    }

}
