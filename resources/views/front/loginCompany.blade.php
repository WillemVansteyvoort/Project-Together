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
        <div class="login-socialmedia">

        </div>
    </div>
    <div class="login-right">
        <div class="center-vertical">
            {!! Form::open(['action' => 'Auth\CompanyLoginController@store', 'class' => 'login-right--formlogin']) !!}
            <h4 class="login-right--title">Login to {{$companyName}}</h4>
            <div id="red">{{session('fault')}}</div>
            {!! Form::label('email', 'E-Mail Address'); !!}
            {!! Form::text('email', null,['placeholder' => 'example@Project-Together.com', 'required' => 'required']); !!}
            {!! Form::label('password', 'Password'); !!}
            {!! Form::password('password', ['placeholder' => '***********', 'required' => 'required']); !!}
            <label>{!!Form::checkbox('remember', '1'); !!} Remember me</label>
            <p><a href="">Forgot your password or email?</a></p>

            {!! Form::text('id', $companyId,['hidden' => 'hidden']); !!}
            {!! Form::text('url', $companyUrl,['hidden' => 'hidden']); !!}

            {!!  Form::submit('Login', ['class' => 'float-right']); !!}
            {!! Form::close() !!}
        </div>
        <div class="show-mobile">
            <div class="login-socialmedia">
                <button class="login-socialmedia--facebook"> <i class="fa fa-facebook"> </i>Sign Up with Facebook</button>
                <button class="login-socialmedia--twitter"> <i class="fa fa-twitter"> </i>Sign Up with Twitter</button>
                <button class="login-socialmedia--google"> <i class="fa fa-google"> </i>Sign Up with Google</button>
            </div>
        </div>


    </div>

</div>
</body>
<script async="async" type="text/javascript" src="{{ asset('js/app.js') }}"></script>
</html>