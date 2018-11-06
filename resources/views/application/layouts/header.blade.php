        <section class="header-primary">
            <div class="navigation-mobile">
                <label for="show-menu" class="show-menu center"><i class="fas fa-bars"></i></label>
                <input type="checkbox" id="show-menu" role="button">
                <div id="nav-mobile--menu">
                    <label for="show-menu" class="show-menu left"><i class="fas fa-times"></i></label>
                    <ul>
                        <h5>Chiro Jongens Kalfort</h5>
                        <li><a class="" href="">Dashboard</a></li>
                        <li><a href="about.html">Projects</a></li>
                        <li><a href="">Calender</a></li>
                        <li><a href="">Company</a></li>
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
                    <li><a class="" href="">Dashboard</a></li>
                    <li><a href="about.html">Projects</a></li>
                    <li><a href="">Calender</a></li>
                    <li><a href="">Company</a></li>
                    <li ><a  href="" class="button button-second"><i class="fas fa-plus"> </i> New project</a></li>
                </ul>

            </div>
            <div class="header-primary-menuRight">
                <div class="people">
                    <ul>
                        <li><i onclick="showNotifications('people')" class="fas fa-bars dropbtn"> </i>
                    </ul>
                    <div id="people" class="people-content tab-content">
                        <h6 class="people-title">Online collegues</h6>
                        <div class="people-item">
                            <h6><i class="fas fa-circle"></i>Willem Vansteyvoort (me)</h6>
                            <h6><i class="fas fa-circle"></i>Rik Schelfout</h6>
                            <h6><i class="fas fa-circle"></i>Toon Cools</h6>
                        </div>
                    </div>
                </div>
                <div class="notifications">
                    <ul>
                        <li><i onclick="showNotifications('notifications')" class="fas fa-bell dropbtn"> </i>
                    </ul>
                    <span class="notifications-active"> </span>
                    <div id="notifications" class="notifications-content tab-content">
                        <h6 class="notifications-title">Notifications <span class="tag tag-red">2 new</span></h6>
                        <article class="notifications-alert">
                            <div class="notifications-alert--icon">
                                <i class="fas fa-bell dropbtn" style="color: #EF3D47;"> </i>
                                <span class="notifications-alert--time">6 minutes ago</span>
                            </div>
                            <div class="notifications-alert--text">
                                <b><a href="" class="notifications-alert--title float-left">New login session to your account </a></b>
                                <p>Someone has login to your account from <i>Safari webbrowser.</i></p>
                            </div>
                        </article>
                        <div class="clear"></div>
                        <article class="notifications-alert">
                            <div class="notifications-alert--icon">
                                <i class="fas fa-handshake" style="color: green;"> </i>
                                <span class="notifications-alert--time">1 hours ago</span>
                            </div>
                            <div class="notifications-alert--text">
                                <b><a href="" class="notifications-alert--title float-left">Welcome to WorkTogether</a></b>
                                <p>Thanks for joining us! If you have questions about the working, read our  <span class="notifications-alert--see" ><a href="">documentation.</a></span></p>
                            </div>
                        </article>
                    </div>
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
                        <li><a class="dropbtn" onclick="showNotifications('profile')">Willem V. <img src="images/founder.jpg" /></a></li>
                    </ul>
                    <div id="profile" class="profile-content tab-content" >
                        <div class="profile-user">
                            <img class="profile-user--avatar" src="images/founder.jpg" />
                            <h4 class="profile-user--name">Willem Vansteyvoort</h4>
                        </div>
                        <div class="clear line-small"></div>
                        <div class="profile-links">
                            <ul>
                                <li><a href="about.html"> Change my acccount</a></li>
                                <li><a href=""> Settings</a></li>
                                <li><a href=""> View sessions</a></li>
                                <li><a href=""> Two Step Authentication</a></li>
                                <li><a href=""> Statistics</a></li>
                            </ul>
                            <ul>
                                <div class="clear line-small"></div>
                                <li> <i class="float-left fas fa-sign-out-alt"> </i> <a href="">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>