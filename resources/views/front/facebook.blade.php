<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}  @yield('title', '')</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet"
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/v4-shims.css">
    <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="{{ asset('css/normalize.css') }}">
    <link rel="stylesheet" href="{{ asset('css/skeleton.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('css/queries.css') }}">
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
           'facebook' => [
               'name' => $name,
               'lastname' => $lastname,
               'email' => $email,
               'facebook' => $avatar,
               'provider' => $provider,
               'provider_id' => $provider_id,
               'avatar' => $avatar,
           ],
    ]);
        ?>
    </script>
</head>
<body>
<div class="container">
    <div class="register-left">
        <div class="register-socialmedia">
            <i class="fa fa-facebook icon-big"> </i>
        </div>
    </div>
    <div class="login-right">
        <div class="register-right--alreadyAccount">
            <p>Already have an account? <a class="button button-primary" href="{{route('front_login')}}">Log In</a></p>
        </div>
        <form>
            <div id="signup-facebook">
                <p>Loading ...</p>
            </div>
        </form>
        <div class="show-mobile">
            <div class="register-socialmedia">
                <button class="register-socialmedia--facebook"> <i class="fa fa-facebook"></i>Sign Up with Facebook</button>
                <button class="register-socialmedia--twitter"> <i class="fa fa-twitter"></i>Sign Up with Twitter</button>
                <button class="register-socialmedia--google"> <i class="fa fa-google"></i>Sign Up with Google</button>
            </div>
        </div>
    </div>
</div>
<script async="async" type="text/javascript" src="{{ asset('js/toggles.js') }}"></script>
<script async="async" type="text/javascript" src="{{ asset('js/app.js') }}"></script>


</body>
</html>