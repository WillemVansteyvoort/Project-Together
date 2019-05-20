<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>
    <meta name="description" content="@lang("Organize your projects for your company or your team the best possible way with Project-Together. Project-Together is a tool that can help you manage your company's projects. Project-Together is the first free project manager.")">
    <meta name="author" content="Willem Vansteyvoort">
    <meta name="keywords" content="Project Together, Project-Together, Project, project management tool, Free project management tool, project organize, gratis project tool, projecten organiseren">
    <meta name="robots" content="index, about, options, login, signup">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="{{ asset('css/normalize.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/skeleton.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('css/queries.css') }}">
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-5110123090511920",
            enable_page_level_ads: true
        });
    </script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-140387815-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-140387815-1');
    </script>


</head>
<body>
    @yield('content')
    <section class="footer">
        <div class="row">
            <div class="three columns">
                <div class="footer-column">
                    <h5>Project-Together</h5>
                    <ul>
                        <li><a href="{{route('front_about')}}">@lang("About us")</a></li>
                        <li><a href="{{route('front_about')}}">@lang("Our team")</a></li>
                        <li><a href="documents/privacy-policy.pdf">Privacy Policy</a></li>
                        <li><a href="">Terms of service</a></li>
                    </ul>
                </div>

            </div>
            <div class="three columns">
                <h5>Support</h5>
                <ul>
                    <li><a href="{{route('front_docs')}}">@lang("Documentation")</a></li>
                    <li><a href="{{route('front_support')}}">Q&A's</a></li>
                    <li><a href="{{route('front_support')}}">@lang("Contact us")</a></li>
                </ul>
            </div>
            <div class="three columns">
                <h5>@lang("Products")</h5>
                <ul>
                    <li><a href="">@lang("Pricing")</a></li>
                    <li><a href="{{route('front_options')}}">@lang("Our options")</a></li>
                </ul>
            </div>
            <div class="three columns">
                <h5>Community</h5>
                <ul>
                    <li><a href="{{route('front_blog')}}">Blog</a></li>
                    <li><a href="">Twitter</a></li>
                    <li><a href="">Facebook</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-socialmedia">
            <a href=""><i class="fab fa-twitter"></i></a>
            <a href=""><i class="fab fa-facebook-f"></i></a>
            <a href=""><i class="fab fa-skype"></i></a>
        </div>
        <p class="footer-copyright"> © 2019 Project-Together, all rights reserved.</p>
    </section>
</body>
<script async="async" type="text/javascript" src="{{ asset('js/script.js') }}"></script>
<script async="async" type="text/javascript" src="{{ asset('js/app.js') }}"></script>
</html>
