@extends('front.layouts.app')
@section('title', '- Documentation')
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
    </section>
    <div class="header-basic">
        <h1 class="header-basic--title">Documentation</h1>
    </div>
    <div class="doc dark">
        <div class="row">
            <div class="three columns">
                <div class="doc-sidebar">
                    <ul>
                        <li><a href="#getStarted">Get started</a></li>
                        <li><a href="#dashboard">Dashboard</a></li>
                        <li><a href="#calendar">Calendar</a></li>
                        <li><a href="#project">Projects</a></li>
                        <li><a href="#company">Company</a></li>
                        <li><a href="#account">Account</a></li>
                        <li><a href="#project2">Project</a></li>
                        <li><a href="#add-ons">Add-ons</a></li>
                    </ul>
                </div>
            </div>
            <div class="nine columns">
                <div class="doc-content">
                    <h3 id="getStarted">Get started</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam nulla a feugiat. Proin malesuada gravida nulla, ut aliquet erat luctus et. Ut nec arcu eu leo sagittis sagittis eu a ipsum. Aliquam rutrum libero blandit, blandit leo et, tempus enim. Cras vehicula interdum elit vitae sagittis. Vestibulum quam ligula, pharetra at ipsum in, pretium tincidunt tellus. Aenean nec efficitur diam, ac scelerisque nulla. Suspendisse potenti. Donec commodo pretium risus non sollicitudin. Maecenas vulputate lorem tortor, et convallis justo posuere in. Aliquam erat volutpat. Duis tempus ex non porta ultrices. Fusce nec mattis eros.

                    </p>
                    <h3 id="dashboard">Dashboard</h3>
                    <h3 id="calendar">Calendar</h3>
                    <h3 id="project">Projects</h3>
                    <h3 id="company">Company</h3>
                    <h3 id="account">Account</h3>
                    <h3 id="project2">Project</h3>
                    <h3 id="add-ons">Add-ons</h3>
                    <ul>
                        <li><a href="#tasks">Tasks</a></li>
                        <li><a href="#notes">Notes</a></li>
                        <li><a href="#forum">Forum</a></li>
                        <li><a href="#board">Board</a></li>
                        <li><a href="#polls">Polls</a></li>
                        <li><a href="#activities">Activities</a></li>
                        <li><a href="#crisisCenter">Crisis Center</a></li>
                        <li><a href="#logs">Logs</a></li>
                    </ul>
                    <h4 id="tasks">Tasks</h4>
                    <p>With the add-on tasks you can create tasks for a project member. You can assign one to a single member or to everyone.</p><h5>Make a list</h5><p>Before you can create tasks, you have to make a task list. You can do this very easily by clicking on the "plus" icon next to the "help" icon.</p><p class="center-text"><img src="/images/help/icons.JPG" width="200px"></p><h5>Make a task</h5><p>Choose the list where you want to make a task and click on it. Now you will see a list of the current tasks in that list or nothing.</p><img src="/images/help/taskList.JPG" width="40%%"><p>At the bottom you click on the button "Add task". Then a popup will appear where you must enter the data for the task: Name, description and the end date.</p><h5>Completed task</h5><p>If you want to see a task as completed, click on the bullet to the far left of the task. To set a task "not as done", do the same.</p><h5>Timer</h5><p>When you are working on a task you can let a timer run. You can do this by clicking on the "play" icon at the far right of the task. When you're done working on the task, click on the "pause" icon.</p><p class="center-text"><img src="/images/help/taskTimer.JPG" class="text-center center" width="200px"></p><h5>Modify a task</h5><p>The owner of a task, the leaders or the responsables can modify tasks. You can do this by clicking on the "pencil" icon on the right. If you want to delete a task, click on the "trash" icon on the right. </p>
                    <h4 id="notes">Notes</h4>
                    <p>With notes you can easily remember small things by creating a note on the pin board.</p><h5>Make a note</h5><p>You can create a new note by clicking on the "plus" icon at the top on the right. A popup will appear where you must enter a title and description. You also have the choice to make the note private. This means that only you can see that.</p><p class="center-text"><img src="/images/help/icons.JPG" width="150px"></p><h5>Modify a note</h5><p>The owner of a note, the leaders or the responsables can delete notes. You can't modify a note. You have to delete the note and make a new one.</p><p class="center-text"><img src="/images/help/note.JPG" width="300px"></p>
                    <h4 id="forum">Forum</h4>
                    <p>With the add-on forum, you can discuss with your project partners.</p><h5>what's a forum?</h5><p>"Public medium (such as a newspaper column) or place used for debates in which anyone can participate. In Roman times it meant a public place at the center of a market or town where open discussions on judicial, political, and other issues were held."</p><h5>Make a thread</h5><p>A thread is the start post for a debate. The thread contains contains the point of the discussion. You can make a thread by clicking on the button "create thread"  on the left.</p><p class="center-text"><img src="/images/help/forumThread.JPG" width="250px"></p><p>A popup with two tabs will appear: general and tags. On the "general" tab you have to fill in a title and the content of the message. On the "tags" tab you can add tags to the thread.</p><h5>Sort based on tags</h5><p class="center-text"><img src="/images/help/forumTags.JPG" width="250px"></p><p>If you want, you can sort the results based on the tags of the threads. All what you have to do is to click on the prefered tag on the left. The results will now be showed on the right.</p><h5>Reply on a thread</h5><p>When opening a thread (by clicking on the title), you can reply to it. You can click on the button "Reply to this thread" or scroll down to the end of the page.</p><h5>Modify a reply/thread</h5><p>The owner of a reply or owner of the thread, the leaders or the responsables can modify and delete replies. Go to the reply or thread you want to modify or delete. If you want to modify, click on the "pencil" icon on the right. If you want to delete, click on the "trash" icon on the right.</p><p class="center-text"><img src="/images/help/forumModify.JPG" width="100px"></p>
                    <h4 id="board">Board</h4>
                    <p>On the board you can place items in columns. So that you and your project partners can organize some tasks in columns. You have three standard columns: todo, in progress and done. Pro members can modify these columns and can create an extra column.</p><h5>Make an item</h5><p>You can create a new item by clicking on the "plus" icon at the top on the right. A popup will appear where you must enter the name and description. You also have the choice to map an item to a project partner.</p><p class="center-text"><img src="/images/help/icons.JPG" width="150px"></p><p>You can also fill in the expected time of an item. This means how long you think the item will last. At the end you can select a color for your item.</p><h5>Item to other column</h5><p>If you want to move an item to another column, you have to keep pressing on the item and drag it to the column you want.</p><h5>Modify an item</h5><p>The owner of a item, the leaders or the responsables can modify items. Click on the item you want to edit. When clicking a popup will appear where you can modify the item. </p> <h5>Delete an item</h5><p>The owner of a item, the leaders or the responsables can delete items. Click on the item and at the bottom of the popup you will see the button "delete". When you click on this button the item will be deleted.</p><p class="center-text"><img src="/images/help/boardDelete.JPG" width="150px"></p>
                    <h4 id="polls">Polls</h4>
                    <h4 id="activities">Activities</h4>
                    <div class="alert alert-red center-text">
                        This add-on is at the moment not available.
                    </div>
                    <h4 id="crisisCenter">Crisis Center</h4>
                    <p>The crisis center is meant for important faults or bugs that have to be solved immediately.</p><h5>Make a crisis item</h5><p>You can create a new item by clicking on the "plus" icon at the top on the right. A popup will appear where you must enter the title, description and the priority of the item.</p><p class="center-text"><img src="/images/help/icons.JPG" width="150px"></p><h5>Item as solved</h5><p>If you want to designate a crisis item as "resolved", click the "in progress" button on the far right. The item will now be moved to the solved items. Only the creator, the leaders and the responsables can solve an item.</p><p class="center-text"><img src="/images/help/crisisItem.JPG"></p><h5>Modify an item</h5><p>The owner of a item, the leaders or the responsables can modify items. Click on the item you want to modify. When you clicked the popup will collaps. On the bottom at he right you find the "pencil" icon where you can modify the crisis item.</p><h5>Delete an item</h5><p>The owner of a item, the leaders or the responsables can delete items. Click on the item you want to modify. When you clicked the popup will collaps. On the bottom at he right you find the "trash" icon where you can delete the crisis item.</p>
                    <h4 id="logs">Logs</h4>
                    <p>The Add-on logs ensures that project users can keep a log of the things that they have done.</p><h5>Make a log</h5><p>You can create a new log by clicking on the "plus" icon at the top on the right. A popup will appear where you must enter the content of a log.</p><p class="center-text"><img src="/images/help/icons.JPG" width="150px"></p><h5>See logs</h5><p>To see logs of a project member, click on his avatar on the left. On the right the logs of the user will apears.</p><h5>Delete logs</h5><p>Only the owner of a log, the leaders or the responsables can delete a log. At the bottom of a log you will see the "trash" icon. By clicking on this icon, the log will be deleted.</p>

                </div>
            </div>
        </div>
    </div>

@endsection