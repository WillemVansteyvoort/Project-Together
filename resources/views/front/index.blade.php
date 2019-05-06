<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="{{ asset('css/normalize.css') }}">
    <link rel="stylesheet" href="{{ asset('css/skeleton.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('css/queries.css') }}">
</head>
<body>
    <div class="container">
        <section class="header">
            <div class="header-menu">
                <ul class="header-menu-left">
                    <li><a class="header-name" href="{{route('front_home')}}">{{ config('app.name') }}</a></li>
                    <li><a href="{{route('front_about')}}">@lang('About us')</a></li>
                    <li><a href="">@lang('Products')</a></li>
                    <li><a href="">@lang('Our options')</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="support.html">Support</a></li>

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
                <p class="header-beginText">Organize your projects for your organisation or your team the best possible way with WorkTogether. WorkTogether is the first team-manager that is totally free to use. </p>
                <input class="hidden-mobile" type="text" placeholder="Give your email to start ...">
                <a href="" class="button button-primary button-large hidden-mobile animation-up">
                    Get started
                </a>
                <div class="show-mobile">
                    <li class="button button-small button-second"><a href="">Log in</a></li>
                    <li class="button button-small button-primary"><a href="">Sign Up</a></li>
                </div>
            </div>
        </section>
        <section class="products">
            <div class="row">
                <div class="four columns">
                    <div class="product">
                        <div class="product-image">
                            <h4>Communicate</h4>
                            <i class="fas fa-comments"></i>
                            <p>Communicate easily individual with a teammate or in group.</p>
                        </div>
                    </div>

                </div>
                <div class="four columns">
                    <div class="product">
                        <div class="product-image">
                            <h4>Set Tasks</h4>
                            <i class="fas fa-tasks"></i>
                            <p>Set tasks for your team within a period that they must have done it.</p>
                        </div>
                    </div>
                </div>
                <div class="four columns">
                    <div class="product">
                        <div class="product-image">
                            <h4>Share Files</h4>
                            <i class="fas fa-file"></i>
                            <p>Upload files and share them with your teammates.</p>
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
                                <li>2GB file space</li>
                                <li>Up to 25 users</li>
                                <li>4 projects</li>
                                <li>Unlimited (sub)tasks</li>
                                <li>24/7 support</li>
                                <li>Includes all add-ons*</li>
                            </ul>
                            <a href="" class="button button-primary button-medium">
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
                                <li>5GB file space</li>
                                <li>Up to 120 users</li>
                                <li>Unlimited projects</li>
                                <li>Unlimited (sub) tasks</li>
                                <li>24/7 support</li>
                                <li id="bold">Receive as first updates</li>
                                <li>Includes all add-ons*</li>
                            </ul>
                            <a href="" class="button button-primary button-medium">
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
                        <i  class="fas fa-comments"></i>
                        <h4>Channels</h4>
                    </div>

                </div>
                <div class="two columns">
                    <div class="add-ons--body tablinks" onclick="openCity(event, 'forum')">
                        <i  class="fab fa-wpforms"></i>
                        <h4>Forum</h4>
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
                        <h4>Agenda</h4>
                    </div>
                </div>
                <div class="two columns">
                    <div class="add-ons--body tablinks" onclick="openCity(event, 'moods')" >
                        <i class="fas fa-moon"></i>
                        <h4>Moods</h4>
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
                            <h4>Stay connected with Channels</h4>
                            <p>Vestibulum sed magna est. Phasellus odio ex, lacinia a libero sit amet, luctus tincidunt purus. Morbi non suscipit lorem, a dignissim velit. Aliquam ullamcorper hendrerit lectus ac interdum. In ac fringilla nunc. Pellentesque non eros volutpat, volutpat lacus id, egestas lorem. Quisque at ultricies ante, a vestibulum odio. Sed quam ipsum, molestie quis malesuada eget, pulvinar id ligula. Proin vehicula mi justo, sit amet elementum velit eleifend tristique.
                            </p>
                            <a href="">Go for it!</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="forum" class="row add-ons--active tabcontent" >
                <div class="four columns add-ons--activeImage">
                    <i class="fab fa-wpforms"></i>
                </div>
                <div class="eight columns">
                    <div class="add-ons--activeText">
                        <h4>Discuss with each other</h4>
                        <p>Vestibulum sed magna est. Phasellus odio ex, lacinia a libero sit amet, luctus tincidunt purus. Morbi non suscipit lorem, a dignissim velit. Aliquam ullamcorper hendrerit lectus ac interdum. In ac fringilla nunc. Pellentesque non eros volutpat, volutpat lacus id, egestas lorem. Quisque at ultricies ante, a vestibulum odio. Sed quam ipsum, molestie quis malesuada eget, pulvinar id ligula. Proin vehicula mi justo, sit amet elementum velit eleifend tristique.
                        </p>
                        <a href="">Go for it!</a>
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
                            <p>Vestibulum sed magna est. Phasellus odio ex, lacinia a libero sit amet, luctus tincidunt purus. Morbi non suscipit lorem, a dignissim velit. Aliquam ullamcorper hendrerit lectus ac interdum. In ac fringilla nunc. Pellentesque non eros volutpat, volutpat lacus id, egestas lorem. Quisque at ultricies ante, a vestibulum odio. Sed quam ipsum, molestie quis malesuada eget, pulvinar id ligula. Proin vehicula mi justo, sit amet elementum velit eleifend tristique.
                            </p>
                            <a href="">Go for it!</a>
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
                            <p>Vestibulum sed magna est. Phasellus odio ex, lacinia a libero sit amet, luctus tincidunt purus. Morbi non suscipit lorem, a dignissim velit. Aliquam ullamcorper hendrerit lectus ac interdum. In ac fringilla nunc. Pellentesque non eros volutpat, volutpat lacus id, egestas lorem. Quisque at ultricies ante, a vestibulum odio. Sed quam ipsum, molestie quis malesuada eget, pulvinar id ligula. Proin vehicula mi justo, sit amet elementum velit eleifend tristique.
                            </p>
                            <a href="">Go for it!</a>
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
                            <p>Vestibulum sed magna est. Phasellus odio ex, lacinia a libero sit amet, luctus tincidunt purus. Morbi non suscipit lorem, a dignissim velit. Aliquam ullamcorper hendrerit lectus ac interdum. In ac fringilla nunc. Pellentesque non eros volutpat, volutpat lacus id, egestas lorem. Quisque at ultricies ante, a vestibulum odio. Sed quam ipsum, molestie quis malesuada eget, pulvinar id ligula. Proin vehicula mi justo, sit amet elementum velit eleifend tristique.
                            </p>
                            <a href="">Go for it!</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="moods" class="add-ons--active tabcontent">
                <div class="row">
                    <div class="four columns add-ons--activeImage">
                        <i class="fas fa-moon"></i>
                    </div>
                    <div class="eight columns">
                        <div class="add-ons--activeText">
                            <h4>See the moods of your colleagues</h4>
                            <p>Vestibulum sed magna est. Phasellus odio ex, lacinia a libero sit amet, luctus tincidunt purus. Morbi non suscipit lorem, a dignissim velit. Aliquam ullamcorper hendrerit lectus ac interdum. In ac fringilla nunc. Pellentesque non eros volutpat, volutpat lacus id, egestas lorem. Quisque at ultricies ante, a vestibulum odio. Sed quam ipsum, molestie quis malesuada eget, pulvinar id ligula. Proin vehicula mi justo, sit amet elementum velit eleifend tristique.
                            </p>
                            <a href="">Go for it!</a>
                        </div>
                    </div>
                </div>
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
                            With Work Together, I and my team are much better organized. It is easy to use and we can easily communicate with each other. Highly recommended!
                            <span class="quote-author">Tom Boon CEO by IT Solutions</span>
                        </div>

                    </div>

                </div>
                <div class="six columns">
                    <div class="quote">
                        <div class="quote-character">
                            <i class="fas fa-quote-right"></i>
                        </div>
                        <div class="quote-text">
                            I was searching on the internet for a teamwork-platform but they were all so expensive. When I found out about WorkTogether I was in the clouds!
                            <span class="quote-author">Claudia from Colruyt</span>
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