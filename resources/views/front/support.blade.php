@extends('front.layouts.app')
@section('title', '- support')
@section('content')
    <section class="header header-small">
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
    </section>
    <div class="header-basic">
        <h1 class="header-basic--title">Project-Together support</h1>
    </div>

    <section class="dark support-items">
        <h3>@lang("We help you with a big smile")</h3>
        <p>@lang("Costumer satisfaction is very important for our company. We have a lot of resources to solve problems with a big smile. Before asking a question, please check the Q&A section to see if you can find the answer there. Not found? Do not hesitate to contact us.")</p>
        <div class="row">
            <div class="three columns">
                <div class="support-item">
                    <i class="fas fa-envelope"></i>
                    <h6><a href="mailto:support@project-together.com">support@project-together.com</a></h6>
                </div>
            </div>
            <div class="three columns">
                <div class="support-item">
                    <i class="fas fa-question-circle"></i>
                    <h6><a href="">Q&A section</a></h6>
                </div>
            </div>
            <div class="three columns">
                <div class="support-item">
                    <i class="fas fa-book"></i>
                    <h6><a href="{{route('front_docs')}}">@lang("Documentation")</a></h6>
                </div>
            </div>
            <div class="three columns">
                <div class="support-item">
                    <i class="fas fa-th-large"></i>
                    <h6><a href="{{route('front_blog')}}">@lang("Our blog")</a></h6>
                </div>
            </div>
        </div>
    </section>
    <section class="form">
        <h3 id="white">@lang("Haven't found your answer?")</h3>
        <div class="row">
            <div class="six columns">
                <div class="form-title">
                    Ask here!
                </div>
                <i><i class="fas fa-clock"></i>@lang("We answer in less then 12 hours")</i>
            </div>
            <div class="six columns">
                <div class="form-form">
                    @if(session('success'))
                        <div class="alert alert-green center-text">Your form has been sent successfully. We will reply as soon as possible.</div>
                    @endif
                    <form method="post" action="{{route('front_sendForm')}}">
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="six columns">
                                <label for="email">@lang("Your email")</label>
                                <input class="u-full-width" type="email" placeholder="test@mailbox.com" id="email" required name="email">
                            </div>
                            <div class="six columns">
                                <label for="reason">@lang("Reason for contacting")</label>
                                <select class="u-full-width" id="reason" name="reason" required>
                                    <option></option>
                                    <option value="Option 1">@lang("I have question about billing")</option>
                                    <option value="Option 2">@lang("I have a question about a feature")</option>
                                    <option value="Option 3">@lang("I have a idea for a new feature")</option>
                                    <option value="Option 4">@lang("I have a request for my data")</option>
                                    <option value="Option 5">@lang("I found a error or bug")</option>
                                    <option value="Option 6">@lang("Other")</option>


                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="six columns">
                                <label for="phone">@lang("Your phone number")</label>
                                <input class="u-full-width" type="tel" placeholder="04/74.45.51.52" id="phone" name="phone">
                            </div>
                            <div class="six columns">
                                <label for="company">@lang("Your company")</label>
                                <input class="u-full-width" type="email" placeholder="Project-Together" id="company" name="company">
                            </div>
                        </div>
                        <label for="message">@lang("Your message")</label>
                        <textarea class="u-full-width" placeholder="Hello, I have a question about ..." id="message" name="message" required minlength="100"></textarea>
                        <input type="submit" value=@lang("Send") href="" class="button button-primary button-medium" />
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection