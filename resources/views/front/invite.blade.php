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
    <script>
        window.Laravel = <?php echo json_encode([
            'invite' => $invite,
            'url' => $companyUrl,
           ]);
        ?>
    </script>
</head>
<body class="new-invite-bg">
<div class="container">
    <div class="new-invite">
        <div class="new-invite-content">
            <p> </p>
            <section>
                @if(!empty($companyLogo))
                    <div class="center-text">
                        <img src="/logos/{{$companyLogo}}"/>
                    </div>
                @else
                    <h4 class="new-invite--title">Join {{$companyName}}</h4>
                @endif
                @if(session('invite_overdate'))
                    <form>
                        <div class="alert alert-red center-text">
                            {{session('invite_overdate')}}
                        </div>
                    </form>
                    @else
                        <div id="invite-form"></div>
                    @endif
                    <p class="login-company-content--copyright">© 2019 <a href="{{route('front_home')}}">Project-Together</a>, all rights reserved.</p>
            </section>
        </div>
    </div>
</div>
</body>
<script async="async" type="text/javascript" src="{{ asset('js/app.js') }}"></script>
</html>