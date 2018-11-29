<?php

namespace App\Events;


use App\Notification;
use Auth;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class Notifications implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $notification;
    public $user;

    public function __construct(Notification $notification, User $user)
    {
        $this->notification = $notification;
        $this->user = $user;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('user-notifications'.$this->user->id);

    }

    public function broadcastWith() {
        return [
            'notification' => $this->notification->toArray(),
            'user' => $this->user
        ];
    }
}
