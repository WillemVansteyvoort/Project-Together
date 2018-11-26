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
        <div class="register-right--alreadyAccount">
            <p>Already have an account? <a class="button button-primary" href="{{route('front_login')}}">Log In</a></p>
        </div>
        <div class="center-vertical">
            <div class="verify">
                <form>
                    <h4>Account verification</h4>
                    @if(session('verify_overdate'))
                        <div class="alert alert-red">{{session('verify_overdate')}}</div>
                    @elseif(session('verify_success'))
                        <div class="alert alert-green">{{session('verify_success')}}</div>
                    @endif
                </form>
            </div>
        </div>
    </div>

</div>
</body>
<script async="async" type="text/javascript" src="{{ asset('js/app.js') }}"></script>
</html>