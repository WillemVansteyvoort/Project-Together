<?php

namespace App\Http\Controllers\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Event;
use Illuminate\Support\Facades\Auth;
use App\Company;
use Carbon\Carbon;
class CalendarController extends Controller
{
    public function index() {

        return view('application.calendar');
    }

    public function create(Request $request) {
        $event = Event::create([
           'company_id' => Auth::user()->company_id,
           'user_id' => Auth::user()->id,
           'private' => $request->private,
           'title' => $request->title,
           'description' => $request->description,
           'from' => $request->fromDate,
           'from_hour' => $request->fromTime,
           'until' => $request->untilDate,
           'until_hour' => $request->untilTime,
            'color' => $request->color,
        ]);
    }

    public function receive(Request $request) {
        $allEvents = Event::where([
            ['company_id', '=', Auth::user()->company_id],
            ['private', false],
        ])->orWhere([
            ['company_id', '=', Auth::user()->company_id],
            ['private', false],
            ['user_id', auth::user()->id],
            ]) ->with('user')->get();
        return response()->json([
            'all' => $allEvents,
        ]);
    }


    public function today() {
        $events = Event::where([
            ['user_id', '=', Auth::user()->id],
            ['from', '=', Carbon::today()],
            ['private', true],
        ])->orWhere([
            ['company_id', '=', Auth::user()->company_id],
            ['private', false],
            ['from', '=', Carbon::today()],
            ['user_id', auth::user()->id],
        ])->get();

        return response()->json([
           'all' => $events,
        ]);
    }

    public function tomorrow() {
        $events = Event::where([
            ['user_id', '=', Auth::user()->id],
            ['from', '=', Carbon::tomorrow()],
            ['private', true],
        ])->orWhere([
            ['company_id', '=', Auth::user()->company_id],
            ['private', false],
            ['from', '=', Carbon::tomorrow()],
            ['user_id', auth::user()->id],
        ])->get();

        return response()->json([
            'all' => $events,
        ]);
    }

    public function getDay(Request $request) {
        $events = Event::where([
            ['company_id', '=', Auth::user()->company_id],
            ['from', $request->from],
            ['private', false],
        ])->get();
        return $events;
    }

}
