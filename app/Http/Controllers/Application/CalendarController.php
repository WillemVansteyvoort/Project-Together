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
        ])->get();
        return response()->json([
            'all' => $allEvents,
        ]);
    }

    public function today() {
        $allEvents = Event::where([
            ['company_id', '=', Auth::user()->company_id],
            ['private', false],
        ])->get();
        $privateEvents = Event::where([
            ['user_id', '=', Auth::user()->id],
            ['from', '=', Carbon::today()],
            ['private', true],
        ])->get();
        return response()->json([
           'all' => $allEvents,
            'private' => $privateEvents,
        ]);
    }
}
