<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>
    <meta name="description" content="">
    <meta name="author" content="">
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
</head>
<body>
    <div class="container">
        <section class="header">
            <div class="header-menu">
                <ul class="header-menu-left">
                    <li><a class="header-name" href="{{route('front_home')}}">{{ config('app.name') }}</a></li>
                    <li><a href="{{route('front_about')}}">@lang('About us')</a></li>
                    {{--<li><a href="">@lang('Products')</a></li>--}}
                    <li><a href="{{route('front_options')}}">@lang('Our options')</a></li>
                    <li><a href="{{route('front_blog')}}">Blog</a></li>
                    <li><a href="{{route('front_support')}}">Support</a></li>

                    @if( App::getLocale() == "nl")
                        <a  href="{{route('lang_set', "en")}}">
                            <img src="https://cdn.countryflags.com/thumbs/united-kingdom/flag-waving-250.png" width="35px" class="float-right" style="margin-top: 5px; margin-right: 8px"/>
                        </a>
                    @else
                        <a  href="{{route('lang_set', "nl")}}">
                            <img src="https://cdn.countryflags.com/thumbs/netherlands/flag-waving-250.png" width="35px" class="float-right" style="margin-top: 5px; margin-right: 8px"/>
                        </a>
                    @endif
                </ul>
                <ul class="header-menu-right hidden-mobile">
                    @if(Auth::check() && Auth::user()->owner)
                        <li class="button button-small button-second uppercase"><a href="{{route('front_company')}}">@lang('Manage', ["company" => Auth::user()->company->name]) </a></li>
                        <li class="button button-small button-primary"><a href="{{route('app_logout')}}">@lang('Logout')</a></li>
                    @elseif(Auth::check())
                        <li class="button button-small button-second uppercase"><a href="{{route('app_dashboard', Auth::user()->company->url)}}">GO TO {{{Auth::user()->company->name}}}</a></li>
                        <li class="button button-small button-primary"><a href="{{route('app_logout')}}">Logout</a></li>
                    @else
                    <li class="button button-small button-second"><a href="{{route('front_login')}}">Log in</a></li>
                    <li class="button button-small button-primary"><a href="{{route('front_signup')}}">Sign Up</a></li>
                        @endif
                </ul>
            </div>

            <div class="header-text">
                <h1 class="header-title">Organize your projects the best way
                </h1>
                <p class="header-beginText">@lang("Organize your projects for your company or your team the best possible way with Project-Together. Project-Together is a tool where you can manage projects of your company. Project-Together is the first projectmanager that's free.")</p>
                <input class="hidden-mobile" type="text" placeholder="@lang("Give your email to start ...")">
                <a href="{{route('front_signup')}}" class="button button-primary button-large hidden-mobile animation-up">
                    @lang("Get started")
                </a>
                <div class="show-mobile header-mobileButton">
                    <li class="button button-small button-second"><a href="{{route('front_login')}}">Log in</a></li>
                    <li class="button button-small button-primary"><a href="{{route('front_signup')}}">Sign Up</a></li>
                </div>
                <div> </div>
            </div>
        </section>
        <section class="products">
            <div class="row">
                <div class="four columns">
                    <div class="product">
                        <div class="product-image">
                            <h4>@lang("Communicate")</h4>
                            <i class="fas fa-comments"></i>
                            <p>@lang("Communicate efficiently with your colleagues")</p>
                        </div>
                    </div>

                </div>
                <div class="four columns">
                    <div class="product">
                        <div class="product-image">
                            <h4>@lang("Tasks")</h4>
                            <i class="fas fa-tasks"></i>
                            <p>@lang("Set tasks easily for certain amount of time")</p>
                        </div>
                    </div>
                </div>
                <div class="four columns">
                    <div class="product">
                        <div class="product-image">
                            <h4>@lang("Organized")</h4>
                            <i class="fas fa-sitemap"></i>
                            <p>@lang("Everything you need in one place")</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="price">
            <div class="row">
                <div class="six columns">
                    <div class="price-table">
                        <h5>Standard</h5>
                        <div class="price-table--body">
                            <h4>Free</h4>
                            <ul>
                                <li>Up to 25 members</li>
                                <li>10 projects</li>
                                <li>24/7 support</li>
                                <li>Includes all add-ons*</li>
                            </ul>
                            <a href="{{route('front_signup')}}" class="button button-primary button-medium">
                                Get started
                            </a>
                        </div>
                    </div>
                </div>
                <div class="six columns">
                    <div class="price-table">
                        <h5>Pro</h5>
                        <div class="price-table--body">
                            <h4 id="line-through">4€ / Mo</h4>
                            <h6>Free</h6>
                            <ul>
                                <li>Up to 120 users</li>
                                <li>Unlimited projects</li>
                                <li>24/7 support</li>
                                <li id="bold">Receive as first updates</li>
                                <li>Includes all add-ons*</li>
                            </ul>
                            <a href="{{route('front_signup')}}" class="button button-primary button-medium">
                                Get started
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="add-ons">
            <h3 class="products-title">You choose, we make it happen</h3>
            <div class="row">
                <div class="two columns">
                    <div class="add-ons--body tablinks active" onclick="openCity(event, 'channels')">
                        <i class="fas fa-comments"></i>
                        <h4>Forum</h4>
                    </div>

                </div>
                <div class="two columns">
                    <div class="add-ons--body tablinks" onclick="openCity(event, 'forum')">
                        <i class="fab fa-centercode icon"> </i>
                        <h4>Crisis Center</h4>
                    </div>
                </div>
                <div class="two columns">
                    <div class="add-ons--body tablinks" onclick="openCity(event, 'tasks')" >
                        <i class="fas fa-tasks"></i>
                        <h4>Tasks</h4>
                    </div>
                </div>
                <div class="two columns">
                    <div class="add-ons--body tablinks" onclick="openCity(event, 'notes')">
                        <i  class="fas fa-sticky-note"></i>
                        <h4>Notes</h4>
                    </div>

                </div>
                <div class="two columns">
                    <div class="add-ons--body tablinks" onclick="openCity(event, 'agenda')">
                        <i class="fas fa-calendar"></i>
                        <h4>Calendar</h4>
                    </div>
                </div>
                <div class="two columns">
                    <div class="add-ons--body tablinks" onclick="openCity(event, 'moods')" >
                        <i class="fas fa-poll-h"> </i>
                        <h4>Polls</h4>
                    </div>
                </div>
            </div>
            <div id="channels" class="add-ons--active tabcontent-active">
                <div class="row">
                    <div class="four columns add-ons--activeImage">
                        <i class="fas fa-comments"></i>
                    </div>
                    <div class="eight columns">
                        <div class="add-ons--activeText">
                            <h4>Discuss with project partners</h4>
                            <p>When you create a project you can choose forum as add-on. A forum is a public medium or place used for debates in which anyone can participate. When you want to start a debate or discussion you can easily can make a thread were all of your project members can reply on and say there opinion. You have also the option to select tasks so that you can sort on them.
                            </p>
                            <a href="{{route('front_signup')}}">Go for it!</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="forum" class="row add-ons--active tabcontent" >
                <div class="four columns add-ons--activeImage">
                    <i class="fab fa-centercode icon"> </i>
                </div>
                <div class="eight columns">
                    <div class="add-ons--activeText">
                        <h4>Be aware of bugs and errors</h4>
                        <p>When you add the add-on Crisis Center to your project, you have a place where you can collect all important faults or bugs that have to be solved immediately. When creating a new item you have to choose a priority. There are three types of priorities: low, medium and high. The Crisis Center is therefore intended to identify errors and bugs.


                        </p>
                        <a href="{{route('front_signup')}}">Go for it!</a>
                    </div>
                </div>
            </div>
            <div id="tasks" class="add-ons--active tabcontent">
                <div class="row">
                    <div class="four columns add-ons--activeImage">
                        <i class="fas fa-tasks"></i>
                    </div>
                    <div class="eight columns">
                        <div class="add-ons--activeText">
                            <h4>Set tasks that need to be done</h4>
                            <p>When creating a project you can choose tasks. This add-on allows you to create tasks. You can assign a task to an employee or colleague. Tasks can also have an end date when the task must be completed. Finally, you can also set a task as active in which a timer starts to run. With tasks you can divide the work among your employees or colleagues.
                            </p>
                            <a href="{{route('front_signup')}}">Go for it!</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="notes" class="add-ons--active tabcontent">
                <div class="row">
                    <div class="four columns add-ons--activeImage">
                        <i  class="fas fa-sticky-note"></i>
                    </div>
                    <div class="eight columns">
                        <div class="add-ons--activeText">
                            <h4>Don't forget anything with notes</h4>
                            <p>You have the option to have notes in your project. This add-on is the online notice-board so that you don't have to use your fridge. You can make a note for everyone in the project or just for yourself.
                            </p>
                            <a href="{{route('front_signup')}}">Go for it!</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="agenda" class="add-ons--active tabcontent">
                <div class="row">
                    <div class="four columns add-ons--activeImage">
                        <i class="fas fa-calendar"></i>
                    </div>
                    <div class="eight columns">
                        <div class="add-ons--activeText">
                            <h4>Save your group meetings</h4>
                            <p>Project-Together has a simple calendar that's only for your company. You and you're colleagues or employees can view events or add new events. An event can be labeled as public or as private. If it's private, you can only see the event. With this calendar you can share all events with everyone in an organized way.
                            </p>
                            <a href="{{route('front_signup')}}">Go for it!</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="moods" class="add-ons--active tabcontent">
                <div class="row">
                    <div class="four columns add-ons--activeImage">
                        <i class="fas fa-poll-h"> </i>
                    </div>
                    <div class="eight columns">
                        <div class="add-ons--activeText">
                            <h4>Ask a question</h4>
                            <p>Your struggling with a chose to make? No problem! You can make a poll in your project so that you can ask them there opinion about your chose. You can set multiple voting or just one time.
                            </p>
                            <a href="{{route('front_signup')}}">Go for it!</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="slideshow">
            <h3 class="slideshow-title">A view of Project-Together</h3>
            <div class="slideshow-show">
                <div class="w3-display-container mySlides">
                    <img src="images/slide/dashboard.JPG" style="width:100%">
                </div>
                <div class="w3-display-container mySlides">
                    <img src="images/slide/newProject.JPG" style="width:100%">
                </div>

                <div class="w3-display-container mySlides">
                    <img src="images/slide/overview.JPG" style="width:100%">
                </div>

                <div class="w3-display-container mySlides">
                    <img src="images/slide/tasks.JPG" style="width:100%">
                </div>

                <div class="w3-display-container mySlides">
                    <img src="images/slide/forum.JPG" style="width:100%">
                </div>

                <div class="w3-display-container mySlides">
                    <img src="images/slide/notes.JPG" style="width:100%">

                </div>

                <button class="slideshow-left center-vertical button no-button button-primary" onclick="plusDivs(-1)"><i class="fas fa-arrow-left"></i></button>
                <button class="slideshow-right button no-button button-primary" onclick="plusDivs(1)"><i class="fas fa-arrow-right"></i></button>

            </div>
        </section>
        <section class="quotes hidden-mobile">
            <h3 id="white">What our costumers say about us</h3>
            <div class="row">
                <div class="six columns">
                    <div class="quote">
                        <div class="quote-character">
                            <i class="fas fa-quote-right"></i>
                        </div>
                        <div class="quote-text">
                            With Project-Together, I and my team are much better organized. It is easy to use and we can easily communicate with each other. Highly recommended!
                            <span class="quote-author">Tom Boon</span>
                        </div>

                    </div>

                </div>
                <div class="six columns">
                    <div class="quote">
                        <div class="quote-character">
                            <i class="fas fa-quote-right"></i>
                        </div>
                        <div class="quote-text">
                            I was searching on the internet for a teamwork-platform but they were all so expensive. When I found out about Project-Together I was in the clouds!
                            <span class="quote-author">Claudia</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
@extends('front.layouts.footer')
</body>
<script async="async" type="text/javascript" src="{{ asset('js/toggles.js') }}"></script>
<script async="async" type="text/javascript" src="{{ asset('js/script.js') }}"></script>
<script async="async" type="text/javascript" src="{{ asset('js/app.js') }}"></script>
</html>
