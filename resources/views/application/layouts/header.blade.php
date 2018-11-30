<section class="header-primary">
    <div class="navigation-mobile">
        <label for="show-menu" class="show-menu center"><i class="fas fa-bars"></i></label>
        <input type="checkbox" id="show-menu" role="button">
        <div id="nav-mobile--menu">
            <label for="show-menu" class="show-menu left"><i class="fas fa-times"></i></label>
            <ul>
                <h5>{{{ Auth::user()->company->name }}}</h5>
                <li><a class="" href="{{route('app_dashboard', Auth::user()->company->url)}}">Dashboard</a></li>
                <li><a href="about.html">Projects</a></li>
                <li><a href="">Calender</a></li>
                @if(Auth::user()->admin || Auth::user()->rights->create_members || Auth::user()->rights->create_groups || Auth::user()->rights->company_settings)
                    <li><a href="{{route('app_company', Auth::user()->company->url)}}">Company</a></li>
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
            <li><a class="" href="{{route('app_dashboard', Auth::user()->company->url)}}">Dashboard</a></li>
            <li><a href="about.html">Projects</a></li>
            <li><a href="">Calender</a></li>
            @if(Auth::user()->admin || Auth::user()->rights->create_members || Auth::user()->rights->create_groups || Auth::user()->rights->company_settings)
                <li><a href="{{route('app_company', Auth::user()->company->url)}}">Company</a></li>
            @endif
            <li ><a  href="" class="button button-second"><i class="fas fa-plus"> </i> New project</a></li>

        </ul>

    </div>
    <div class="header-primary-menuRight">
        <div class="people">
            <ul>
                <li><i onclick="showNotifications('people')" class="fas fa-bars dropbtn"> </i>
            </ul>
            <div id="people" class="people-content tab-content">
                <h6 class="people-title">Online members</h6>
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
                <h6 class="help-title">Get Help</h6>
                <article class="help-alert">
                    <div class="help-alert--text">
                        <b><a href="" class="help-alert--title float-left">See our documentation<a></b>
                        <p>Someone has login to your account from <i>Safari webbrowser.</i></p>
                    </div>
                </article>
                <div class="clear"></div>
                <article class="help-alert">
                    <div class="help-alert--text">
                        <b><a href="" class="help-alert--title">Check the FAQ</a></b>
                        <p>Thanks for joining us! If you have questions about the working, read our  <span class="notifications-alert--see" ><a href="">documentation.</a></span></p>
                    </div>
                </article>
                <article class="help-alert">
                    <div class="help-alert--text">
                        <b><a href="" class="help-alert--title">Ask a question</a></b>
                        <p>Thanks for joining us! If you have questions about the working, read our  <span class="notifications-alert--see" ><a href="">documentation.</a></span></p>
                    </div>
                </article>
            </div>
        </div>
        <div class="profile">
            <ul>
                <li><a class="dropbtn" onclick="showNotifications('profile')"> {{Auth::user()->name}} <img src="{{ asset('images/')}}/{{{ Auth::user()->avatar  }}}" /></a></li>
            </ul>
            <div id="profile" class="profile-content tab-content" >
                <div class="profile-user">
                    <img class="profile-user--avatar" src="{{{ Auth::user()->avatar  }}}" />
                    <h4 class="profile-user--name">{{{ Auth::user()->name  . "  ". Auth::user()->lastname}}}</h4>
                </div>
                <div class="clear line-small"></div>
                <div class="profile-links">
                    <ul>
                        <li><a href="{{route('app_account', Auth::user()->company->url)}}"> Change my acccount</a></li>
                        <li><a href=""> Settings</a></li>
                        <li><a href=""> View sessions</a></li>
                        <li><a href=""> Two Step Authentication</a></li>
                        <li><a href=""> Statistics</a></li>
                    </ul>
                    <ul>
                        <div class="clear line-small"> </div>
                        <li> <i class="float-left fas fa-sign-out-alt"> </i> <a href="{{route('app_logout')}}">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div id="update-activity"></div>
</section>