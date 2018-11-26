<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}  @yield('title', '')</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/v4-shims.css">
    <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="{{ asset('css/normalize.css') }}">
    <link rel="stylesheet" href="{{ asset('css/skeleton.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('css/queries.css') }}">
</head>
<body>
<div class="container">
    <div class="login-left">

    </div>
    <div class="login-right">
        <div class="center-vertical">
            <div class="verify">
                {!! Form::open(['action' => 'Application\TwoStepController@login', 'class' => 'login-right--formlogin']) !!}
                <h4>Two step authentication</h4>
                <p>Your account is using two step authentication. We send the details to your prefered methods that you selected (email or phone).</p>
                <div id="red">{{session('fault_twofactor')}}</div>
                {!! Form::label('Code', 'Your code'); !!}
                {!! Form::text('code'); !!}
                {!! Form::hidden('user_id', $user_id) !!}
                {!!  Form::submit('Verify', ['class' => 'float-right']); !!}
                {!! Form::close() !!}
            </div>
        </div>
    </div>

</div>
</body>
</html>