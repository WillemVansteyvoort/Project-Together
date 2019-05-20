@extends('front.layouts.app')
@section('content')
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
                            <img src="images/flag-en.png" width="35px" class="float-right" style="margin-top: 5px; margin-right: 8px"/>
                        </a>
                    @else
                        <a  href="{{route('lang_set', "nl")}}">
                            <img src="images/flag-nl.png" width="35px" class="float-right" style="margin-top: 5px; margin-right: 8px"/>
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
                    <li class="button button-small button-second"><a href="{{route('front_login')}}">@lang("Login")</a></li>
                    <li class="button button-small button-primary"><a href="{{route('front_signup')}}">@lang("Sign Up")</a></li>
                        @endif
                </ul>
            </div>

            <div class="header-text">
                <h1 class="header-title">Organize your projects the best way
                </h1>
                <p class="header-beginText">@lang("Organize your projects for your company or your team the best possible way with Project-Together. Project-Together is a tool that can help you manage your company's projects. Project-Together is the first free project manager.")</p>
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
                            <h4>@lang("Organize")</h4>
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
                                @lang("Get started")
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
                                <li id="bold">Receive updates first</li>
                                <li>Includes all add-ons*</li>
                            </ul>
                            <a href="{{route('front_signup')}}" class="button button-primary button-medium">
                                @lang("Get started")
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="add-ons">
            <h3 class="products-title">@lang("You choose, we make it happen")</h3>
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
                        <h4>@lang("Tasks")</h4>
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
                        <h4>@lang("Calendar")</h4>
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
                            <h4>@lang("Discuss with project partners")</h4>
                            <p>@lang("When you create a project you can choose forum as add-on. A forum is a public medium or place used for debates in which anyone can participate. When you want to start a debate or discussion you can easily make a thread where all of your project members can reply and say theire opinion. You also have the option to select tags to sort on.")
                            </p>
                            <a href="{{route('front_signup')}}">@lang("Go for it!")</a>
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
                        <h4>@lang("Be aware of bugs and errors")</h4>
                        <p>@lang("When you add the add-on Crisis Center to your project, you have a place where you can collect all important errors or bugs that have to be solved immediately. When creating a new item you have to choose a priority. There are three types of priorities: low, medium and high.")


                        </p>
                        <a href="{{route('front_signup')}}">@lang("Go for it!")</a>
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
                            <h4>@lang("Set tasks that need to be done")</h4>
                            <p> @lang("This add-on allows you to create tasks in a project. You can assign a task to an employee or colleague. Tasks can also have an end date when the task must be completed. Finally, you can also set a task on active which means a timer starts to run. With tasks you can divide the work among your employees or colleagues.")
                            </p>
                            <a href="{{route('front_signup')}}">@lang("Go for it!")</a>
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
                            <h4>@lang("Don't forget anything with notes")</h4>
                            <p>@lang("You have the option to have notes in your project. This add-on is an online notice-board so that you don't have to use your fridge. You can make a note for everyone in the project or just for yourself.")
                            </p>
                            <a href="{{route('front_signup')}}">@lang("Go for it!")</a>
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
                            <h4>@lang("Save your group meetings")</h4>
                            <p> @lang("Project-Together has a simple calendar that's only for your company. You and your colleagues or employees can view or add events. An event can be labeled public or as private. If it's private, only you can see the event. With this calendar you can share all events with everyone in an organized way.")
                            </p>
                            <a href="{{route('front_signup')}}">@lang("Go for it!")</a>
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
                            <h4>@lang("Ask a question")</h4>
                            <p>@lang("Are you struggling with a choice to make? No problem! You can make a poll in your project to ask an opinion. You can let members vote multiple times or just once.")
                            </p>
                            <a href="{{route('front_signup')}}">@lang("Go for it!")</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="slideshow">
            <h3 class="slideshow-title">@lang("A view of Project-Together")</h3>
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
            <h3 id="white">@lang("What our customers say about us")</h3>
            <div class="row">
                <div class="six columns">
                    <div class="quote">
                        <div class="quote-character">
                            <i class="fas fa-quote-right"></i>
                        </div>
                        <div class="quote-text">
                            With Project-Together, me and my team are much better organized. It is easy to use and we can easily communicate with each other. Highly recommended!
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
    @endSection
