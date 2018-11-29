<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\User;
use App\Company;
use App\User_invite;
class Invite extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User_invite $user_invite)
    {
        $this->user_invite = $user_invite;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        $creator = User::findOrFail($this->user_invite->user_id);
        $company = Company::findOrFail($this->user_invite->company_id);
        return $this->view('mails.invite')
            ->subject('Invitation to join ' . $this->user_invite->company->name)
            ->with([
                'name' => $this->user_invite->name . " " . $this->user_invite->lastname,
                'company' =>  $this->user_invite->company->name,
                'url' => 'https://project-together.com/' . $company->url . "/invite/".$this->user_invite->token,
                'maker' => $creator->name,
                'mess' =>  $this->user_invite->message,
            ]);
    }
}
