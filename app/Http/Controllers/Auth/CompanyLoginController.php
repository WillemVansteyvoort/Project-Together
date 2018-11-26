<?php


namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\Mail\Two_step;
use Illuminate\Http\Request;
use App\User;
use App\Company;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Nexmo\Laravel\Facade\Nexmo;
use Illuminate\Support\Facades\Mail;
class CompanyLoginController extends Controller
{

    public function __construct() {
        $this->middleware('guest');

    }

    public function index($company) {
        if (Company::where('url', '=', $company)->count() > 0) {
            $companyAll = Company::where('url', '=', $company)->first();
            $companyId = $companyAll->id;
            $companyName = $companyAll->name;
            $companyUrl = $company;
            $companyLogo = $companyAll->logo;
            return view('front.loginCompany', compact('companyName', 'companyId', 'companyUrl', 'companyLogo'));
        } else {
            return abort(404, 'Unauthorized action.');
        }
    }

    public function store(Request $request) {


        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $credentials = $request->only('email', 'password');
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password, 'company_id' => $request->id], $request->remember)) {
            if(Auth::user()->two_step->active) {
                //checken of two-step nodig is ...
                $code = str_random(8);
                $user = Auth::user()->two_step;
                $user->code = $code;
                $user->save();


                $user_id = Auth::user()->id;

                if(Auth::user()->two_step->phone) {
                    $message = Nexmo::message()->send([
                        'to' => Auth::user()->phone,
                        'from' => '32474455182',
                        'text' => 'Your Project-Together login code is: ' . $code,
                    ]);
                }

                if(Auth::user()->two_step->email) {
                    $testje = User::where('id', Auth::user()->id)->get();
                    Mail::to(Auth::user()->email)->send(new Two_step(Auth::user()));
                }

                Auth::logout();
                return view('front.twostep', compact('user_id'));
            } else {
                return redirect($request->url . "/dashboard");
            }
        } else {
            $request->session()->flash("fault", "The data doesn't match, please try again.");
            return back()->withInput();
        }
    }

}