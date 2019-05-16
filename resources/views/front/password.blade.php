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
    <meta name="csrf-token" content="{{ csrf_token() }}">
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
                <h4 class="login-company--title">Password recovery</h4>
                {!! Form::open(['action' => 'Application\PasswordResetController@store', 'class' => '']) !!}
                @if(session('password_succes'))
                    <div class="alert alert-green">{{session('password_succes')}}</div>
                    <a href="{{route('front_loginCompany', $companyUrl)}}" class="login-company--back"><i class="fas fa-long-arrow-alt-left"></i></a>
                    <div class="clear"></div>
                @else
                    {!! Form::label('email', 'E-Mail Address'); !!}
                    {!! Form::email('email', null,['placeholder' => 'example@Project-Together.com', 'required' => 'required']); !!}
                    {!! Form::text('id', $companyId,['hidden' => 'hidden']); !!}
                    {!! Form::text('url', $companyUrl,['hidden' => 'hidden']); !!}
                <a href="{{route('front_loginCompany', $companyUrl)}}" class="login-company--back"><i class="fas fa-long-arrow-alt-left"></i></a>
                    {!!  Form::submit('Reset password', ['class' => 'float-right']); !!}
                    <div class="clear"></div>
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