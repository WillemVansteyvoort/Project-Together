<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ContactForm;
class ContactFormController extends Controller
{
    public function create(Request $request) {
        $form = ContactForm::create([
           'email' => $request->email,
           'reason' => $request->reason,
           'phone' => $request->phone,
           'company' => $request->company,
           'content' => $request->message,
        ]);

        $request->session()->flash("success", "Your form has been sent successfully. We will reply as soon as possible");
        return back();
    }
}
