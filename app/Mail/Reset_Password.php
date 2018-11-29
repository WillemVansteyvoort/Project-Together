<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\User;
use App\password_reset;
use Illuminate\Contracts\Queue\ShouldQueue;

class Reset_Password extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, Password_reset $password_reset)
    {
        $this->user = $user;
        $this->password_reset = $password_reset;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.password_reset')
            ->subject('Password recovery')
            ->with([
                'name' => $this->user->name,
                'company' => $this->user->company->name,
                'url' => 'https://project-together.com/password/' .$this->user->company->url . '/' .  $this->password_reset->token,
            ]);;
    }
}
