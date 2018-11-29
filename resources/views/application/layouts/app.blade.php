<!DOCTYPE html>
<html lang="en">
    <meta charset="utf-8">
    <head>
    <title>{{ config('app.name') }}  @yield('title', '')</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="{{ asset('css/normalize.css') }}">
    <link rel="stylesheet" href="{{ asset('css/skeleton.css') }}">
    <link rel="stylesheet" href="{{ asset('css/application.css') }}">
    <link rel="stylesheet" href="{{ asset('css/queries.css') }}">
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
            'user' => [
                'id' => Auth::user()->id,
                'name' => Auth::user()->name,
                'lastname' => Auth::user()->lastname,
                'username' => Auth::user()->username,
                'email' => Auth::user()->email,
                'avatar' => Auth::user()->avatar,
                'street' =>  Auth::user()->street,
                'phone' =>  Auth::user()->phone,
                'website' =>  Auth::user()->website,
                'twitter' =>  Auth::user()->twitter,
                'facebook' =>  Auth::user()->facebook,
                'google' =>  Auth::user()->google,
                'biografy' =>  Auth::user()->biografy,
                'function' =>  Auth::user()->function,
                'date' => Auth::user()->birthdate,
                'city' =>  Auth::user()->city->name,
                'zipcode' => Auth::user()->city->zipcode,
                'country' => Auth::user()->city->country->name,
                'country_id' => Auth::user()->city->country_id,
                'two_step' => Auth::user()->two_step->active,
            ],
            'company' => [
                'users' => Auth::user()->company->users->count(),
                'projects' =>  Auth::user()->company->projects->count(),
            ],
            'two_step' => [
                'email' => Auth::user()->two_step->email,
                'phone' => Auth::user()->two_step->phone,
                'enable_phone' => Auth::user()->two_step->enable_phone,
            ],

            'plan' => [
                'name' =>  Auth::user()->company->plan->name,
                'projects' =>  Auth::user()->company->plan->projects,
                'users' =>  Auth::user()->company->plan->users
            ],

            'rights' => [
              'create_members' => Auth::user()->rights->create_members,
                'create_groups' => Auth::user()->rights->create_groups,
                'create_projects' => Auth::user()->rights->create_projects,
                'company_settings'=> Auth::user()->rights->company_settings,
            ],
        ]);
        ?>
    </script>
</head>
<body>
<div class="container">
    @include('application.layouts.header')
    @yield('content')
</div>
</body>
<script async="async" type="text/javascript" src="{{ asset('js/header.js') }}"></script>
<script async="async" type="text/javascript" src="{{ asset('js/app.js') }}"></script>
</html>