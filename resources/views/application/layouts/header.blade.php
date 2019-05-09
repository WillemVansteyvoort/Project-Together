<section class="header-primary">
    <div class="navigation-mobile">
        <label for="show-menu" class="show-menu center"><i class="fas fa-bars"></i></label>
        <input type="checkbox" id="show-menu" role="button">
        <div id="nav-mobile--menu">
            <label for="show-menu" class="show-menu left"><i class="fas fa-times"></i></label>
            <ul>
                <h5>{{{ Auth::user()->company->name }}}</h5>
                <li><a class="" href="{{route('app_dashboard', Auth::user()->company->url)}}">@lang('Dashboard')</a></li>
                <li><a href="{{route('app_projects', Auth::user()->company->url)}}">@lang('Projects')</a></li>
                <li><a href="{{route('app_calendar', Auth::user()->company->url)}}">@lang('Calendar')</a></li>
                @if(Auth::user()->admin || Auth::user()->rights->create_members || Auth::user()->rights->create_groups || Auth::user()->rights->company_settings)
                    <li><a href="{{route('app_company', Auth::user()->company->url)}}">@lang('Company')</a></li>
                @endif
                <li ><a  href="" class="button button-second"><i class="fas fa-plus"> </i> New project</a></li>
            </ul>
        </div>
    </div>
    <div class="header-primary-menuLeft">
        <div class="mode">
            <div id="mode" class="mode-content tab-content">
                <a href=""><i class="fas fa-comments"> </i></a>
            </div>
        </div>
        <ul>
            <li><a class="header-name"  onclick="showNotifications('mode')"><i class="fas fa-home dropbtn icon"> </i> <i class="fas fa-sort-down down"></i></a></li>
            <li><a class="" href="{{route('app_dashboard', Auth::user()->company->url)}}">@lang('Dashboard')</a></li>
            <li><a href="{{route('app_projects', Auth::user()->company->url)}}">@lang('Projects')</a></li>
            <li><a href="{{route('app_calendar', Auth::user()->company->url)}}">@lang('Calendar')</a></li>
            <li><a href="{{route('app_company', Auth::user()->company->url)}}">@lang('Company')</a></li>
        @if(Auth::user()->rights->create_projects)
                <span id="popup-newProject"> </span>
            @else
                <button class="opacity-0 button-second button no-button" style="opacity: 0"><i class="fas fa-plus"> </i> </button>
            @endif
        </ul>

    </div>
    <div class="header-primary-menuRight">
        <div class="people">
            <ul>
                <li><i onclick="showNotifications('people')" class="fas fa-bars dropbtn"> </i>
            </ul>
            <div id="people" class="people-content tab-content">
                <h6 class="people-title">@lang('Online members')</h6>
                <div id="menu-online"></div>
            </div>
        </div>
        <div class="notifications">
            <ul>
                <li><i onclick="showNotifications('notifications')" class="fas fa-bell dropbtn"> </i>
            </ul>
            <div id="menu-notifications"></div>
        </div>
        <div class="help">
            <ul>
                <li><i onclick="showNotifications('help')" class="fas fa-question dropbtn"> </i>
            </ul>
            <div id="help" class="help-content tab-content" >
                <h6 class="help-title">@lang('Get Help')</h6>
                <article class="help-alert">
                    <div class="help-alert--text">
                        <b><a href="" class="help-alert--title float-left">@lang('See our documentation')</a></b>
                        <p>@lang('You can always consult our documentation where all the functions are explained.')</p>
                    </div>
                </article>
                <div class="clear"></div>
                <article class="help-alert">
                    <div class="help-alert--text">
                        <b><a href="" class="help-alert--title">@lang('The FAQ page')</a></b>
                        <p>@lang('On the FAQ page you can check Frequently Asked Questions from other members')</p>
                    </div>
                </article>
                <article class="help-alert">
                    <div class="help-alert--text">
                        <b><a href="{{route('front_support')}}" class="help-alert--title">@lang('Ask a question')</a></b>
                        <p>@lang('If your question is still not answered, you can ask us your question.')</p>
                    </div>
                </article>
            </div>
        </div>
        <div class="profile">
            <ul>
                <li><a class="dropbtn" onclick="showNotifications('profile')"> {{Auth::user()->name}} <img src="{{{ Auth::user()->avatar  }}}" /></a></li>
            </ul>
            <div id="profile" class="profile-content tab-content" >
                <div class="profile-user" onclick="window.location.href='{{{Auth::user()->username}}}/profile/'">
                    <img class="profile-user--avatar" src="{{{ Auth::user()->avatar  }}}" />
                    <h4 class="profile-user--name">{{{ Auth::user()->name  . "  ". Auth::user()->lastname}}}</h4>
                </div>
                <div class="clear line-small"></div>
                <div class="profile-links">
                    <ul>
                        <li><a href="{{route('app_account', Auth::user()->company->url)}}"> @lang('Change my acccount')</a></li>
                        <li><a href="{{route('app_account', Auth::user()->company->url)}}"> @lang('Settings')</a></li>
                        <li><a href="{{route('app_account', Auth::user()->company->url)}}"> @lang('View sessions')</a></li>
                        <li><a href="{{route('app_account', Auth::user()->company->url)}}"> @lang('Two Step Authentication')</a></li>
                        <li><a href="{{route('app_account', Auth::user()->company->url)}}"> @lang('Statistics')</a></li>
                    </ul>
                    <ul>
                        <div class="clear line-small"> </div>
                        <li> <i class="float-left fas fa-sign-out-alt"> </i> <a href="{{route('app_logout')}}">@lang('Logout')</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div id="update-activity"></div>
</section>