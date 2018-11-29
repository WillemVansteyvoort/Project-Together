<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\User;
use App\User_verify;
class Registered extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, User_verify $user_verify)
    {
        $this->user = $user;
        $this->user_verify = $user_verify;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.register')
            ->subject('Verify your account ')
            ->with([
                'name' => $this->user->name,
                'company' => $this->user->company->name,
                'url' => 'https://project-together.com/user/verify/' . $this->user_verify->token . '/' .  $this->user_verify->user_id,
            ]);
    }
}
