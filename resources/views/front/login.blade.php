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
            <button onclick="window.location.href='auth/facebook'" class="login-socialmedia--facebook"> <i class="fa fa-facebook"></i>Login with Facebook</button>
            <button class="login-socialmedia--twitter"> <i class="fa fa-twitter"></i>Login with Twitter</button>
            <button onclick="window.location.href='auth/google'" class="login-socialmedia--google"> <i class="fa fa-google"></i>Login with Google</button>
        </div>
    </div>
    <div class="login-right">
        <div class="login-right--alreadyAccount">
            <p>Not yet an account? <a class="button button-primary" href="{{route('front_signup')}}">Sign Up</a></p>
        </div>
        <div class="center-vertical">
            <form id="regForm" action="" class="login-right--formlogin">
                <h4 class="login-right--title">Login to Work-Together</h4>
                <label>Email or username</label>
                <input class="u-full-width" type="email" placeholder="yourname@provider.com">
                <label>Password</label>
                <input class="u-full-width" type="password" placeholder="********">
                <p><a href="">Forgot your password or email?</a></p>
                <input type="submit" value="Login" class="float-right">
            </form>
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