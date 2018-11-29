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
<body class="login-company-bg">
<div class="container">
    <div class="login-company">
        <div class="login-company-content">
            <p> </p>
            <section>
                <h4 class="login-company--title">Choose new password</h4>
                {!! Form::open(['action' => 'Application\PasswordResetController@updatePassword', 'class' => '']) !!}
                @if(session('passwordChange_overdate'))
                    <div id="red" class="center-text">{{session('passwordChange_fault')}}</div>
                @else
                <div id="red" class="center-text">{{session('passwordChange_fault')}}</div>
                @if(session('passwordChange_succes'))
                    <div class="alert alert-green center-text">{{session('passwordChange_succes')}}</div>
                    @else
                    {!! Form::label('password', 'Password'); !!}
                    {!! Form::password('password',['placeholder' => '*******', 'required' => 'required', 'pattern' => '.{8,}',  'required title' => "8 characters minimum"]); !!}
                    {!! Form::label('password', 'Re-type password'); !!}
                    {!! Form::password('password2',['placeholder' => '*******', 'required' => 'required',  'pattern' => '.{8,}',  'required title' => "8 characters minimum"]); !!}
                    {!! Form::text('id', $companyId,['hidden' => 'hidden']); !!}
                    {!! Form::text('email', $email,['hidden' => 'hidden']); !!}
                    {!!  Form::submit('Change password', ['class' => '']); !!}
                    <div class="clear"></div>
                @endif
                @endif
                {!! Form::close() !!}
                <p class="login-company-content--copyright">© 2018 <a href="">WorkTogether</a>, all rights reserved.</p>
            </section>
        </div>
    </div>
</div>
</body>
<script async="async" type="text/javascript" src="{{ asset('js/app.js') }}"></script>
</html>